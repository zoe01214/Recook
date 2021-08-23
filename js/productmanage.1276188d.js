(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["productmanage"],{1008:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"pa-4",attrs:{id:"productmanage"}},[i("v-data-table",{attrs:{headers:t.headers,items:t.products,search:t.search},scopedSlots:t._u([{key:"top",fn:function(){return[i("v-toolbar",{attrs:{flat:""}},[i("v-toolbar-title",[t._v("商品管理"),i("v-dialog",{attrs:{"max-width":"800px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-btn",t._g(t._b({staticClass:"ml-12 mb-2",attrs:{small:"",color:"primary",dark:""}},"v-btn",n,!1),a),[t._v("新增商品")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"text-h5"},[t._v(t._s(t.formtitle))])]),i("v-card-text",[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12"}},[i("v-text-field",{attrs:{label:"商品名稱"},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}}),i("v-text-field",{attrs:{label:"商品促銷活動"},model:{value:t.editedItem.discounttext,callback:function(e){t.$set(t.editedItem,"discounttext",e)},expression:"editedItem.discounttext"}}),i("file-pond",{ref:"pond",attrs:{name:"pond","accepted-file-types":"image/jpeg, image/png","label-idle":"點擊或拖曳選擇圖片",files:t.editedItem.image},on:{updatefiles:t.handleFilePondUpdateFile}}),i("InputNumber",{attrs:{label:"商品數量"},model:{value:t.editedItem.quantity,callback:function(e){t.$set(t.editedItem,"quantity",e)},expression:"editedItem.quantity"}}),i("v-text-field",{attrs:{prefix:"$",label:"商品價格"},model:{value:t.editedItem.price,callback:function(e){t.$set(t.editedItem,"price",e)},expression:"editedItem.price"}}),i("v-textarea",{attrs:{label:"商品簡述"},model:{value:t.editedItem.shortcut,callback:function(e){t.$set(t.editedItem,"shortcut",e)},expression:"editedItem.shortcut"}}),i("vue-editor",{attrs:{label:"詳細說明"},model:{value:t.editedItem.description,callback:function(e){t.$set(t.editedItem,"description",e)},expression:"editedItem.description"}})],1)],1)],1)],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v("取消")]),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.save}},[t._v("保存")])],1)],1)],1),i("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.statedialog,callback:function(e){t.statedialog=e},expression:"statedialog"}},[i("v-card",[i("v-card-title",{staticClass:"text-h6"},[t._v("確定更改商品上架狀態嗎？")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.cancelState}},[t._v("取消")]),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.submitState}},[t._v("確定")])],1)],1)],1)],1),i("v-spacer"),i("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.image",fn:function(t){var e=t.item;return[i("v-img",{attrs:{width:"125",contain:"",src:e.image[0],"max-width":""}})]}},{key:"item.sell",fn:function(e){var a=e.item;return[i("v-switch",{attrs:{readonly:""},on:{click:function(e){return t.changeState(a)}},model:{value:a.sell,callback:function(e){t.$set(a,"sell",e)},expression:"item.sell"}})]}},{key:"item.actions",fn:function(e){var a=e.item;return[i("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(a)}}},[t._v("mdi-pencil")])]}}])})],1)},n=[],s=i("1da1"),r=(i("96cf"),i("d81d"),i("99af"),i("6e95")),o={name:"ProductManage",data:function(){return{products:[],search:"",headers:[{text:"商品名稱",align:"start",sortable:!1,value:"name"},{text:"商品圖片",value:"image"},{text:"商品數量",value:"quantity"},{text:"商品價格",value:"price"},{text:"發布狀態",value:"sell"},{text:"編輯",value:"actions",sortable:!1}],statedialog:!1,deldialog:!1,dialog:!1,editedIndex:-1,editedItem:{name:"",price:0,quantity:0,image:[],shortcut:"",description:"",discounttext:"",sell:!1}}},components:{InputNumber:r["a"]},computed:{formtitle:function(){return-1===this.editedIndex?"新增商品":"編輯商品"}},methods:{editItem:function(t){this.editedIndex=this.products.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},close:function(){var t=this;this.dialog=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},save:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,a,n,s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(a in e.prev=0,i=new FormData,t.editedItem)if(Array.isArray(t.editedItem[a])&&"image"===a)for(n in t.editedItem[a])i.append(a,t.editedItem[a][n]);else i.append(a,t.editedItem[a]);if(!(t.editedIndex>-1)){e.next=8;break}return e.next=6,t.axios.patch("/products/"+t.products[t.editedIndex]._id,i,{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 6:e.next=10;break;case 8:return e.next=10,t.axios.post("/products/",i,{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 10:return e.next=12,t.axios.get("/products/");case 12:s=e.sent,r=s.data,t.products=r.result.map((function(t){return t.image=t.image.map((function(t){return"".concat("https://recook-recipe-web.herokuapp.com","/files/").concat(t)})),t})),t.close(),e.next=21;break;case 18:e.prev=18,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:e.t0.response.data.message});case 21:case"end":return e.stop()}}),e,null,[[0,18]])})))()},changeState:function(t){this.editedIndex=this.products.indexOf(t),this.editedItem=Object.assign({},t),this.statedialog=!0},cancelState:function(){var t=this;this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1})),this.statedialog=!1},submitState:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,a,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(a in e.prev=0,1===t.editedItem.sell?t.editedItem.sell=0:t.editedItem.sell=1,i=new FormData,t.editedItem)i.append(a,t.editedItem[a]);return e.next=6,t.axios.patch("/products/"+t.products[t.editedIndex]._id,i,{headers:{authorization:"Bearer "+t.$store.state.jwt.token}});case 6:return t.statedialog=!1,t.editedIndex=-1,e.next=10,t.axios.get("/products/");case 10:n=e.sent,s=n.data,t.products=s.result.map((function(t){return t.image=t.image.map((function(t){return"".concat("https://recook-recipe-web.herokuapp.com","/files/").concat(t)})),t})),e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:e.t0.response.data.message});case 18:case"end":return e.stop()}}),e,null,[[0,15]])})))()},handleFilePondUpdateFile:function(t){this.editedItem.image=t.map((function(t){return t.file}))}},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var i,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.axios.get("/products/");case 2:i=e.sent,a=i.data,t.products=a.result.map((function(t){return t.image=t.image.map((function(t){return"".concat("https://recook-recipe-web.herokuapp.com","/files/").concat(t)})),t}));case 5:case"end":return e.stop()}}),e)})))()}},l=o,c=i("2877"),u=i("6544"),d=i.n(u),h=i("8336"),p=i("b0af"),m=i("99d9"),f=i("62ad"),v=i("a523"),g=i("8fea"),b=i("169a"),x=i("132d"),w=i("adda"),I=i("0fd9"),k=i("2fa4"),y=i("b73d"),V=i("8654"),C=i("a844"),$=i("71d9"),S=i("2a7f"),_=Object(c["a"])(l,a,n,!1,null,null,null);e["default"]=_.exports;d()(_,{VBtn:h["a"],VCard:p["a"],VCardActions:m["a"],VCardText:m["b"],VCardTitle:m["c"],VCol:f["a"],VContainer:v["a"],VDataTable:g["a"],VDialog:b["a"],VIcon:x["a"],VImg:w["a"],VRow:I["a"],VSpacer:k["a"],VSwitch:y["a"],VTextField:V["a"],VTextarea:C["a"],VToolbar:$["a"],VToolbarTitle:S["a"]})},1681:function(t,e,i){},5311:function(t,e,i){"use strict";var a=i("5607"),n=i("2b0e");e["a"]=n["default"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"6e95":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-text-field",{attrs:{outlined:"","append-icon":"$vuetify.icons.plus",label:t.label,mask:t.mask,outline:t.outline,"prepend-inner-icon":"$vuetify.icons.minus",rules:t.rules,value:t.value,dense:"",solo:"",flat:"",color:"orange"},on:{"click:append":function(e){return e.stopPropagation(),t.increase.apply(null,arguments)},"click:prepend-inner":function(e){return e.stopPropagation(),t.decrease.apply(null,arguments)},change:function(e){return t.$emit("input",e)}}})},n=[],s=(i("a9e3"),{props:{label:{type:String,default:""},min:{type:Number,default:1},max:{type:Number,default:9999},maxLength:{type:Number,default:4},outline:{type:Boolean,default:!0},rules:{type:Array,default:function(){return[]}},step:{type:Number,default:1},height:{type:String},value:[String,Number]},computed:{mask:function(){for(var t="",e=0;e<this.maxLength;e++)t="".concat(t,"#");return t}},methods:{increase:function(){if(isNaN(parseInt(this.value)))return this.$emit("input",this.step);this.value!==this.max&&this.$emit("input",parseInt(this.value)+this.step)},decrease:function(){if(isNaN(parseInt(this.value)))return this.$emit("input",this.min);this.value!==this.min&&this.$emit("input",parseInt(this.value)-this.step)}}}),r=s,o=i("2877"),l=i("6544"),c=i.n(l),u=i("8654"),d=Object(o["a"])(r,a,n,!1,null,null,null);e["a"]=d.exports;c()(d,{VTextField:u["a"]})},"9d01":function(t,e,i){},a844:function(t,e,i){"use strict";var a=i("5530"),n=(i("a9e3"),i("1681"),i("8654")),s=i("58df"),r=Object(s["a"])(n["a"]);e["a"]=r.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(a["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},n["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=n["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){n["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},b73d:function(t,e,i){"use strict";var a=i("15fd"),n=i("5530"),s=(i("0481"),i("ec29"),i("9d01"),i("fe09")),r=i("c37a"),o=i("c3f0"),l=i("0789"),c=i("490a"),u=i("80d2"),d=["title"];e["a"]=s["a"].extend({name:"v-switch",directives:{Touch:o["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){var t=this.attrs$,e=(t.title,Object(a["a"])(t,d));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs),e)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(n["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(n["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(l["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(c["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===u["w"].left&&this.isActive||t.keyCode===u["w"].right&&!this.isActive)&&this.onChange()}}})},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i.d(e,"b",(function(){return o}));i("d3b7"),i("25f0"),i("4de4");var a=i("c37a"),n=i("5311"),s=i("8547"),r=i("58df");function o(t){t.preventDefault()}e["a"]=Object(r["a"])(a["a"],n["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=productmanage.1276188d.js.map