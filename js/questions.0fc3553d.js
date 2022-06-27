(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["questions"],{"210b":function(e,n,t){},"66ba":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-container",{staticClass:"pa-0 px-lg-12 mb-12",attrs:{id:"products",fluid:""}},[t("v-sheet",{staticClass:"mx-3 px-lg-12 d-flex align-center mb-12"},[t("h2",{staticClass:"header-title mr-6"},[e._v("常見問題")]),t("v-divider")],1),t("v-sheet",{staticClass:"mx-3 mx-lg-10 pa-8 rounded-xl bg-white-2 mt-12"},[t("v-container",{staticClass:"pa-xl-12"},[t("v-expansion-panels",{staticClass:"panels",attrs:{flat:""}},[t("v-expansion-panel",{staticClass:"pa-lg-6 py-2 mb-5 panelitem"},[t("v-expansion-panel-header",{staticClass:"paneltitle"},[e._v("如何編輯已發佈的食譜？")]),t("v-expansion-panel-content",[t("v-divider",{staticClass:"my-3 mb-6"}),t("p",[e._v("若要編輯已發佈的食譜，請先登入，可在該食譜內文的右方，看到「編輯食譜」的選項，點擊可進行編輯。"),t("br"),e._v("若要刪除食譜可按下「刪除食譜」。")])],1)],1),t("v-expansion-panel",{staticClass:"pa-lg-6 py-2 mb-5 panelitem"},[t("v-expansion-panel-header",{staticClass:"paneltitle"},[e._v("按讚跟收藏有什麼不同？")]),t("v-expansion-panel-content",[t("v-divider",{staticClass:"my-3 mb-6"}),t("p",[e._v("❤️說讚，按下去代表你覺得這篇食譜很讚，說讚的人數會顯示在該道食譜上，也是對食譜作者的鼓勵。"),t("br"),e._v("收藏，按下去代表你要將這篇食譜收藏起來，收藏的人數不會顯示在該道食譜上，你收藏的食譜可以在個人頁面中的收藏找到。")])],1)],1),t("v-expansion-panel",{staticClass:"pa-lg-6 py-2 mb-5 panelitem"},[t("v-expansion-panel-header",{staticClass:"paneltitle"},[e._v("不小心按到刪除食譜怎麼辦？")]),t("v-expansion-panel-content",[t("v-divider",{staticClass:"my-3 mb-6"}),t("p",[e._v("請先登入後，來信到客服信箱，由專人幫您審核通過後恢復食譜喔！")])],1)],1)],1)],1)],1)],1)},s=[],i={name:"Questions"},o=i,l=t("2877"),c=t("6544"),r=t.n(c),p=t("a523"),d=t("ce7e"),h=t("5530"),u=t("4e82"),v=t("3206"),x=t("80d2"),b=t("58df"),f=Object(b["a"])(Object(u["a"])("expansionPanels","v-expansion-panel","v-expansion-panels"),Object(v["b"])("expansionPanel",!0)).extend({name:"v-expansion-panel",props:{disabled:Boolean,readonly:Boolean},data:function(){return{content:null,header:null,nextIsActive:!1}},computed:{classes:function(){return Object(h["a"])({"v-expansion-panel--active":this.isActive,"v-expansion-panel--next-active":this.nextIsActive,"v-expansion-panel--disabled":this.isDisabled},this.groupClasses)},isDisabled:function(){return this.expansionPanels.disabled||this.disabled},isReadonly:function(){return this.expansionPanels.readonly||this.readonly}},methods:{registerContent:function(e){this.content=e},unregisterContent:function(){this.content=null},registerHeader:function(e){this.header=e,e.$on("click",this.onClick)},unregisterHeader:function(){this.header=null},onClick:function(e){e.detail&&this.header.$el.blur(),this.$emit("click",e),this.isReadonly||this.isDisabled||this.toggle()},toggle:function(){var e=this;this.$nextTick((function(){return e.$emit("change")}))}},render:function(e){return e("div",{staticClass:"v-expansion-panel",class:this.classes,attrs:{"aria-expanded":String(this.isActive)}},Object(x["r"])(this))}}),m=t("0789"),g=t("9d65"),C=t("a9ad"),y=Object(b["a"])(g["a"],C["a"],Object(v["a"])("expansionPanel","v-expansion-panel-content","v-expansion-panel")),A=y.extend().extend({name:"v-expansion-panel-content",data:function(){return{isActive:!1}},computed:{parentIsActive:function(){return this.expansionPanel.isActive}},watch:{parentIsActive:{immediate:!0,handler:function(e,n){var t=this;e&&(this.isBooted=!0),null==n?this.isActive=e:this.$nextTick((function(){return t.isActive=e}))}}},created:function(){this.expansionPanel.registerContent(this)},beforeDestroy:function(){this.expansionPanel.unregisterContent()},render:function(e){var n=this;return e(m["a"],this.showLazyContent((function(){return[e("div",n.setBackgroundColor(n.color,{staticClass:"v-expansion-panel-content",directives:[{name:"show",value:n.isActive}]}),[e("div",{class:"v-expansion-panel-content__wrap"},Object(x["r"])(n))])]})))}}),O=t("9d26"),j=t("5607"),P=Object(b["a"])(C["a"],Object(v["a"])("expansionPanel","v-expansion-panel-header","v-expansion-panel")),w=P.extend().extend({name:"v-expansion-panel-header",directives:{ripple:j["a"]},props:{disableIconRotate:Boolean,expandIcon:{type:String,default:"$expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:function(){return{hasMousedown:!1}},computed:{classes:function(){return{"v-expansion-panel-header--active":this.isActive,"v-expansion-panel-header--mousedown":this.hasMousedown}},isActive:function(){return this.expansionPanel.isActive},isDisabled:function(){return this.expansionPanel.isDisabled},isReadonly:function(){return this.expansionPanel.isReadonly}},created:function(){this.expansionPanel.registerHeader(this)},beforeDestroy:function(){this.expansionPanel.unregisterHeader()},methods:{onClick:function(e){this.$emit("click",e)},genIcon:function(){var e=Object(x["r"])(this,"actions")||[this.$createElement(O["a"],this.expandIcon)];return this.$createElement(m["d"],[this.$createElement("div",{staticClass:"v-expansion-panel-header__icon",class:{"v-expansion-panel-header__icon--disable-rotate":this.disableIconRotate},directives:[{name:"show",value:!this.isDisabled}]},e)])}},render:function(e){var n=this;return e("button",this.setBackgroundColor(this.color,{staticClass:"v-expansion-panel-header",class:this.classes,attrs:{tabindex:this.isDisabled?-1:null,type:"button","aria-expanded":this.isActive},directives:[{name:"ripple",value:this.ripple}],on:Object(h["a"])(Object(h["a"])({},this.$listeners),{},{click:this.onClick,mousedown:function(){return n.hasMousedown=!0},mouseup:function(){return n.hasMousedown=!1}})}),[Object(x["r"])(this,"default",{open:this.isActive},!0),this.hideActions||this.genIcon()])}}),B=(t("0481"),t("210b"),t("604c")),_=t("d9bd"),k=B["a"].extend({name:"v-expansion-panels",provide:function(){return{expansionPanels:this}},props:{accordion:Boolean,disabled:Boolean,flat:Boolean,hover:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,readonly:Boolean,tile:Boolean},computed:{classes:function(){return Object(h["a"])(Object(h["a"])({},B["a"].options.computed.classes.call(this)),{},{"v-expansion-panels":!0,"v-expansion-panels--accordion":this.accordion,"v-expansion-panels--flat":this.flat,"v-expansion-panels--hover":this.hover,"v-expansion-panels--focusable":this.focusable,"v-expansion-panels--inset":this.inset,"v-expansion-panels--popout":this.popout,"v-expansion-panels--tile":this.tile})}},created:function(){this.$attrs.hasOwnProperty("expand")&&Object(_["a"])("expand","multiple",this),Array.isArray(this.value)&&this.value.length>0&&"boolean"===typeof this.value[0]&&Object(_["a"])(':value="[true, false, true]"',':value="[0, 2]"',this)},methods:{updateItem:function(e,n){var t=this.getValue(e,n),a=this.getValue(e,n+1);e.isActive=this.toggleMethod(t),e.nextIsActive=this.toggleMethod(a)}}}),$=t("8dd9"),I=Object(l["a"])(o,a,s,!1,null,null,null);n["default"]=I.exports;r()(I,{VContainer:p["a"],VDivider:d["a"],VExpansionPanel:f,VExpansionPanelContent:A,VExpansionPanelHeader:w,VExpansionPanels:k,VSheet:$["a"]})}}]);
//# sourceMappingURL=questions.0fc3553d.js.map