/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-10-27 15:54:11
 * @LastEditTime: 2022-02-10 10:16:38
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\packages\components\config-provider\src\index.ts
 */
import { defineComponent, PropType, renderSlot } from 'vue'
import { provideGlobalConfig } from '@vue-cesium/composables/use-global-config'
import { Language } from '@vue-cesium/locale'
import Chinese from '@vue-cesium/locale/lang/zh-hans'

export default defineComponent({
  name: 'VcConfigProvider',
  props: {
    locale: {
      type: Object as PropType<Language>,
      default: () => Chinese
    },
    cesiumPath: {
      type: String,
      default: 'https://cdn.jsdelivr.net/npm/cesium@latest/Build/Cesium/Cesium.js'
    },
    accessToken: String
  },

  setup(props, { slots }) {
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  }
})