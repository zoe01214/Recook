<template lang="pug">
v-card#recipecard(flat)
  router-link(:to="'/recipe/' + recipe._id")
    v-img.rounded-lg.imgheight.draktop(height="380" :src="recipe.image[0]")
      div.d-flex.align-center
        v-btn(x-small fab icon @click.prevent="sendlike")
          v-icon.white--text {{likeicon}}
        span.overline.white--text {{recipe.likes.length}}
        v-btn(x-small fab icon @click.prevent="sendfav")
          v-icon.white--text {{favicon}}
        v-spacer
        v-sheet.text-caption.red.white--text.px-1.mr-3(v-if="recipe.video" rounded) video
  div.pt-3
    div.mb-1.recipetitle.single-line {{ recipe.name }}
    v-sheet
      div.d-flex.align-center
        router-link(:to="'/user/' + recipe.author._id").d-flex.align-center
          v-avatar.d-flex.mr-3(v-if="recipe.author.avatar && recipe.author.avatar.length !== 0" :size="avatar.size")
            img(:src="recipe.author.avatar[0]")
          avatar.d-flex.mr-3(v-else :size="avatar.size" :name="recipe.author.account" :variant="avatar.variant" :colors="avatar.colors")
          div
            div.mb-1.single-line.text-subtitle-1.black--text {{username}}
            div.single-line.text-subtitle-2.grey--text.font-weight-light.mt-n2 {{ recipe.author.recipes }} 道食譜 {{recipe.author.follower}} 位粉絲
</template>

<script>
export default ({
  name: 'RecipeCard',
  data () {
    return {
      avatar: {
        size: 45,
        colors: ['#F0F2DC', '#F9D365', '#D9EB52', '#87796F', '#9FA789'],
        variant: 'beam'
      }
    }
  },
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
})
</script>
