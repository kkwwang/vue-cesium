/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-09-16 09:28:13
 * @LastEditTime: 2022-01-15 23:50:41
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\packages\components\providers\tianditu\terrain.ts
 */
import type { ExtractPropTypes } from 'vue'
import { createCommentVNode, defineComponent, getCurrentInstance, PropType } from 'vue'
import type { VcComponentInternalInstance, VcComponentPublicInstance } from '@vue-cesium/utils/types'
import { useProviders, useVueCesium } from '@vue-cesium/composables'
import { kebabCase } from '@vue-cesium/utils/util'
import { getInstanceListener } from '@vue-cesium/utils/private/vm'
import { providerEmits } from '@vue-cesium/utils/emits'

export const tiandituTerrainProviderProps = {
  url: {
    type: String,
    default: 'https://{s}.tianditu.gov.cn/'
  },
  subdomains: {
    type: Array as PropType<Array<string>>,
    default: () => ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
  },
  pluginPath: {
    type: String,
    default: 'https://api.tianditu.gov.cn/cdn/plugins/cesium/cesiumTdt.js'
  },
  dataType: {
    type: String,
    default: 'int',
    validator: (v: string) => ['int', 'float'].includes(v)
  },
  tileType: {
    type: String,
    default: 'heightmap',
    validator: (v: string) => ['heightmap', 'quantized-mesh'].includes(v)
  },
  token: String
}
export default defineComponent({
  name: 'VcTerrainProviderTianditu',
  props: tiandituTerrainProviderProps,
  emits: providerEmits,
  setup(props, ctx) {
    // state
    const instance = getCurrentInstance() as VcComponentInternalInstance
    instance.cesiumClass = 'GeoTerrainProvider'
    const providersState = useProviders(props, ctx, instance)

    if (undefined === providersState) {
      return
    }

    const { emit } = ctx
    const vc = useVueCesium()
    let $script
    // methods
    instance.createCesiumObject = async () => {
      return new Promise((resolve, reject) => {
        $script = document.createElement('script')
        document.body.appendChild($script)
        $script.src = props.pluginPath
        $script.onload = () => {
          if (providersState.unwatchFns.length === 0) {
            providersState.setPropsWatcher(true)
          }
          const terrainUrls: Array<string> = []

          for (let i = 0; i < props.subdomains.length; i++) {
            const url = props.url.replace('{s}', props.subdomains[i]) + 'mapservice/swdx?tk=' + props.token
            terrainUrls.push(url)
          }

          resolve(
            new Cesium.GeoTerrainProvider({
              urls: terrainUrls
            })
          )
        }
      })
    }
    instance.unmount = async () => {
      const terrainProvider = new Cesium.EllipsoidTerrainProvider()
      terrainProvider.readyPromise.then(() => {
        const listener = getInstanceListener(instance, 'readyPromise')
        listener && emit('readyPromise', terrainProvider, vc?.viewer, instance.proxy as VcComponentPublicInstance)
      })
      vc && (vc.viewer.terrainProvider = terrainProvider)
      $script?.parentNode.removeChild($script)
      return true
    }
    return () => createCommentVNode(kebabCase(instance.proxy?.$options.name || ''))
  }
})

export type VcTerrainProviderTiandituProps = ExtractPropTypes<typeof tiandituTerrainProviderProps>