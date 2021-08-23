<template lang="pug">
v-container(fluid)#postinfo.pa-0.mb-12
  v-container.mb-4
    v-row
      v-col(cols="12")
        v-sheet.px-12.d-flex.align-center
          h2.header-title.mr-6 料理生活
          v-divider
  v-container.px-lg-12(v-if="post.isEnabled === 1")
    v-sheet.bg-white-2.text-center.pa-6.rounded-xl
      v-container
        h2.py-6.infotitle {{post.title}}
      v-container.px-lg-12
        v-img(contain :src="post.image").mb-6
      v-container.px-lg-12
        v-sheet.quotes.text-left.mx-auto.pa-10.pa-lg-12.rounded-xl
          p.pt-3.px-lg-4.content(v-html="post.content")
      v-container.px-lg-12
        div.text-right.date 發佈時間: {{post.date}}
  v-container.px-lg-12(v-else)
    v-sheet.bg-white-2.text-center.pa-6.rounded-xl
        h2 這筆文章已經下架囉！
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
