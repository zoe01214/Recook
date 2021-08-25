<template lang="pug">
v-container(fluid)#postinfo.pa-0.px-lg-12.mb-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 料理生活
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12(v-if="post.isEnabled === 1")
    v-container.text-center
      h2.py-6.infotitle {{post.title}}
    v-container.px-lg-12
      v-img(contain :src="post.image").mb-6
    v-container.px-lg-12
      v-sheet.quotes.text-left.mx-auto.pa-10.pa-lg-12.rounded-xl
        p.pt-3.px-lg-4.content(v-html="post.content")
    v-container.px-lg-12
      div.text-right.date 發佈時間: {{post.date}}
  v-container.px-lg-12(v-cloak v-else)
    v-sheet.bg-white-2.text-center.pa-6.rounded-xl
      v-alert(type="error") 這則貼文已經下架囉！
</template>

<script>
export default {
  name: 'PostInfo',
  data () {
    return {
      post: []
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/posts/' + this.$route.params.id)
      this.post = data.result
      this.post.date = new Date(this.post.date).toLocaleString().slice(0, -11)
      this.post.image = this.post.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)[0]
    } catch (error) {}
  }
}
</script>
