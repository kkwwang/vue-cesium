<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-12-31 12:16:42
 * @LastEditTime: 2021-12-31 15:11:05
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\website\docs\zh-CN\analyses\vc-analysis-flood.md
-->

## VcAnalysisFlood

加载淹没分析组件。实质是用 `vc-primitive-classification` 加载 `vc-geometry-polygon`，通过动态修改 `vc-geometry-polygon` 的 `extrudedHeight` 属性拉伸成一个闭合体对象，从而简易模拟淹没分析。

**注意** 需要场景加载地形或 3DTiles。

### 基础用法

淹没分析组件的基础用法。

:::demo 使用 `vc-analysis-flood` 组件模拟淹没效果。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer @ready="onViewerReady">
    <vc-analysis-flood
      @ready="ready"
      ref="flood"
      :min-height="minHeight"
      :max-height="maxHeight"
      :speed="speed"
      :polygon-hierarchy="polygonHierarchy"
    >
    </vc-analysis-flood>
    <vc-layer-imagery>
      <vc-imagery-provider-arcgis></vc-imagery-provider-arcgis>
    </vc-layer-imagery>
    <vc-terrain-provider-cesium></vc-terrain-provider-cesium>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-button type="danger" round @click="unload">销毁</el-button>
    <el-button type="danger" round @click="load">加载</el-button>
    <el-button type="danger" round @click="reload">重载</el-button>
    <el-button type="danger" round @click="start">开始</el-button>
    <el-button type="danger" round @click="pause">{{pausing ? '继续' : '暂停'}}</el-button>
    <el-button type="danger" round @click="stop">结束</el-button>
  </el-row>
</el-row>

<script>
  export default {
    data() {
      return {
        minHeight: -1,
        maxHeight: 4000,
        speed: 10,
        polygonHierarchy: [
          [102.1, 29.5],
          [106.2, 29.5],
          [106.2, 33.5],
          [102.1, 33.5]
        ],
        pausing: false
      }
    },
    methods: {
      ready(cesiumInstance) {
        console.log(cesiumInstance)
      },
      onViewerReady({ Cesium, viewer }) {
        viewer.scene.globe.depthTestAgainstTerrain = true
        viewer.camera.setView({
          destination: new Cesium.Cartesian3(-1432246.8223880068, 5761224.588247942, 3297281.1889481535),
          orientation: {
            heading: 6.20312220367255,
            pitch: -0.9937536846355606,
            roll: 0.002443376981836387
          }
        })
      },
      unload() {
        this.$refs.flood.unload()
      },
      load() {
        this.$refs.flood.load()
      },
      reload() {
        this.$refs.flood.reload()
      },
      start() {
        this.$refs.flood.start()
        this.pausing = false
      },
      pause() {
        this.$refs.flood.pause()
        this.pausing = !this.pausing
      },
      stop() {
        this.$refs.flood.stop()
        this.pausing = false
      }
    }
  }
</script>
```

:::

### 属性

| 属性名           | 类型                  | 默认值                   | 描述                                           |
| ---------------- | --------------------- | ------------------------ | ---------------------------------------------- |
| polygonHierarchy | Object\|Array         |                          | `require` 指定构建淹没分析多边形的经纬度数组。 |
| minHeight        | Number                | `-1 `                    | `optional` 指定最小高程。                      |
| maxHeight        | Number                | `8888`                   | `optional` 指定最大高程。                      |
| speed            | Number                | `10`                     | `optional` 指定每帧增加的高度。                |
| color            | Object\|String\|Array | `'rgba(40,150,200,0.6)'` | `optional` 指定淹没分析对象颜色。              |
| loop             | Boolean               | `false`                  | `optional` 指定到达最大高度后是否重新开始。    |

### 事件

| 事件名     | 参数                                    | 描述                 |
| ---------- | --------------------------------------- | -------------------- |
| beforeLoad | (instance: VcComponentInternalInstance) | 对象加载前触发。     |
| ready      | (readyObj: VcReadyObject)               | 对象加载成功时触发。 |
| destroyed  | (instance: VcComponentInternalInstance) | 对象销毁时触发。     |
| stop       |                                         | 到达最大高度时触发。 |

### 方法

| 方法  | 参数 | 描述      |
| ----- | ---- | --------- |
| start |      | 开始      |
| pause |      | 暂停/继续 |
| stop  |      | 结束      |