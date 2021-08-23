(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{"4bd4":function(t,e,r){"use strict";var a=r("5530"),n=(r("caad"),r("2532"),r("07ac"),r("4de4"),r("159b"),r("7db0"),r("58df")),i=r("7e2b"),o=r("3206");e["a"]=Object(n["a"])(i["a"],Object(o["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,r=function(t){return t.$watch("hasError",(function(r){e.$set(e.errorBag,t._uid,r)}),{immediate:!0})},a={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?a.shouldValidate=t.$watch("shouldValidate",(function(n){n&&(e.errorBag.hasOwnProperty(t._uid)||(a.valid=r(t)))})):a.valid=r(t),a},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var r=this.watchers.find((function(t){return t._uid===e._uid}));r&&(r.valid(),r.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(a["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"73cf":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{staticClass:"pa-0 mb-12",attrs:{id:"register",fluid:""}},[r("v-container",{staticClass:"mb-4"},[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-sheet",{staticClass:"px-12 d-flex align-center"},[r("h2",{staticClass:"ctitle mr-6"},[t._v("會員註冊")]),r("v-divider")],1)],1)],1)],1),r("v-container",[r("v-sheet",{staticClass:"mx-10 rounded-xl bg-white-2 py-5"},[r("v-card",{staticClass:"bg-white-2 text-center bgtrans mx-auto pa-12",attrs:{flat:"","max-width":"550px"}},[r("v-form",{ref:"form",attrs:{"lazy-validation":"",width:"100%"},on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}}},[r("h2",{staticClass:"pb-6"},[t._v("加入 RECOOK 參與更多料理盛事")]),r("v-text-field",{staticClass:"pa-2",attrs:{color:"#DEA56A",rules:t.state.account,counter:20,label:"account",placeholder:"請輸入帳號",required:""},model:{value:t.form.account,callback:function(e){t.$set(t.form,"account",e)},expression:"form.account"}}),r("v-text-field",{staticClass:"pa-2",attrs:{color:"#DEA56A",rules:t.state.password,counter:20,label:"password",placeholder:"請輸入密碼",required:""},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),r("v-text-field",{staticClass:"pa-2",attrs:{color:"#DEA56A",rules:t.state.email,label:"E-mail",placeholder:"請輸入電子信箱",required:""},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),r("p",{staticClass:"d-flex"},[r("v-btn",{attrs:{plain:""}},[t._v("忘記密碼?")]),r("v-spacer"),r("v-btn",{attrs:{plain:"",to:"/login"}},[t._v("已經擁有帳號?")])],1),r("p",{staticClass:"text-center"},[r("v-btn",{staticClass:"loginbtn",attrs:{disabled:!t.form.valid},on:{click:t.submit}},[t._v("送出")])],1)],1)],1)],1)],1)],1)},n=[],i=r("1da1");r("96cf");function o(t){return o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function s(t){var e="string"===typeof t||t instanceof String;if(!e){var r=o(t);throw null===t?r="null":"object"===r&&(r=t.constructor.name),new TypeError("Expected a string but received a ".concat(r))}}function c(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;for(var r in e)"undefined"===typeof t[r]&&(t[r]=e[r]);return t}function u(t){return u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function l(t,e){var r,a;s(t),"object"===u(e)?(r=e.min||0,a=e.max):(r=arguments[1],a=arguments[2]);var n=encodeURI(t).split(/%..|./).length-1;return n>=r&&("undefined"===typeof a||n<=a)}var f={require_tld:!0,allow_underscores:!1,allow_trailing_dot:!1,allow_numeric_tld:!1};function d(t,e){s(t),e=c(e,f),e.allow_trailing_dot&&"."===t[t.length-1]&&(t=t.substring(0,t.length-1));var r=t.split("."),a=r[r.length-1];if(e.require_tld){if(r.length<2)return!1;if(!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(a))return!1;if(/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(a))return!1}return!(!e.allow_numeric_tld&&/^\d+$/.test(a))&&r.every((function(t){return!(t.length>63)&&(!!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(t)&&(!/[\uff01-\uff5e]/.test(t)&&(!/^-|-$/.test(t)&&!(!e.allow_underscores&&/_/.test(t)))))}))}var p="(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])",h="(".concat(p,"[.]){3}").concat(p),m=new RegExp("^".concat(h,"$")),v="(?:[0-9a-fA-F]{1,4})",x=new RegExp("^("+"(?:".concat(v,":){7}(?:").concat(v,"|:)|")+"(?:".concat(v,":){6}(?:").concat(h,"|:").concat(v,"|:)|")+"(?:".concat(v,":){5}(?::").concat(h,"|(:").concat(v,"){1,2}|:)|")+"(?:".concat(v,":){4}(?:(:").concat(v,"){0,1}:").concat(h,"|(:").concat(v,"){1,3}|:)|")+"(?:".concat(v,":){3}(?:(:").concat(v,"){0,2}:").concat(h,"|(:").concat(v,"){1,4}|:)|")+"(?:".concat(v,":){2}(?:(:").concat(v,"){0,3}:").concat(h,"|(:").concat(v,"){1,5}|:)|")+"(?:".concat(v,":){1}(?:(:").concat(v,"){0,4}:").concat(h,"|(:").concat(v,"){1,6}|:)|")+"(?::((?::".concat(v,"){0,5}:").concat(h,"|(?::").concat(v,"){1,7}|:))")+")(%[0-9a-zA-Z-.:]{1,})?$");function _(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(s(t),e=String(e),!e)return _(t,4)||_(t,6);if("4"===e){if(!m.test(t))return!1;var r=t.split(".").sort((function(t,e){return t-e}));return r[3]<=255}return"6"===e&&!!x.test(t)}var b={allow_display_name:!1,require_display_name:!1,allow_utf8_local_part:!0,require_tld:!0,blacklisted_chars:"",ignore_max_length:!1},g=/^([^\x00-\x1F\x7F-\x9F\cX]+)</i,w=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,y=/^[a-z\d]+$/,F=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,$=/^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,C=/^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i,E=254;function V(t){var e=t.replace(/^"(.+)"$/,"$1");if(!e.trim())return!1;var r=/[\.";<>]/.test(e);if(r){if(e===t)return!1;var a=e.split('"').length===e.split('\\"').length;if(!a)return!1}return!0}function D(t,e){if(s(t),e=c(e,b),e.require_display_name||e.allow_display_name){var r=t.match(g);if(r){var a=r[1];if(t=t.replace(a,"").replace(/(^<|>$)/g,""),a.endsWith(" ")&&(a=a.substr(0,a.length-1)),!V(a))return!1}else if(e.require_display_name)return!1}if(!e.ignore_max_length&&t.length>E)return!1;var n=t.split("@"),i=n.pop(),o=n.join("@"),u=i.toLowerCase();if(e.domain_specific_validation&&("gmail.com"===u||"googlemail.com"===u)){o=o.toLowerCase();var f=o.split("+")[0];if(!l(f.replace(".",""),{min:6,max:30}))return!1;for(var p=f.split("."),h=0;h<p.length;h++)if(!y.test(p[h]))return!1}if(!1===e.ignore_max_length&&(!l(o,{max:64})||!l(i,{max:254})))return!1;if(!d(i,{require_tld:e.require_tld})){if(!e.allow_ip_domain)return!1;if(!_(i)){if(!i.startsWith("[")||!i.endsWith("]"))return!1;var m=i.substr(1,i.length-2);if(0===m.length||!_(m))return!1}}if('"'===o[0])return o=o.slice(1,o.length-1),e.allow_utf8_local_part?C.test(o):F.test(o);for(var v=e.allow_utf8_local_part?$:w,x=o.split("."),D=0;D<x.length;D++)if(!v.test(x[D]))return!1;return!e.blacklisted_chars||-1===o.search(new RegExp("[".concat(e.blacklisted_chars,"]+"),"g"))}var B={name:"Register",data:function(){return{form:{valid:!0,account:"",password:"",email:""}}},computed:{state:function(){var t=this.form.account,e=this.form.password,r=this.form.email;return{account:[!!t||"請輸入帳號",t.length>=4&&t.length<=20||"帳號必須大於 4 個字且不超過 20 個字"],password:[!!e||"請輸入密碼",e.length>=4&&e.length<=20||"密碼必須大於 4 個字且不超過 20 個字"],email:[D(r)||"請輸入有效的電子信箱"]}}},methods:{submit:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$refs.form.validate()){e.next=12;break}return e.prev=1,t.form.username=t.form.account,e.next=5,t.axios.post("/users",t.form);case 5:t.$swal({icon:"success",title:"成功",text:"註冊成功"}),t.$router.push("/"),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](1),t.$swal({icon:"error",title:"失敗",text:e.t0.response.data.message});case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))()}}},S=B,A=r("2877"),k=r("6544"),q=r.n(k),z=r("8336"),j=r("b0af"),O=r("62ad"),R=r("a523"),I=r("ce7e"),T=r("4bd4"),W=r("0fd9"),J=r("8dd9"),L=r("2fa4"),K=r("8654"),P=Object(A["a"])(S,a,n,!1,null,null,null);e["default"]=P.exports;q()(P,{VBtn:z["a"],VCard:j["a"],VCol:O["a"],VContainer:R["a"],VDivider:I["a"],VForm:T["a"],VRow:W["a"],VSheet:J["a"],VSpacer:L["a"],VTextField:K["a"]})}}]);
//# sourceMappingURL=register.ab200498.js.map