(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["posts"],{"17c3":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"pa-0 px-lg-12 mb-12",attrs:{fluid:"",id:"posts"}},[a("v-sheet",{staticClass:"mx-3 px-lg-12 d-flex align-center mb-12"},[a("h2",{staticClass:"header-title mr-6"},[t._v("料理生活")]),a("v-divider")],1),a("v-sheet",{staticClass:"mx-3 mx-lg-10 pa-3 pa-lg-8 rounded-xl bg-white-2 mt-12"},[a("v-row",{staticClass:"py-5"},t._l(t.posts,(function(e){return 1===e.isEnabled?a("v-col",{key:e._id,staticClass:"mb-12",attrs:{cols:"12",md:"6",lg:"4"}},[a("router-link",{attrs:{to:"/post/"+e._id}},[a("v-card",{staticClass:"mx-3 mx-lg-6 rounded"},[a("v-img",{attrs:{cover:"","max-height":"250",src:e.image[0]}}),a("div",{staticClass:"pa-6 text-center"},[a("v-sheet",{staticClass:"rounded mx-12 mb-4 tag"},[t._v(t._s(e.type))]),a("h3",{staticClass:"mb-2 ptitle"},[t._v(t._s(e.title))]),a("div",{staticClass:"d-none d-lg-flex"},[a("div",{staticClass:"content",domProps:{innerHTML:t._s(e.content)}})])],1)],1)],1)],1):t._e()})),1)],1),a("loading",{attrs:{height:45,width:45,active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}})],1)},n=[],i=a("1da1"),r=(a("96cf"),a("d81d"),a("99af"),{name:"Posts",data:function(){return{posts:[],isLoading:!1,fullPage:!0}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,a=t,a.isLoading=!0,e.next=5,t.axios.get("/posts");case 5:s=e.sent,n=s.data,t.posts=n.result.map((function(t){return t.image=t.image.map((function(t){return"".concat("https://recook-back.onrender.com/","/files/").concat(t)})),t})),a.isLoading=!1,e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:"取得文章失敗"});case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()}}),o=r,c=a("2877"),l=a("6544"),d=a.n(l),u=a("b0af"),p=a("62ad"),m=a("a523"),g=a("ce7e"),v=a("adda"),f=a("0fd9"),h=a("8dd9"),x=Object(c["a"])(o,s,n,!1,null,null,null);e["default"]=x.exports;d()(x,{VCard:u["a"],VCol:p["a"],VContainer:m["a"],VDivider:g["a"],VImg:v["a"],VRow:f["a"],VSheet:h["a"]})}}]);
//# sourceMappingURL=posts.5fdf1b2a.js.map