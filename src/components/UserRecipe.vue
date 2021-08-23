<template lang="pug">
v-card.mx-auto(max-width="300" elevation="0")
  v-img.rounded-lg(height="250" :src="recipe.image[0]")
    div.d-flex.align-center
      v-btn(x-small fab icon @click.prevent="sendlike")
        v-icon.white--text {{likeicon}}
      span.overline.white--text {{recipe.likes.length}}
      v-btn(x-small fab icon @click.prevent="sendfav")
        v-icon.white--text {{favicon}}
      v-spacer
      v-sheet.text-caption.red.white--text.px-1.mr-3(v-if="recipe.video" rounded) video
  div.pt-3.d-flex.align-center
    div
      div.text-subtitle-1.font-weight-bold {{ recipe.name }}
      div.text-caption.grey--text Published: {{recipe.publish_date}}
</template>

<script>
export default {
  name: 'UserRecipe',
  props: {
    recipe: {
      type: Object,
      required: true
    },
    nowuser: {
      type: Object
    }
  },
  computed: {
    likeicon () {
      return this.recipe.like ? 'mdi-heart' : 'mdi-heart-outline'
    },
    favicon () {
      return this.recipe.favorite ? 'mdi-bookmark' : 'mdi-bookmark-outline'
    },
    username () {
      return this.recipe.author.username ? this.recipe.author.username : this.recipe.author.account
    }
  },
  methods: {
    async sendlike () {
      if (this.user.islogin) {
        await this.axios.patch('/users/like/' + this.$store.state.user._id, { _id: this.recipe._id }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$emit('sendlike')
      } else {
        this.$router.push('/login')
      }
    },
    async sendfav () {
      if (this.user.islogin) {
        await this.axios.patch('/users/favorite/' + this.$store.state.user._id, { _id: this.recipe._id }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$emit('sendfav')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
