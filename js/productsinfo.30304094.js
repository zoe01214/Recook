(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["productsinfo"],{"2e27":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"pa-0 mb-12",attrs:{id:"productinfo",fluid:""}},[a("v-container",{staticClass:"mb-4"},[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("v-sheet",{staticClass:"px-12 d-flex align-center"},[a("h2",{staticClass:"header-title mr-6"},[t._v("主廚市集")]),a("v-divider")],1)],1)],1)],1),t.product.sell?a("v-container",[a("v-sheet",{staticClass:"mx-10 rounded-xl bg-white-2"},[a("v-row",{staticClass:"pa-6 px-12"},[a("v-col",{attrs:{cols:"12",md:"5"}},[a("v-sheet",{staticClass:"bgtrans px-12 d-flex justify-center"},[a("v-img",{staticClass:"circle",attrs:{contain:"","max-width":"250px",src:t.product.image}})],1)],1),a("v-col",{attrs:{cols:"12",md:"7"}},[a("v-card",{staticClass:"bgtrans",attrs:{flat:""}},[a("h2",{staticClass:"name mb-5"},[t._v(t._s(t.product.name))]),a("p",{staticClass:"distext"},[t._v(t._s(t.product.discounttext))]),a("v-divider",{staticClass:"my-6"}),a("p",{staticClass:"mb-3"},[a("strong",[t._v("商品詳情")])]),a("p",{domProps:{innerHTML:t._s(t.product.description)}}),a("v-row",{staticClass:"d-flex align-center"},[a("v-col",{attrs:{cols:"12",lg:"6"}},[a("InputNumber",{staticClass:"numtext",attrs:{rules:t.state.amount},model:{value:t.amount,callback:function(e){t.amount=t._n(e)},expression:"amount"}})],1),a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-sheet",{staticClass:"btnborder d-flex align-center text-center bgtrans"},[a("div",{staticClass:"pa-2 pricetext"},[t._v("NT."+t._s(t.product.price))]),a("button",{staticClass:"pa-2 bagtext",on:{click:t.addcart}},[t._v("放進購物車")])])],1)],1)],1)],1)],1)],1)],1):a("v-container",[a("v-sheet",{staticClass:"mx-10 rounded-xl bg-white-2"},[a("h2",[t._v("這項商品已經下架囉！")])])],1)],1)},n=[],s=a("1da1"),i=(a("d81d"),a("99af"),a("b0c0"),a("96cf"),a("6e95")),c={name:"ProductInfo",data:function(){return{product:[],amount:1}},components:{InputNumber:i["a"]},computed:{state:function(){var t=this.amount;return{amount:[!!t||"商品數量不得為空值",t<this.product.quantity||"目前商品庫存只有 ".concat(this.product.quantity," 個")]}}},methods:{addcart:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.user.islogin){e.next=20;break}if(t.state){e.next=4;break}return t.$swal({icon:"error",title:"錯誤",text:"請輸入正確數量"}),e.abrupt("return");case 4:return 0===t.$store.state.jwt.token.length&&t.$router.push("/login"),e.prev=5,e.next=8,t.axios.post("/users/cart",{product:t.$route.params.id,amount:t.amount},{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 8:return t.$swal({icon:"success",title:"成功",text:"成功購物車"}),e.next=11,t.axios.get("/users/cart",{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 11:a=e.sent,t.$store.commit("changecart",a.data.result),e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](5),t.$swal({icon:"error",title:"錯誤",text:"加入購物車失敗"});case 18:e.next=21;break;case 20:t.$router.push("/login");case 21:case"end":return e.stop()}}),e,null,[[5,15]])})))()}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.axios.get("/products/"+t.$route.params.id);case 3:a=e.sent,r=a.data,t.product=r.result,t.product.image=t.product.image.map((function(t){return"".concat("https://recook-recipe-web.herokuapp.com","/files/").concat(t)}))[0],document.title=t.product.name+"- Recook",e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),t.$router.push("/");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()}},o=c,u=a("2877"),l=a("6544"),p=a.n(l),d=a("b0af"),m=a("62ad"),h=a("a523"),v=a("ce7e"),f=a("adda"),x=a("0fd9"),b=a("8dd9"),g=Object(u["a"])(o,r,n,!1,null,null,null);e["default"]=g.exports;p()(g,{VCard:d["a"],VCol:m["a"],VContainer:h["a"],VDivider:v["a"],VImg:f["a"],VRow:x["a"],VSheet:b["a"]})},"6e95":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-text-field",{attrs:{outlined:"","append-icon":"$vuetify.icons.plus",label:t.label,mask:t.mask,outline:t.outline,"prepend-inner-icon":"$vuetify.icons.minus",rules:t.rules,value:t.value,dense:"",solo:"",flat:"",color:"orange"},on:{"click:append":function(e){return e.stopPropagation(),t.increase.apply(null,arguments)},"click:prepend-inner":function(e){return e.stopPropagation(),t.decrease.apply(null,arguments)},change:function(e){return t.$emit("input",e)}}})},n=[],s=(a("a9e3"),{props:{label:{type:String,default:""},min:{type:Number,default:1},max:{type:Number,default:9999},maxLength:{type:Number,default:4},outline:{type:Boolean,default:!0},rules:{type:Array,default:function(){return[]}},step:{type:Number,default:1},height:{type:String},value:[String,Number]},computed:{mask:function(){for(var t="",e=0;e<this.maxLength;e++)t="".concat(t,"#");return t}},methods:{increase:function(){if(isNaN(parseInt(this.value)))return this.$emit("input",this.step);this.value!==this.max&&this.$emit("input",parseInt(this.value)+this.step)},decrease:function(){if(isNaN(parseInt(this.value)))return this.$emit("input",this.min);this.value!==this.min&&this.$emit("input",parseInt(this.value)-this.step)}}}),i=s,c=a("2877"),o=a("6544"),u=a.n(o),l=a("8654"),p=Object(c["a"])(i,r,n,!1,null,null,null);e["a"]=p.exports;u()(p,{VTextField:l["a"]})}}]);
//# sourceMappingURL=productsinfo.30304094.js.map