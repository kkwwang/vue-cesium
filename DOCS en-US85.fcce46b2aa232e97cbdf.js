(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[84],{

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm-browser.js
var vue_esm_browser = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/dist/templateLoader.js??ref--6!./node_modules/vue-loader/dist??ref--2-0!./website/md-loader!./website/docs/en-US/providers/vc-provider-terrain-vr-theworld.md?vue&type=template&id=86d2e296

var vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_1 = {
  class: "content element-doc"
};

var vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_2 = /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("h2", {
  id: "vcproviderterrainvrtheworld"
}, [/*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("a", {
  class: "header-anchor",
  href: "#vcproviderterrainvrtheworld"
}, "¶"), /*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])(" VcProviderTerrainVrTheworld")], -1);

var vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_3 = /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("p", null, [/*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])("Loading a terrain provider that that produces terrain geometry by tessellating height maps retrieved from a VT MÄK VR-TheWorld server. It is equivalent to initializing a "), /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("code", null, "Cesium.VRTheWorldTerrainProvider"), /*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])(" instance.")], -1);

var vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_4 = /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("h3", {
  id: "basic-usage"
}, [/*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("a", {
  class: "header-anchor",
  href: "#basic-usage"
}, "¶"), /*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])(" Basic usage")], -1);

var _hoisted_5 = /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("p", null, [/*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])("Basic usage of the "), /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("code", null, "vc-provider-terrain-vr-theworld"), /*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])(" component.")], -1);

var _hoisted_6 = /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("div", null, [/*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("p", null, [/*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])("Use the "), /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("code", null, "vc-provider-terrain-vr-theworld"), /*#__PURE__*/Object(vue_esm_browser["m" /* createTextVNode */])(" tag to add the online terrain tile service provided by VrTheWorld to the viewer.")])], -1);

var _hoisted_7 = /*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("pre", null, [/*#__PURE__*/Object(vue_esm_browser["n" /* createVNode */])("code", {
  class: "html"
}, "<el-row ref=\"viewerContainer\" class=\"demo-viewer\">\n  <vc-viewer @ready=\"onViewerReady\" :imageryProvider=\"imageryProvider\">\n    <vc-provider-terrain-vr-theworld ref=\"provider\"></vc-provider-terrain-vr-theworld>\n  </vc-viewer>\n  <div class=\"demo-toolbar\">\n    <el-row>\n      <el-button type=\"danger\" round @click=\"unload\">Unload</el-button>\n      <el-button type=\"danger\" round @click=\"load\">Load</el-button>\n      <el-button type=\"danger\" round @click=\"reload\">Reload</el-button>\n    </el-row>\n  </div>\n</el-row>\n\n<script>\n  import { ref, getCurrentInstance } from 'vue'\n  export default {\n    setup() {\n      // state\n      const instance = getCurrentInstance()\n      const provider = ref(null)\n      const imageryProvider = ref(null)\n      let viewer = undefined\n      // methods\n      const unload = () => {\n        provider.value.unload()\n      }\n      const reload = () => {\n        provider.value.reload()\n      }\n      const load = () => {\n        provider.value.load()\n      }\n      const onViewerReady = ({ Cesium, viewer }) => {\n        imageryProvider.value = new Cesium.ArcGisMapServerImageryProvider({\n          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'\n        })\n        var target = new Cesium.Cartesian3(300770.50872389384, 5634912.131394585, 2978152.2865545116)\n        var offset = new Cesium.Cartesian3(6344.974098678562, -793.3419798081741, 2499.9508860763162)\n        viewer.camera.lookAt(target, offset)\n        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)\n      }\n      return {\n        provider,\n        unload,\n        reload,\n        load,\n        imageryProvider,\n        onViewerReady\n      }\n    }\n  }\n</script>\n")], -1);

var _hoisted_8 = /*#__PURE__*/Object(vue_esm_browser["l" /* createStaticVNode */])("<h3 id=\"props\"><a class=\"header-anchor\" href=\"#props\">¶</a> Props</h3><table><thead><tr><th>Name</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td>url</td><td>String|Object</td><td></td><td><code>required</code> The URL of the VR-TheWorld TileMap.</td></tr><tr><td>token</td><td>String</td><td></td><td><code>optional</code> The ellipsoid. If this parameter is not specified, the WGS84 ellipsoid is used.</td></tr><tr><td>ellipsoid</td><td>Object</td><td></td><td><code>optional</code> A credit for the data source, which is displayed on the canvas.</td></tr></tbody></table><h3 id=\"events\"><a class=\"header-anchor\" href=\"#events\">¶</a> Events</h3><table><thead><tr><th>Name</th><th>Parameters</th><th>Description</th></tr></thead><tbody><tr><td>beforeLoad</td><td>Vue Instance</td><td>Triggers before the cesiumObject is loaded.</td></tr><tr><td>ready</td><td>{Cesium, viewer, cesiumObject, vm}</td><td>Triggers when the cesiumObject is successfully loaded.</td></tr><tr><td>destroyed</td><td>Vue Instance</td><td>Triggers when the cesiumObject is destroyed.</td></tr><tr><td>errorEvent</td><td>TileProviderError</td><td>Triggers when the imagery provider encounters an asynchronous error.</td></tr><tr><td>readyPromise</td><td>TerrainProvider</td><td>Triggers when the provider is ready for use.</td></tr></tbody></table><h3 id=\"reference\"><a class=\"header-anchor\" href=\"#reference\">¶</a> Reference</h3><ul><li>Refer to the official documentation: <strong><a href=\"https://cesium.com/docs/cesiumjs-ref-doc/VRTheWorldTerrainProvider.html\">VRTheWorldTerrainProvider</a></strong></li></ul>", 6);

function vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_vue_cesium_demo0 = Object(vue_esm_browser["O" /* resolveComponent */])("vue-cesium-demo0");

  var _component_demo_block = Object(vue_esm_browser["O" /* resolveComponent */])("demo-block");

  var _component_right_nav = Object(vue_esm_browser["O" /* resolveComponent */])("right-nav");

  return Object(vue_esm_browser["F" /* openBlock */])(), Object(vue_esm_browser["i" /* createBlock */])("section", vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_1, [vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_2, vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_3, vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_hoisted_4, _hoisted_5, Object(vue_esm_browser["n" /* createVNode */])(_component_demo_block, null, {
    source: Object(vue_esm_browser["db" /* withCtx */])(function () {
      return [Object(vue_esm_browser["n" /* createVNode */])(_component_vue_cesium_demo0)];
    }),
    highlight: Object(vue_esm_browser["db" /* withCtx */])(function () {
      return [_hoisted_7];
    }),
    default: Object(vue_esm_browser["db" /* withCtx */])(function () {
      return [_hoisted_6];
    }),
    _: 1
  }), _hoisted_8, Object(vue_esm_browser["n" /* createVNode */])(_component_right_nav)]);
}
// CONCATENATED MODULE: ./website/docs/en-US/providers/vc-provider-terrain-vr-theworld.md?vue&type=template&id=86d2e296

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(2);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/dist??ref--2-0!./website/md-loader!./website/docs/en-US/providers/vc-provider-terrain-vr-theworld.md?vue&type=script&lang=ts


/* harmony default export */ var vc_provider_terrain_vr_theworldvue_type_script_lang_ts = ({
  name: 'component-doc',
  components: {
    "vue-cesium-demo0": function () {
      var _resolveComponent = vue_esm_browser["O" /* resolveComponent */],
          _createVNode = vue_esm_browser["n" /* createVNode */],
          _withCtx = vue_esm_browser["db" /* withCtx */],
          _createTextVNode = vue_esm_browser["m" /* createTextVNode */],
          _openBlock = vue_esm_browser["F" /* openBlock */],
          _createBlock = vue_esm_browser["i" /* createBlock */];
      var _hoisted_1 = {
        class: "demo-toolbar"
      };

      var _hoisted_2 = /*#__PURE__*/_createTextVNode("Unload");

      var _hoisted_3 = /*#__PURE__*/_createTextVNode("Load");

      var _hoisted_4 = /*#__PURE__*/_createTextVNode("Reload");

      function render(_ctx, _cache) {
        var _component_vc_provider_terrain_vr_theworld = _resolveComponent("vc-provider-terrain-vr-theworld");

        var _component_vc_viewer = _resolveComponent("vc-viewer");

        var _component_el_button = _resolveComponent("el-button");

        var _component_el_row = _resolveComponent("el-row");

        return _openBlock(), _createBlock("div", null, [_createVNode(_component_el_row, {
          ref: "viewerContainer",
          class: "demo-viewer"
        }, {
          default: _withCtx(function () {
            return [_createVNode(_component_vc_viewer, {
              onReady: _ctx.onViewerReady,
              imageryProvider: _ctx.imageryProvider
            }, {
              default: _withCtx(function () {
                return [_createVNode(_component_vc_provider_terrain_vr_theworld, {
                  ref: "provider"
                }, null, 512)];
              }),
              _: 1
            }, 8, ["onReady", "imageryProvider"]), _createVNode("div", _hoisted_1, [_createVNode(_component_el_row, null, {
              default: _withCtx(function () {
                return [_createVNode(_component_el_button, {
                  type: "danger",
                  round: "",
                  onClick: _ctx.unload
                }, {
                  default: _withCtx(function () {
                    return [_hoisted_2];
                  }),
                  _: 1
                }, 8, ["onClick"]), _createVNode(_component_el_button, {
                  type: "danger",
                  round: "",
                  onClick: _ctx.load
                }, {
                  default: _withCtx(function () {
                    return [_hoisted_3];
                  }),
                  _: 1
                }, 8, ["onClick"]), _createVNode(_component_el_button, {
                  type: "danger",
                  round: "",
                  onClick: _ctx.reload
                }, {
                  default: _withCtx(function () {
                    return [_hoisted_4];
                  }),
                  _: 1
                }, 8, ["onClick"])];
              }),
              _: 1
            })])];
          }),
          _: 1
        }, 512)]);
      }

      var ref = vue_esm_browser["K" /* ref */],
          getCurrentInstance = vue_esm_browser["q" /* getCurrentInstance */];
      var democomponentExport = {
        setup: function setup() {
          // state
          var instance = getCurrentInstance();
          var provider = ref(null);
          var imageryProvider = ref(null);
          var viewer = undefined; // methods

          var unload = function unload() {
            provider.value.unload();
          };

          var reload = function reload() {
            provider.value.reload();
          };

          var load = function load() {
            provider.value.load();
          };

          var onViewerReady = function onViewerReady(_ref) {
            var Cesium = _ref.Cesium,
                viewer = _ref.viewer;
            imageryProvider.value = new Cesium.ArcGisMapServerImageryProvider({
              url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            });
            var target = new Cesium.Cartesian3(300770.50872389384, 5634912.131394585, 2978152.2865545116);
            var offset = new Cesium.Cartesian3(6344.974098678562, -793.3419798081741, 2499.9508860763162);
            viewer.camera.lookAt(target, offset);
            viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
          };

          return {
            provider: provider,
            unload: unload,
            reload: reload,
            load: load,
            imageryProvider: imageryProvider,
            onViewerReady: onViewerReady
          };
        }
      };
      return extends_default()({
        render: render
      }, democomponentExport);
    }()
  }
});
// CONCATENATED MODULE: ./website/docs/en-US/providers/vc-provider-terrain-vr-theworld.md?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./website/docs/en-US/providers/vc-provider-terrain-vr-theworld.md



vc_provider_terrain_vr_theworldvue_type_script_lang_ts.render = vc_provider_terrain_vr_theworldvue_type_template_id_86d2e296_render

/* harmony default export */ var vc_provider_terrain_vr_theworld = __webpack_exports__["default"] = (vc_provider_terrain_vr_theworldvue_type_script_lang_ts);

/***/ })

}]);