<template lang="pug">
v-container(fluid)#posts.pa-0.px-lg-12.mb-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 料理生活
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-row.py-5
      v-col.mb-12(cols="12" md="6" lg="4" v-for="item of posts" :key="item._id" v-if="item.isEnabled === 1")
        router-link(:to="'/post/' + item._id")
          v-card.mx-3.mx-lg-6.rounded
            v-img(cover max-height="250" :src="item.image[0]")
            div.pa-6.text-center
              v-sheet.rounded.mx-12.mb-4.tag {{item.type}}
              h3.mb-2.ptitle {{item.title}}
              div.content(v-html="item.content")
</template>

<script>
export default ({
  name: 'Posts',
  data () {
    return {
      posts: []
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/posts')
      this.posts = data.result.map(p => {
        p.image = p.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
        return p
      })
    } catch (error) {
    }
  }
})
</script>
