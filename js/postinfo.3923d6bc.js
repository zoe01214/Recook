(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["postinfo"],{"8d36":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"pa-0 mb-12",attrs:{fluid:"",id:"postinfo"}},[a("v-container",{staticClass:"mb-4"},[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-sheet",{staticClass:"px-12 d-flex align-center"},[a("h2",{staticClass:"header-title mr-6"},[t._v("料理生活")]),a("v-divider")],1)],1)],1)],1),1===t.post.isEnabled?a("v-container",{staticClass:"px-lg-12"},[a("v-sheet",{staticClass:"bg-white-2 text-center pa-6 rounded-xl"},[a("v-container",[a("h2",{staticClass:"py-6 infotitle"},[t._v(t._s(t.post.title))])]),a("v-container",{staticClass:"px-lg-12"},[a("v-img",{staticClass:"mb-6",attrs:{contain:"",src:t.post.image}})],1),a("v-container",{staticClass:"px-lg-12"},[a("v-sheet",{staticClass:"quotes text-left mx-auto pa-10 pa-lg-12 rounded-xl"},[a("p",{staticClass:"pt-3 px-lg-4 content",domProps:{innerHTML:t._s(t.post.content)}})])],1),a("v-container",{staticClass:"px-lg-12"},[a("div",{staticClass:"text-right date"},[t._v("發佈時間: "+t._s(t.post.date))])])],1)],1):a("v-container",{staticClass:"px-lg-12"},[a("v-sheet",{staticClass:"bg-white-2 text-center pa-6 rounded-xl"},[a("h2",[t._v("這筆文章已經下架囉！")])])],1)],1)},n=[],i=a("1da1"),o=(a("96cf"),a("fb6a"),a("d81d"),a("99af"),{name:"PostInfo",data:function(){return{post:[]}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/posts/"+t.$route.params.id);case 3:a=e.sent,s=a.data,t.post=s.result,t.post.date=new Date(t.post.date).toLocaleString().slice(0,-11),t.post.image=t.post.image.map((function(t){return"".concat("https://recook-recipe-web.herokuapp.com","/files/").concat(t)}))[0],e.next=12;break;case 10:e.prev=10,e.t0=e["catch"](0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))()}}),r=o,c=a("2877"),l=a("6544"),p=a.n(l),d=a("62ad"),u=a("a523"),v=a("ce7e"),f=a("adda"),x=a("0fd9"),g=a("8dd9"),h=Object(c["a"])(r,s,n,!1,null,null,null);e["default"]=h.exports;p()(h,{VCol:d["a"],VContainer:u["a"],VDivider:v["a"],VImg:f["a"],VRow:x["a"],VSheet:g["a"]})}}]);
//# sourceMappingURL=postinfo.3923d6bc.js.map