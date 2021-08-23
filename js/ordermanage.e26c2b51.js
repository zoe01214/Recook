(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ordermanage"],{"6e95":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-text-field",{attrs:{outlined:"","append-icon":"$vuetify.icons.plus",label:e.label,mask:e.mask,outline:e.outline,"prepend-inner-icon":"$vuetify.icons.minus",rules:e.rules,value:e.value,dense:"",solo:"",flat:"",color:"orange"},on:{"click:append":function(t){return t.stopPropagation(),e.increase.apply(null,arguments)},"click:prepend-inner":function(t){return t.stopPropagation(),e.decrease.apply(null,arguments)},change:function(t){return e.$emit("input",t)}}})},r=[],i=(a("a9e3"),{props:{label:{type:String,default:""},min:{type:Number,default:1},max:{type:Number,default:9999},maxLength:{type:Number,default:4},outline:{type:Boolean,default:!0},rules:{type:Array,default:function(){return[]}},step:{type:Number,default:1},height:{type:String},value:[String,Number]},computed:{mask:function(){for(var e="",t=0;t<this.maxLength;t++)e="".concat(e,"#");return e}},methods:{increase:function(){if(isNaN(parseInt(this.value)))return this.$emit("input",this.step);this.value!==this.max&&this.$emit("input",parseInt(this.value)+this.step)},decrease:function(){if(isNaN(parseInt(this.value)))return this.$emit("input",this.min);this.value!==this.min&&this.$emit("input",parseInt(this.value)-this.step)}}}),s=i,o=a("2877"),d=a("6544"),c=a.n(d),u=a("8654"),l=Object(o["a"])(s,n,r,!1,null,null,null);t["a"]=l.exports;c()(l,{VTextField:u["a"]})},f99b:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"pa-4",attrs:{id:"postmanage"}},[a("v-data-table",{attrs:{headers:e.headers,items:e.orders,search:e.search},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("訂單管理"),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"text-h5"},[e._v("編輯訂單")])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-text-field",{attrs:{label:"收件人姓名"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}}),a("v-text-field",{attrs:{label:"收件人手機號碼"},model:{value:e.editedItem.phone,callback:function(t){e.$set(e.editedItem,"phone",t)},expression:"editedItem.phone"}}),a("v-text-field",{attrs:{label:"收件人地址"},model:{value:e.editedItem.address,callback:function(t){e.$set(e.editedItem,"address",t)},expression:"editedItem.address"}}),a("v-select",{attrs:{items:e.state,"item-text":"text","item-value":"value",label:"訂單狀態"},model:{value:e.editedItem.state,callback:function(t){e.$set(e.editedItem,"state",t)},expression:"editedItem.state"}}),a("p",[e._v("訂單內容")]),e._l(e.editedItem.products,(function(t,n){return a("v-card",{key:t._id,attrs:{flat:""}},[a("div",{staticClass:"d-flex"},[a("p",[e._v(e._s(t.product.name))]),a("v-spacer"),a("v-btn",{attrs:{text:"",color:"red"},on:{click:function(t){return e.delproduct(n)}}},[e._v("刪除商品")])],1),a("InputNumber",{model:{value:e.editedItem.products[n].amount,callback:function(t){e.$set(e.editedItem.products[n],"amount",t)},expression:"editedItem.products[index].amount"}})],1)}))],2)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v("取消")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v("保存")])],1)],1)],1)],1),a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0},{key:"item.state",fn:function(t){var n=t.item;return[a("v-chip",{staticClass:"white--text",attrs:{small:"",color:e.getColor(n.state)}},[e._v(e._s(e.statetext(n.state)))])]}},{key:"item.actions",fn:function(t){var n=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(n)}}},[e._v("mdi-pencil")])]}}])})],1)},r=[],i=a("1da1"),s=(a("96cf"),a("b0c0"),a("d81d"),a("fb6a"),a("a15b"),a("99af"),a("a434"),a("6e95")),o={name:"PostManage",data:function(){return{orders:[],search:"",headers:[{text:"訂單編號",align:"start",sortable:!1,value:"_id"},{text:"訂購人",value:"user.account"},{text:"收件人",value:"name"},{text:"日期",value:"date"},{text:"商品數量",value:"productnum"},{text:"總金額",value:"total"},{text:"狀態",value:"state"},{text:"編輯",value:"actions",sortable:!1}],statedialog:!1,deldialog:!1,dialog:!1,editedIndex:-1,editedItem:{name:"",products:[],state:1},state:[{text:"訂單成立",value:1},{text:"訂單取消",value:0},{text:"訂單已完成",value:2}]}},components:{InputNumber:s["a"]},methods:{editItem:function(e){this.editedIndex=this.orders.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(t.prev=0,a={products:e.editedItem.products,name:e.editedItem.name,phone:e.editedItem.phone,address:e.editedItem.address,state:e.editedItem.state},!(e.editedIndex>-1)){t.next=5;break}return t.next=5,e.axios.patch("/orders/"+e.orders[e.editedIndex]._id,a,{headers:{authorization:"Bearer "+e.$store.state.jwt.token}});case 5:return e.$swal({icon:"success",title:"成功",text:"訂單修改成功"}),t.next=8,e.axios.get("/orders/all");case 8:n=t.sent,r=n.data,e.orders=r.result.map((function(e){return e.date=new Date(e.date).toLocaleString().slice(0,10),e.total=e.products.map((function(e){return e.amount*e.product.price})).reduce((function(e,t){return e+t})),e.detail=e.products.map((function(e){return"".concat(e.product.name," ").concat(e.amount," 個")})).join(", "),e})),e.close(),t.next=17;break;case 14:t.prev=14,t.t0=t["catch"](0),e.$swal({icon:"error",title:"錯誤",text:t.t0.response.data.message});case 17:case"end":return t.stop()}}),t,null,[[0,14]])})))()},delproduct:function(e){this.editedItem.products.splice(e,1)},getColor:function(e){return 1===e?"green":0===e?"red":"grey"},statetext:function(e){return 1===e?"成立":0===e?"取消":"已完成"}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("/orders/all",{headers:{authorization:"Bearer "+e.$store.state.jwt.token}});case 2:a=t.sent,n=a.data,e.orders=n.result.map((function(e){return e.date=new Date(e.date).toLocaleString().slice(0,10),e.productnum=e.products.map((function(e){return e.amount})).reduce((function(e,t){return e+t})),e.total=e.products.map((function(e){return e.amount*e.product.price})).reduce((function(e,t){return e+t})),e.detail=e.products.map((function(e){return"".concat(e.product.name," ").concat(e.amount," 個")})).join(", "),e}));case 5:case"end":return t.stop()}}),t)})))()},watch:{dialog:function(e){e||this.close()}}},d=o,c=a("2877"),u=a("6544"),l=a.n(u),p=a("8336"),m=a("b0af"),f=a("99d9"),v=a("cc20"),h=a("62ad"),x=a("a523"),b=a("8fea"),g=a("169a"),I=a("132d"),k=a("0fd9"),w=a("b974"),y=a("2fa4"),_=a("8654"),$=a("71d9"),V=a("2a7f"),C=Object(c["a"])(d,n,r,!1,null,null,null);t["default"]=C.exports;l()(C,{VBtn:p["a"],VCard:m["a"],VCardActions:f["a"],VCardText:f["b"],VCardTitle:f["c"],VChip:v["a"],VCol:h["a"],VContainer:x["a"],VDataTable:b["a"],VDialog:g["a"],VIcon:I["a"],VRow:k["a"],VSelect:w["a"],VSpacer:y["a"],VTextField:_["a"],VToolbar:$["a"],VToolbarTitle:V["a"]})}}]);
//# sourceMappingURL=ordermanage.e26c2b51.js.map