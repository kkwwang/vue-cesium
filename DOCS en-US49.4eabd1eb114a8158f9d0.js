(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[44],{

/***/ 1013:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/.pnpm/vue@3.2.26/node_modules/vue/dist/vue.esm-browser.js
var vue_esm_browser = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/.pnpm/babel-loader@8.2.3_bcd6ea64369259a9a094ff5ba7188bb6/node_modules/babel-loader/lib!./node_modules/.pnpm/vue-loader@16.5.0_webpack@4.44.1/node_modules/vue-loader/dist/templateLoader.js??ref--6!./node_modules/.pnpm/vue-loader@16.5.0_webpack@4.44.1/node_modules/vue-loader/dist??ref--3-0!./website/md-loader!./website/docs/en-US/i18n.md?vue&type=template&id=14625071

const _hoisted_1 = {
  class: "content vue-cesium-doc"
};

const _hoisted_2 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("Internationalization ");

const _hoisted_3 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("p", null, [/*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("VueCesium components are using Chinese "), /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("strong", null, "by default"), /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(", if you wish you use other languages, you can get you answer by keep reading.")], -1);

const _hoisted_4 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("Global configuration ");

const _hoisted_5 = /*#__PURE__*/Object(vue_esm_browser["createStaticVNode"])("<p>VueCesium provides global configurations</p><pre class=\"example-code\"><code class=\"hljs language-typescript\"><span class=\"hljs-keyword\">import</span> { createApp } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue&#39;</span>\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">VueCesium</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium&#39;</span>\n<span class=\"hljs-keyword\">import</span> enUS <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/es/locale/lang/en-us&#39;</span>\n\n<span class=\"hljs-keyword\">const</span> app = <span class=\"hljs-title function_\">createApp</span>(<span class=\"hljs-title class_\">App</span>)\napp.<span class=\"hljs-title function_\">use</span>(<span class=\"hljs-title class_\">VueCesium</span>, {\n  <span class=\"hljs-attr\">locale</span>: enUS\n})\napp.<span class=\"hljs-title function_\">mount</span>(<span class=\"hljs-string\">&#39;#app&#39;</span>)\n</code><span class=\"lang-mark\">ts</span></pre>", 2);

const _hoisted_7 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("VcConfigProvider ");

const _hoisted_8 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("VueCesium also provides a Vue component ");

const _hoisted_9 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("VcConfigProvider");

const _hoisted_10 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" for globally configuring locale and other settings.");

const _hoisted_11 = /*#__PURE__*/Object(vue_esm_browser["createStaticVNode"])("<pre class=\"example-code\"><code class=\"hljs language-html\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">vc-config-provider</span> <span class=\"hljs-attr\">:locale</span>=<span class=\"hljs-string\">&quot;locale&quot;</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">vc-viewer</span>&gt;</span>\n      <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">vc-navigation</span>&gt;</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">vc-navigation</span>&gt;</span>\n    <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">vc-viewer</span>&gt;</span>\n  <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">vc-config-provider</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"language-javascript\">\n  <span class=\"hljs-keyword\">import</span> { defineComponent } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue&#39;</span>\n  <span class=\"hljs-keyword\">import</span> { <span class=\"hljs-title class_\">VcConfigProvider</span>, <span class=\"hljs-title class_\">VcViewer</span>, <span class=\"hljs-title class_\">VcNavigation</span> } <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium&#39;</span>\n\n  <span class=\"hljs-keyword\">import</span> enUS <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">&#39;vue-cesium/es/locale/lang/en-us&#39;</span>\n\n  <span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> <span class=\"hljs-title function_\">defineComponent</span>({\n    <span class=\"hljs-attr\">components</span>: {\n      <span class=\"hljs-title class_\">VcConfigProvider</span>,\n      <span class=\"hljs-title class_\">VcViewer</span>,\n      <span class=\"hljs-title class_\">VcNavigation</span>\n    },\n    <span class=\"hljs-title function_\">setup</span>(<span class=\"hljs-params\"></span>) {\n      <span class=\"hljs-keyword\">return</span> {\n        <span class=\"hljs-attr\">locale</span>: enUS\n      }\n    }\n  })\n</span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n</code><span class=\"lang-mark\">html</span></pre>", 1);

const _hoisted_12 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("Supported Language List");

const _hoisted_13 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("ul", {
  class: "language-list"
}, [/*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("li", null, "Simplified Chinese (zh-hans)"), /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("li", null, "English (en-us)")], -1);

const _hoisted_14 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("If you need any other languages, ");

const _hoisted_15 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("PR");

const _hoisted_16 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" is always welcomed, you only need to add a language file at ");

const _hoisted_17 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("here");

const _hoisted_18 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(".");

const _hoisted_19 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("FAQs ");

const _hoisted_20 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("If I want to replace the default language pack to reduce the size, how do I do? ");

const _hoisted_21 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("When the default language of your app is not ");

const _hoisted_22 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("strong", null, "Chinese", -1);

const _hoisted_23 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(", you will be going to need to import another language file, which will increase the bundle size since you have both ");

const _hoisted_24 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("strong", null, "English", -1);

const _hoisted_25 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" and ");

const _hoisted_26 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("strong", null, "Your desired language", -1);

const _hoisted_27 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" bundled, you can use the plugin ");

const _hoisted_28 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("NormalModuleReplacementPlugin");

const _hoisted_29 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" provided by ");

const _hoisted_30 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])("webpack");

const _hoisted_31 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" to replace the default language file, so that you will only get ");

const _hoisted_32 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("strong", null, "1", -1);

const _hoisted_33 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" language file bundled. Add the code below into your ");

const _hoisted_34 = /*#__PURE__*/Object(vue_esm_browser["createElementVNode"])("code", null, "webpack.config.js", -1);

const _hoisted_35 = /*#__PURE__*/Object(vue_esm_browser["createTextVNode"])(" to get it work.");

const _hoisted_36 = /*#__PURE__*/Object(vue_esm_browser["createStaticVNode"])("<blockquote><p>webpack.config.js</p></blockquote><pre class=\"example-code\"><code class=\"hljs language-typescript\">{\n  <span class=\"hljs-attr\">plugins</span>: [<span class=\"hljs-keyword\">new</span> webpack.<span class=\"hljs-title class_\">NormalModuleReplacementPlugin</span>(<span class=\"hljs-regexp\">/vue-cesium[\\/\\\\]lib[\\/\\\\]locale[\\/\\\\]lang[\\/\\\\]zh-hans/</span>, <span class=\"hljs-string\">&#39;vue-cesium/lib/locale/lang/en-us&#39;</span>)]\n}\n</code><span class=\"lang-mark\">ts</span></pre>", 2);

function render(_ctx, _cache) {
  const _component_app_link = Object(vue_esm_browser["resolveComponent"])("app-link");

  const _component_app_heading = Object(vue_esm_browser["resolveComponent"])("app-heading");

  const _component_right_nav = Object(vue_esm_browser["resolveComponent"])("right-nav");

  return Object(vue_esm_browser["openBlock"])(), Object(vue_esm_browser["createElementBlock"])("section", _hoisted_1, [Object(vue_esm_browser["createVNode"])(_component_app_heading, {
    id: "internationalization",
    tabindex: "-1",
    content: "Internationalization",
    href: "#internationalization",
    level: "2"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_2, Object(vue_esm_browser["createVNode"])(_component_app_link, {
      class: "header-anchor",
      href: "#internationalization"
    })]),
    _: 1
  }), _hoisted_3, Object(vue_esm_browser["createVNode"])(_component_app_heading, {
    id: "global-configuration",
    tabindex: "-1",
    content: "Global configuration",
    href: "#global-configuration",
    level: "3"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_4, Object(vue_esm_browser["createVNode"])(_component_app_link, {
      class: "header-anchor",
      href: "#global-configuration"
    })]),
    _: 1
  }), _hoisted_5, Object(vue_esm_browser["createVNode"])(_component_app_heading, {
    id: "vcconfigprovider",
    tabindex: "-1",
    content: "VcConfigProvider",
    href: "#vcconfigprovider",
    level: "3"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_7, Object(vue_esm_browser["createVNode"])(_component_app_link, {
      class: "header-anchor",
      href: "#vcconfigprovider"
    })]),
    _: 1
  }), Object(vue_esm_browser["createElementVNode"])("p", null, [_hoisted_8, Object(vue_esm_browser["createVNode"])(_component_app_link, {
    href: "/#/en-US/component/vc-config-provider"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_9]),
    _: 1
  }), _hoisted_10]), _hoisted_11, Object(vue_esm_browser["createElementVNode"])("p", null, [Object(vue_esm_browser["createVNode"])(_component_app_link, {
    href: "https://github.com/zouyaoji/vue-cesium/tree/dev/packages/locale/lang"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_12]),
    _: 1
  })]), _hoisted_13, Object(vue_esm_browser["createElementVNode"])("p", null, [_hoisted_14, Object(vue_esm_browser["createVNode"])(_component_app_link, {
    href: "https://github.com/zouyaoji/vue-cesium/pulls"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_15]),
    _: 1
  }), _hoisted_16, Object(vue_esm_browser["createVNode"])(_component_app_link, {
    href: "https://github.com/zouyaoji/vue-cesium/tree/dev/packages/locale/lang"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_17]),
    _: 1
  }), _hoisted_18]), Object(vue_esm_browser["createVNode"])(_component_app_heading, {
    id: "faqs",
    tabindex: "-1",
    content: "FAQs",
    href: "#faqs",
    level: "3"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_19, Object(vue_esm_browser["createVNode"])(_component_app_link, {
      class: "header-anchor",
      href: "#faqs"
    })]),
    _: 1
  }), Object(vue_esm_browser["createVNode"])(_component_app_heading, {
    id: "if-i-want-to-replace-the-default-language-pack-to-reduce-the-size-how-do-i-do",
    tabindex: "-1",
    content: "If I want to replace the default language pack to reduce the size, how do I do?",
    href: "#if-i-want-to-replace-the-default-language-pack-to-reduce-the-size-how-do-i-do",
    level: "4"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_20, Object(vue_esm_browser["createVNode"])(_component_app_link, {
      class: "header-anchor",
      href: "#if-i-want-to-replace-the-default-language-pack-to-reduce-the-size-how-do-i-do"
    })]),
    _: 1
  }), Object(vue_esm_browser["createElementVNode"])("p", null, [_hoisted_21, _hoisted_22, _hoisted_23, _hoisted_24, _hoisted_25, _hoisted_26, _hoisted_27, Object(vue_esm_browser["createVNode"])(_component_app_link, {
    href: "https://webpack.js.org/plugins/normal-module-replacement-plugin/#root"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_28]),
    _: 1
  }), _hoisted_29, Object(vue_esm_browser["createVNode"])(_component_app_link, {
    href: "https://webpack.js.org"
  }, {
    default: Object(vue_esm_browser["withCtx"])(() => [_hoisted_30]),
    _: 1
  }), _hoisted_31, _hoisted_32, _hoisted_33, _hoisted_34, _hoisted_35]), _hoisted_36, Object(vue_esm_browser["createVNode"])(_component_right_nav)]);
}
// CONCATENATED MODULE: ./website/docs/en-US/i18n.md?vue&type=template&id=14625071

// CONCATENATED MODULE: ./website/docs/en-US/i18n.md

const script = {}
script.render = render

/* harmony default export */ var i18n = __webpack_exports__["default"] = (script);

/***/ })

}]);