<template lang="pug">
v-container(fluid)#about.pa-0.px-lg-12.mb-12
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    div.d-flex.flex-column.align-center.justify-center.mb-3.py-lg-8
      p.black--text.text-h4.mb-12 關於我們的來由與故事
      p.text-h5.mr-3 橫跨了空間限制，創造更多溫暖的料理和廚房互動。
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    v-row
      v-col(cols="12")
        v-row
          v-col(cols="6" lg="4")
            v-img.rounded-lg(src="../assets/photo-5.jpg")
          v-col(cols="6" lg="4")
            v-img.rounded-lg(src="../assets/photo-6.jpg")
          v-col(cols="12" lg="4")
            v-img.rounded-lg(src="../assets/photo-7.jpg")
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    div.d-flex.flex-column.align-center.justify-center.mb-3.py-lg-8
      p.black--text.text-h4.mb-12 探索彼此的食譜
      p.text-h5.mr-3 從分享的食譜中嘗試不同的料理美學和烹飪技巧。
      v-sheet(width="100%")
        router-link(to="/recipes")
          v-parallax.rounded-lg(src="../assets/photo-9.jpg" height="300")
  v-divider
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    div.d-flex.flex-column.align-center.justify-center.mb-3.py-lg-8
      p.black--text.text-h4.mb-12 補充料理與生活新知
      p.text-h5.mr-3 嘗試用不同的方式，提供健康、美食以及料理的生活分享。
      v-sheet(width="100%")
        router-link(to="/posts")
          v-parallax.rounded-lg(src="../assets/photo-10.jpg" height="300")
  v-divider
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    div.d-flex.flex-column.align-center.justify-center.mb-3.py-lg-8
      p.black--text.text-h4.mb-12 提供您下廚所有的工具
      p.text-h5.mr-3 一站化的服務設計，提供即將成為你幫手的各類廚房用品。
      v-sheet(width="100%")
        router-link(to="/products")
          v-parallax.rounded-lg(src="../assets/photo-11.jpg" height="300")
</template>

<script>
export default {
  name: 'About'
}
</script>
