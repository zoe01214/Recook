(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["orders"],{"159d":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"pa-0 px-lg-12 mb-12",attrs:{id:"orders",fluid:""}},[a("v-sheet",{staticClass:"mx-3 px-lg-12 d-flex align-center mb-12"},[a("h2",{staticClass:"header-title mr-6"},[t._v("我的訂單")]),a("v-divider")],1),a("v-sheet",{staticClass:"mx-3 mx-lg-10 pa-8 rounded-xl bg-white-2 mt-12"},[a("v-row",{staticClass:"py-5"},t._l(t.orders,(function(e,r){return a("v-col",{key:e._id,attrs:{cols:"12"}},[a("div",{staticClass:"pa-10"},[a("p",{staticClass:"font-h4"},[t._v("訂單編號: "+t._s(e._id))]),a("v-divider"),a("table",{staticClass:"ordertable"},[a("tr",[a("th",{staticClass:"pl-5"},[t._v("日期")]),a("th",[t._v("訂單明細")]),a("th",[t._v("總金額")]),a("th",[t._v("狀態")])]),a("tr",[a("td",{staticClass:"pl-5"},[t._v(t._s(e.date))]),a("td",[t._v(t._s(e.detail))]),a("td",[t._v("NT."+t._s(e.total))]),a("td",[t._v(t._s(e.state))])])])],1)])})),1)],1)],1)},s=[],n=a("1da1"),i=(a("96cf"),a("d81d"),a("a15b"),a("99af"),a("b0c0"),{name:"Orders",data:function(){return{orders:[]}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/orders",{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 3:a=e.sent,r=a.data,t.orders=r.result.map((function(t){return t.date=new Date(t.date).toLocaleString(),t.total=t.products.map((function(t){return t.amount*t.product.price})).reduce((function(t,e){return t+e})),t.detail=t.products.map((function(t){return"".concat(t.product.name," ").concat(t.amount," 個")})).join(", "),t.state=1===t.state?"訂單成立":0===t.state?"訂單取消":"訂單已完成",t})),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:"取得訂單失敗"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}),o=i,c=a("2877"),d=a("6544"),l=a.n(d),u=a("62ad"),p=a("a523"),v=a("ce7e"),_=a("0fd9"),f=a("8dd9"),h=Object(c["a"])(o,r,s,!1,null,null,null);e["default"]=h.exports;l()(h,{VCol:u["a"],VContainer:p["a"],VDivider:v["a"],VRow:_["a"],VSheet:f["a"]})}}]);
//# sourceMappingURL=orders.738b5eea.js.map