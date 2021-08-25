<template lang="pug">
v-container#products(fluid).pa-0.px-lg-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 常見問題
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-container.pa-xl-12
      v-expansion-panels(flat).panels
        v-expansion-panel.pa-lg-6.py-2.mb-5.panelitem
          v-expansion-panel-header.paneltitle 如何編輯已發佈的食譜？
          v-expansion-panel-content
            v-divider.my-3.mb-6
            p 若要編輯已發佈的食譜，請先登入，可在該食譜內文的右方，看到「編輯食譜」的選項，點擊可進行編輯。<br>若要刪除食譜可按下「刪除食譜」。
        v-expansion-panel.pa-lg-6.py-2.mb-5.panelitem
          v-expansion-panel-header.paneltitle 按讚跟收藏有什麼不同？
          v-expansion-panel-content
            v-divider.my-3.mb-6
            p ❤️說讚，按下去代表你覺得這篇食譜很讚，說讚的人數會顯示在該道食譜上，也是對食譜作者的鼓勵。<br>收藏，按下去代表你要將這篇食譜收藏起來，收藏的人數不會顯示在該道食譜上，你收藏的食譜可以在個人頁面中的收藏找到。
        v-expansion-panel.pa-lg-6.py-2.mb-5.panelitem
          v-expansion-panel-header.paneltitle 不小心按到刪除食譜怎麼辦？
          v-expansion-panel-content
            v-divider.my-3.mb-6
            p 請先登入後，來信到客服信箱，由專人幫您審核通過後恢復食譜喔！
</template>

<script>
export default {
  name: 'Questions'
}
</script>
