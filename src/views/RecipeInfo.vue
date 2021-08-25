<template lang="pug">
v-container(fluid)#recipeinfo.pa-0.px-lg-12.mb-12
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    v-row.trigger
      v-col(cols="12" lg="4").order-lg-2.d-none.d-lg-flex.justify-end
        v-sheet(width="380px").imgfixed
          v-carousel.rounded-lg.mb-3(hide-delimiter-background show-arrows-on-hover max)
            v-carousel-item(
              v-if="recipe.video"
              reverse-transition="fade-transition"
              transition="fade-transition")
              iframe(width="100%" height="100%" :src="recipe.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
            v-carousel-item(
              v-for="(item,idx) in recipe.image"
              :key="idx"
              :src="item"
              reverse-transition="fade-transition"
              transition="fade-transition")
              div.d-flex
                div.ma-2
                  v-btn(small icon fab @click.prevent="likes")
                    v-icon.white--text {{ likeicon }}
                  span.overline.white--text {{ recipe.likes.length }}
                v-spacer
                div.ma-2
                  v-btn(small icon fab @click.prevent="favorites")
                    v-icon.white--text {{ favicon }}
          div.text-right.text-caption.grey--text Published: {{ recipe.publish_date }}
      v-col(cols="12" lg="8").order-md-1.leftsection
        v-sheet.px-6.px-lg-0.pr-lg-6
          div
            v-sheet.d-flex.align-center
              router-link(:to="'/user/' + author._id").d-flex.align-center
                v-avatar.d-flex.mr-3(v-if="author.avatar.length > 0" :size="avatar.size")
                  img(:src="author.avatar")
                avatar.d-flex.mr-3(v-else :size="avatar.size" :name="author.account" :variant="avatar.variant" :colors="avatar.colors")
                div
                  h3.mb-2.single-line.black--text {{username}}
                  div.text-subtitle-2.single-line.grey--text.font-weight-light.mt-n2 {{author.total}} 道食譜 {{author.follower.length}} 位粉絲
              v-spacer
              v-menu(offset-y v-if="user._id === author._id")
                template(v-slot:activator="{ on, attrs }")
                  v-btn(outlined color="#DEA56A" v-bind="attrs" v-on="on" )
                    span.font-h5 編輯食譜
                    v-icon(x-small) mdi-chevron-down
                v-list(dense)
                  v-list-item(:to="'/recipe/edit/' + recipe._id").d-flex.justify-center
                    div.subtitle-1 修改
                  v-list-item(@click="delRecipeById").d-flex.justify-center
                    div.subtitle-1.red--text 刪除
              div.d-flex.align-center
                v-btn.orangebtn(depressed @click="follow" v-if="!nowuser.follow && (user._id !== author._id)")
                  span.font-h5.white--text 追蹤
                v-btn(depressed outlined color="#DEA56A" @click="follow" v-if="nowuser.follow && (user._id !== author._id)")
                  span.font-h5 追蹤中
                  v-icon(x-small) mdi-chevron-down
          v-divider.my-3
          div
            div#smcarousel.d-flex.d-lg-none.flex-column
              v-carousel.rounded-lg.mb-3(hide-delimiter-background show-arrows-on-hover max)
                v-carousel-item(
                  v-if="recipe.video"
                  reverse-transition="fade-transition"
                  transition="fade-transition")
                  iframe(width="100%" height="100%" :src="recipe.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
                v-carousel-item(
                  v-for="(item,idx) in recipe.image"
                  :key="idx"
                  :src="item"
                  reverse-transition="fade-transition"
                  transition="fade-transition")
                  div.d-flex
                    div
                      v-btn(x-small icon fab @click.prevent="likes")
                        v-icon.white--text {{ likeicon }}
                      span.overline.white--text {{ likecount }}
                    v-spacer
                    v-btn(x-small icon fab @click.prevent="favorites")
                      v-icon.white--text {{ favicon }}
              div.text-right.text-caption.grey--text Published: {{ recipe.publish_date }}
              v-divider.mt-3.mb-6
            p.text-h5.font-weight-bold.d-flex.align-center.mb-6
              span.mr-3 {{recipe.name}}
              v-sheet.text-caption.red.white--text.px-1(v-if="recipe.video" rounded) video
            p(style="white-space: pre-wrap;line-height:1.5rem;").mb-8.text-body-1 {{recipe.description}}
            v-sheet(width="100%").d-flex.justify-center.align-center.mb-6
              v-sheet(width="50%" outlined).text-center
                div.timeheight 份量
                v-divider
                div.timeheight.text-h6 {{recipe.servings}}
                  div.timecaption
                    div.caption 人份
              v-sheet(width="50%" outlined).text-center
                div.timeheight 時間
                v-divider
                div.timeheight.text-h6 {{recipe.time}}
                  div.timecaption
                    div.caption 分鐘
          v-sheet(width="100%").mb-6
            p.text-h5 食材
            v-sheet.rounded-lg.pa-5(outlined)
              v-container.d-flex(v-for="item of recipe.ingredients" :key="item._id")
                div.subtitle-1 {{item.ingredient}}
                v-spacer
                div.subtitle-1 {{item.portion}}
        v-sheet.px-6.px-lg-0.pr-lg-6
          p.text-h5 作法
          v-card.pa-5.rounded-lg.my-3(v-for="(item, idx) of recipe.instructions" :key="idx" elevation="0" outlined)
            div.text-overline.font-weight-light {{nowstep(idx)}}
            v-card-text(style="white-space: pre-wrap;line-height: 1.5rem;").text-body-1.black--text {{item}}
        v-sheet.px-6.px-lg-0.pr-lg-6
          p.text-h5 留言
          v-card.pa-5.rounded-lg.my-3(v-for="(item, idx) of recipe.comments" v-if="item.isEnabled !== 0" :key="idx" elevation="0" outlined)
            v-sheet.d-flex.align-center
              v-avatar.d-flex.mr-3(v-if="item.users.avatar !== undefined && item.users.avatar.length > 0 && item.users.avatar !== ''" :size="avatar.size-20")
                img(:src="item.users.avatar")
              avatar.d-flex.mr-3(v-else :size="avatar.size-20" :name="item.users.account" :variant="avatar.variant" :colors="avatar.colors")
              h3.black--text {{ (item.users.username !== undefined && item.users.username > 0) ? item.users.username : item.users.account}}
              v-spacer
              v-menu(offset-y)
                template(v-slot:activator="{ on, attrs }")
                  v-btn.square(small text v-bind="attrs" v-on="on")
                    v-icon mdi-dots-horizontal
                v-list(dense)
                  v-dialog(v-model="editdialog" width="500")
                    template(v-slot:activator="{ on, attrs }")
                      v-list-item(v-bind="attrs" v-on="on" @click="editmodel(idx)" v-if="item.users._id === user._id") 編輯
                    v-card.pa-5
                      v-sheet.d-flex.align-center
                        v-avatar.d-flex.mr-3(v-if="user.isavatar" :size="avatar.size-20")
                          img(:src="user.avatar")
                        avatar.d-flex.mr-3(v-else :size="avatar.size-20" :name="user.username" :variant="avatar.variant" :colors="avatar.colors")
                        h3.black--text.single-line {{user.username}}
                      v-textarea(v-model="commentmodel") {{commentmodel}}
                      div.text-right
                        v-btn.black(outlined @click="editmsg(idx)")
                          span.white--text 修改
                  v-list-item(@click="delmsg(idx)" v-if="item.users._id === user._id") 刪除
                  v-dialog(v-model="reportdialog" width="500")
                    template(v-slot:activator="{ on, attrs }")
                      v-list-item(v-bind="attrs" v-on="on" ) 檢舉
                    v-card.pa-5
                      h3 檢舉留言
                      v-textarea(placeholder="檢舉原因..." v-model="newreason")
                      div.text-right
                        v-btn.black(outlined @click="submitreport(idx)")
                          span.white--text 送出
            v-card-text(style="white-space: pre-wrap;").text-body-1.black--text {{item.content}}
            div.text-right.msgdate.caption.grey--text Published: {{item.date.slice(0, 10)}}
          v-card(flat).my-8
            v-btn.orangebtn(text block @click="msgdialog = !msgdialog")
              span.font-h4.spacing 新增留言
  v-speed-dial.d-none.d-lg-flex(
    v-model="fab"
    direction="left"
    :transition="author.transition")
      template(v-slot:activator)
        v-btn.floatbtn(v-model="fab" fab)
          v-icon(v-if="fab") mdi-close
          v-icon(v-else) mdi-dots-horizontal
      v-btn.floatsm(fab dark small outlined @click="msgdialog = !msgdialog")
        v-icon mdi-message-outline
      v-btn.floatsm(fab dark small outlined @click="favorites")
        v-icon {{ favicon }}
      v-btn.floatsm(fab dark small outlined @click="likes")
        v-icon {{ likeicon }}
  v-dialog(v-model="msgdialog" max-width="500")
    v-card.pa-5
      v-sheet.d-flex.align-center
        v-avatar.d-flex.mr-3(v-if="user.isavatar" :size="avatar.size-20")
          img(:src="user.avatar")
        avatar.d-flex.mr-3(v-else :size="avatar.size-20" :name="user.username" :variant="avatar.variant" :colors="avatar.colors")
        h3.black--text {{user.username}}
      v-textarea(placeholder="新增留言..." v-model="newcomment")
      div.text-right
        v-btn.black(outlined @click="submitmsg")
          span.white--text 發佈
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'RecipeInfo',
  data () {
    return {
      headers: [{ text: '準備食材', align: 'start', value: 'ingredient' }, { text: '食材份量', align: 'start', value: 'portion' }],
      recipe: [],
      author: {
        account: '',
        username: '',
        profile: '',
        total: 0,
        avatar: '',
        follow: false,
        follower: [],
        following: [],
        recipes: [],
        _id: '',
        direction: 'left',
        transition: 'slide-y-reverse-transition'
      },
      nowuser: {
        following: [],
        likes: [],
        favorites: []
      },
      avatar: {
        size: 55,
        colors: ['#F0F2DC', '#F9D365', '#D9EB52', '#87796F', '#9FA789'],
        variant: 'beam'
      },
      msgdialog: false,
      newcomment: '',
      commentmodel: '',
      reportdialog: false,
      newreason: '',
      editdialog: false,
      fab: false
    }
  },
  computed: {
    likeicon () {
      return this.nowuser.like ? 'mdi-heart' : 'mdi-heart-outline'
    },
    favicon () {
      return this.nowuser.favorite ? 'mdi-bookmark' : 'mdi-bookmark-outline'
    },
    username () {
      return this.author.username ? this.author.username : this.author.account
    },
    likecount () {
      return this.recipe.likes !== undefined ? this.recipe.likes.length : 0
    }
  },
  methods: {
    async delRecipeById () {
      try {
        await this.axios.patch('/recipes/del/' + this.recipe._id, { isEnabled: 0 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '食譜刪除成功'
        })
        this.$router.push('/recipes/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    async follow () {
      if (this.user.islogin) {
        await this.axios.patch('/users/follow/' + this.$store.state.user._id, { _id: this.author._id }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        if (this.nowuser.follow) {
          const auridx = this.author.follower.map(l => l.users).indexOf(this.$store.state.user._id)
          this.author.follower.splice(auridx, 1)
          const nowidx = this.nowuser.following.map(l => l.users).indexOf(this.author._id)
          this.nowuser.following.splice(nowidx, 1)
        } else {
          this.author.follower.push({ users: this.$store.state.user._id })
          this.nowuser.following.push({ users: this.author._id })
        }
        this.nowuser.follow = !this.nowuser.follow
      } else {
        this.$router.push('/login')
      }
    },
    async likes () {
      if (this.user.islogin) {
        await this.axios.patch('/users/like/' + this.$store.state.user._id, { _id: this.recipe._id }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        if (this.nowuser.like) {
          const idx = this.recipe.likes.map(l => l.users).indexOf(this.$store.state.user._id)
          this.recipe.likes.splice(idx, 1)
          const nowidx = this.nowuser.likes.map(l => l.recipes).indexOf(this.recipe._id)
          this.nowuser.likes.splice(nowidx, 1)
        } else {
          this.recipe.likes.push({ user: this.$store.state.user._id })
          this.nowuser.likes.push({ recipes: this.recipe._id })
        }
        this.nowuser.like = !this.nowuser.like
      } else {
        this.$router.push('/login')
      }
    },
    async favorites () {
      if (this.user.islogin) {
        await this.axios.patch('/users/favorite/' + this.$store.state.user._id, { _id: this.recipe._id }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        if (this.nowuser.favorite) {
          const nowidx = this.nowuser.favorites.map(l => l.recipes).indexOf(this.recipe._id)
          this.nowuser.favorites.splice(nowidx, 1)
        } else {
          this.nowuser.favorites.push({ recipes: this.recipe._id })
        }
        this.nowuser.favorite = !this.nowuser.favorite
      } else {
        this.$router.push('/login')
      }
    },
    async submitmsg () {
      try {
        const data = {
          _id: this.user._id,
          content: this.newcomment,
          date: Date.now()
        }
        await this.axios.patch('/recipes/msg/' + this.recipe._id, data, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '食譜留言成功'
        })
        this.recipe.comments.push({
          content: this.newcomment,
          date: `${new Date().getFullYear()}-${new Date().getMonth() < 10 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth()}`}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`,
          isEnabled: 1,
          users: {
            _id: this.user._id,
            account: this.user.account,
            username: this.user.username,
            avatar: this.user.avatar
          }
        })
        this.newcomment = ''
        this.msgdialog = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    editmodel (idx) {
      this.commentmodel = this.recipe.comments[idx].content
    },
    async editmsg (idx) {
      try {
        const data = {
          _id: this.recipe.comments[idx]._id,
          content: this.commentmodel
        }
        await this.axios.patch('/recipes/msgedit/' + this.recipe._id, data, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '留言修改成功'
        })
        this.recipe.comments[idx].content = this.commentmodel
        this.editdialog = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    async delmsg (idx) {
      try {
        const data = {
          _id: this.recipe.comments[idx]._id,
          isEnabled: 0
        }
        await this.axios.patch('/recipes/msgedit/' + this.recipe._id, data, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '留言刪除成功'
        })
        this.recipe.comments[idx].isEnabled = 0
        this.msgdialog = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    async submitreport (idx) {
      try {
        const data = {
          recipe: this.recipe._id,
          comment_id: this.recipe.comments[idx]._id,
          reason: this.newreason,
          reportuser: this.user._id,
          commentuser: this.recipe.comments[idx].users._id
        }
        await this.axios.post('/reports/', data, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '留言檢舉成功'
        })
        this.reportdialog = false
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    nowstep (idx) {
      if (this.recipe.instructions.length < 10) {
        return `0${idx + 1}/0${this.recipe.instructions.length}`
      } else {
        if ((idx + 1) < 10) {
          return `0${idx + 1}/${this.recipe.instructions.length}`
        } else {
          return `${idx + 1}/${this.recipe.instructions.length}`
        }
      }
    },
    animation () {
      gsap.from('.imgfixed', {
        scrollTrigger: {
          trigger: '.imgfixed',
          start: 'top top',
          end: 'top top',
          scrub: true
        },
        position: 'relative',
        'max-width': '380px'
      })
    }
  },
  async mounted () {
    try {
      this.animation()
      const { data } = await this.axios.get('/recipes/' + this.$route.params.id)
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      this.recipe = data.result
      this.recipe.image = data.result.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
      this.recipe.publish_date = data.result.publish_date.slice(0, 10)
      this.recipe.comment_id = this.recipe.comments.map(c => {
        if (c.users.avatar !== undefined) {
          if (c.users.avatar !== '' && c.users.avatar.length > 0) {
            c.users.avatar = `${process.env.VUE_APP_API}/files/${c.users.avatar[0]}`
          }
        }
        return c
      })
      document.title = this.recipe.name + '- Recook'
      if (data.result.video) {
        this.recipe.video = `https://www.youtube.com/embed/${data.result.video.match(regExp)[7]}`
      }
      const userdata = await this.axios.get('/users/' + this.recipe.author)
      this.author = userdata.data.result
      this.author.total = userdata.data.result.recipes !== undefined ? userdata.data.result.recipes.filter(r => r.recipe.isEnabled === 1).length : 0
      if (userdata.data.result.avatar.length > 0) {
        this.author.avatar = `${process.env.VUE_APP_API}/files/${userdata.data.result.avatar}`
      }
      if (this.user.islogin) {
        // login 之後要加上 nowuser 會用到的 follow, like, favorite
        const user = await this.axios.get('/users/' + this.$store.state.user._id)
        this.nowuser = {
          follow: false,
          like: false,
          favorite: false,
          following: user.data.result.following,
          likes: user.data.result.likes,
          favorites: user.data.result.favorites
        }
        if (this.nowuser.following !== undefined && this.nowuser.following.some(f => f.users._id === this.author._id)) {
          this.nowuser.follow = true
        } else {
          this.nowuser.follow = false
        }
        if (this.nowuser.likes !== undefined && this.nowuser.likes.some(f => f.recipes === this.recipe._id)) {
          this.nowuser.like = true
        } else {
          this.nowuser.like = false
        }
        if (this.nowuser.favorites !== undefined && this.nowuser.favorites.some(f => f.recipes === this.recipe._id)) {
          this.nowuser.favorite = true
        } else {
          this.nowuser.favorite = false
        }
      }
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  },
  watch: {
    msgdialog: {
      handler () {
        if (this.msgdialog) {
          if (!this.user.islogin) {
            this.$router.push('/login')
          }
        }
      },
      deep: true
    },
    reportdialog: {
      handler () {
        if (this.reportdialog) {
          if (!this.user.islogin) {
            this.$router.push('/login')
          }
        }
      },
      deep: true
    },
    editdialog: {
      handler () {
        if (this.editdialog) {
          if (!this.user.islogin) {
            this.$router.push('/login')
          }
        }
      },
      deep: true
    }
  }
}
</script>
