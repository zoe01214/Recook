<template lang="pug">
v-container#userpage.pa-0.mb-12
  v-container
    v-sheet.mx-10.rounded-xl
      v-row.d-flex.align-start
        v-col(cols="12" lg="8")
          div.d-flex.align-center
            v-sheet.d-flex.align-center
              v-avatar.d-flex.mr-3(v-if="author.avatar" :size="avatar.size")
                img(:src="author.avatar")
              avatar.d-flex.mr-3(v-else :size="avatar.size" :name="author.account" :variant="avatar.variant" :colors="avatar.colors")
              div
                h3.single-line.mb-2 {{author.username}}
                div.single-line.text-subtitle-1.grey--text.font-weight-light.mt-n2 {{author.total}} 道食譜 {{author.follower.length}} 位粉絲
            v-spacer
            div.d-flex
              v-dialog(
                v-if="user._id === author._id"
                v-model="dialog"
                persistent
                max-width="520px")
                template(v-slot:activator="{ on, attrs }")
                  v-btn.orangebtn(text v-bind="attrs" v-on="on")
                    span.font-h5.d-none.d-md-flex 編輯個人資料
                    v-icon.font-h5.white--text.d-flex.d-md-none mdi-cog
                v-card#userinfo.bg-white-2.rounded-xl.pa-3.py-5
                  p.font-h2.text-center 編輯個人資料
                  v-divider.my-3.mb-5
                  v-form.px-3
                    v-row.mx-auto
                      v-col(cols="12")
                        div.text-center(v-if="showpond")
                          file-pond.mb-3(
                            imageCropAspectRatio="1"
                            imageResizeTargetWidth="250"
                            stylePanelLayout='compact circle'
                            styleLoadIndicatorPosition='center bottom'
                            styleProgressIndicatorPosition='right bottom'
                            styleButtonRemoveItemPosition='left bottom'
                            styleButtonProcessItemPosition='right bottom'
                            accepted-file-types="image/jpeg, image/png"
                            label-idle="選擇圖片"
                            @updatefiles="handleFilePondUpdateFile")
                          v-btn(text @click="showpond = !showpond")
                            span.font-h4 取消
                        div.text-center(v-else)
                          div.pointer.d-flex.justify-center.mb-3
                            v-avatar(v-if="author.avatar" :size="100")
                              img(:src="author.avatar")
                            avatar(v-else :size="100" :name="author.account" :variant="avatar.variant" :colors="avatar.colors")
                          v-btn(text @click="showpond = !showpond")
                            v-icon.mr-3 mdi-pencil
                            span.font-h4 更換大頭貼
                      v-col(cols="12")
                        v-row.mx-auto.mt-3
                          v-col(cols="4")
                            div.font-h4 帳號名稱
                          v-col(cols="8")
                            div {{author.account}}
                          v-col(cols="4")
                            div.font-h4 用戶名稱
                          v-col(cols="8")
                            v-text-field.pa-0.ma-0.mb-n6(v-model="form.newname" color="#DEA56A" dense) {{form.newname}}
                          v-col(cols="4")
                            div.font-h4 個人簡介
                          v-col(cols="8")
                            v-textarea.pa-0.ma-0(v-model="form.newprofile" color="#DEA56A" rows="3" dense placeholder="個人簡介") {{form.newprofile}}
                      v-col(cols="12")
                        div.text-right
                          v-btn(text @click="cancelInfo") 取消
                          v-btn(text color="#DEA56A" @click="submitInfo") 完成
              v-btn.orangebtn(depressed @click="follow" v-show="nowuser.showfollow && (user._id !== author._id)")
                span.font-h5.white--text 追蹤
              v-btn(depressed outlined color="#DEA56A" @click="follow" v-show="!nowuser.showfollow && (user._id !== author._id)")
                span.font-h5 追蹤中
                v-icon(x-small) mdi-chevron-down
          div.mt-5
            p(style="white-space: pre-wrap;") {{ author.profile }}
        v-col(cols="12" lg="4")
          v-card.pa-6(flat)
            v-dialog(
              v-model="flwdialog"
              max-width="500px")
              template(v-slot:activator="{ on, attrs }")
                v-sheet.d-flex.align-center(v-bind="attrs" v-on="on")
                  v-row.text-center
                    v-col(cols="4")
                      p {{author.recipes.length}}
                      div 貼文
                    v-divider(vertical)
                    v-col(cols="4")
                      p {{author.follower.length}}
                      div 粉絲
                    v-divider(vertical)
                    v-col(cols="4")
                      p {{author.following.length}}
                      div 追蹤
              v-card.rounded-xl.pa-6
                v-sheet.text-center.rounded-xl
                  p.font-h2.orangetext {{author.username}}
                  v-tabs.mb-3(v-model="tab" background-color="transparent" color="#DEA56A" grow)
                    v-tab(href="#follower") {{author.follower.length}} 粉絲
                    v-tab(href="#following") {{author.following.length}} 追蹤名單
                  v-tabs-items(v-model="tab")
                    v-tab-item(:value="'follower'")
                      v-card(flat).pa-2.px-5
                        v-sheet(v-for="(item,index) of author.follower" :key="item._id").mb-2
                          UserCard(:userdata="item" :avatar="avatar" :nowuser="nowuser" :action="'follower'" @sendfollow="userfollow($event, index)")
                    v-tab-item(:value="'following'")
                      v-card(flat).pa-2.px-5
                        v-sheet(v-for="(item,index) of author.following" :key="item._id").mb-2
                          UserCard(:userdata="item" :avatar="avatar" :nowuser="nowuser" :action="'following'" @sendfollow="userfollow($event, index)")
        v-col(cols="12").d-flex.align-center
          p.recipetab.mr-6(@click="refresh('recipe')" :class="rpclass('recipe')") 食譜
          p.recipetab.mr-6(@click="refresh('favorite')" :class="rpclass('favorite')") 收藏
          v-divider
        v-col(cols="12" v-if="recipetab === 'recipe'")
          v-row
            v-col(cols="12" md="3" v-for="(recipe,index) in author.recipes" :key="recipe._id")
              router-link(:to="'/recipe/'+recipe._id")
                UserRecipe(:recipe="recipe" :nowuser="nowuser" v-show="recipe.isEnabled !== 0" @sendlike="like (index)" @sendfav="favorite (index)")
        v-col(cols="12" v-else)
          v-row
            v-col(cols="12" md="3" v-for="(recipe,index) in author.favorites" :key="recipe._id")
              router-link(:to="'/recipe/'+recipe._id")
                UserRecipe(:recipe="recipe" :nowuser="nowuser" v-show="recipe.isEnabled !== 0" @sendlike="like (index)" @sendfav="favorite (index)")
</template>

<script>
import UserRecipe from '@/components/UserRecipe.vue'
import UserCard from '@/components/UserCard.vue'

export default {
  name: 'Userpage',
  data () {
    return {
      author: {
        account: '',
        username: '',
        profile: '',
        total: 0,
        avatar: [],
        follower: [],
        following: [],
        recipes: [],
        _id: ''
      },
      nowuser: {
        showfollow: true,
        following: [],
        likes: []
      },
      avatar: {
        size: 80,
        colors: ['#F0F2DC', '#F9D365', '#D9EB52', '#87796F', '#9FA789'],
        variant: 'beam'
      },
      form: {
        newname: '',
        newprofile: '',
        image: '',
        _id: ''
      },
      showpond: false,
      flwdialog: false,
      dialog: false,
      tab: null,
      recipetab: 'recipe'
    }
  },
  components: {
    UserRecipe,
    UserCard
  },
  methods: {
    async follow () {
      await this.axios.patch('/users/follow/' + this.$store.state.user._id, { _id: this.$route.params.id }, {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.$swal({
        icon: 'success',
        title: '成功',
        text: this.nowuser.showfollow ? '成功追蹤' : '取消追蹤'
      })
      this.nowuser.showfollow = !this.nowuser.showfollow
    },
    cancelInfo () {
      this.author.username ? this.form.newname = this.author.username : this.form.newname = this.author.account
      this.author.profile ? this.form.newprofile = this.author.profile : this.form.newprofile = ''
      this.dialog = false
    },
    async submitInfo () {
      try {
        const fd = new FormData()
        for (const key in this.form) {
          if (Array.isArray(this.form[key]) && key === 'image') {
            for (const i in this.form[key]) {
              fd.append(key, this.form[key][i])
            }
          } else {
            fd.append(key, this.form[key])
          }
        }

        await this.axios.patch('/users/info/' + this.form._id, fd, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.dialog = false
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '個人資料修改成功'
        })
        const { data } = await this.axios.get('/users/' + this.$route.params.id)
        this.author.profile = data.result.profile
        this.author.avatar = data.result.avatar.map(i => `${process.env.VUE_APP_API}/files/${i}`)[0]
        this.author.username = data.result.username
        this.form.newname = this.author.username
        this.author.profile ? this.form.newprofile = this.author.profile : this.form.newprofile = ''
        this.$store.commit('changeinfo', data.result)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error
        })
      }
    },
    handleFilePondUpdateFile (files) {
      this.form.image = files.map(files => files.file)
    },
    async userfollow (action, index) {
      if (this.nowuser.isauthor) {
        if (action === 'follower') {
          this.author.follower.splice(index, 1)
        } else {
          this.author.following.splice(index, 1)
        }
      } else {
        if (action === 'follower') {
          this.author.follower[index].isfollow = !this.author.follower[index].isfollow
        } else {
          this.author.following[index].isfollow = !this.author.following[index].isfollow
        }
      }
    },
    async like (index) {
      if (this.recipetab === 'recipe') {
        if (this.author.recipes[index].like) {
          const idx = this.author.recipes[index].likes.map(l => l.users).indexOf(this.$store.state.user._id)
          this.author.recipes[index].likes.splice(idx, 1)
          const nowidx = this.nowuser.likes.map(l => l.recipes).indexOf(this.author.recipes[index]._id)
          this.nowuser.likes.splice(nowidx, 1)
        } else {
          this.author.recipes[index].likes.push({ user: this.$store.state.user._id })
          this.nowuser.likes.push({ recipes: this.author.recipes[index]._id })
        }
        this.author.recipes[index].like = !this.author.recipes[index].like
      } else {
        if (this.author.favorites[index].like) {
          const idx = this.author.favorites[index].likes.map(l => l.users).indexOf(this.$store.state.user._id)
          this.author.favorites[index].likes.splice(idx, 1)
          const nowidx = this.nowuser.likes.map(l => l.recipes).indexOf(this.author.favorites[index]._id)
          this.nowuser.likes.splice(nowidx, 1)
        } else {
          this.author.favorites[index].likes.push({ user: this.$store.state.user._id })
          this.nowuser.likes.push({ recipes: this.author.favorites[index]._id })
        }
        this.author.favorites[index].like = !this.author.favorites[index].like
      }
    },
    async favorite (index) {
      if (this.recipetab === 'recipe') {
        if (this.author.recipes[index].favorite) {
          const nowidx = this.nowuser.favorites.map(l => l.recipes).indexOf(this.author.recipes[index]._id)
          this.nowuser.favorites.splice(nowidx, 1)
        } else {
          this.nowuser.favorites.push({ recipes: this.author.recipes[index]._id })
          // if (this.nowuser.isauthor) {
          //   this.author.favorites.splice(index, 1)
          //   const authoridx = this.author.recipes.map(r => r._id).indexof(this.author.favorites[index]._id)
          //   this.author.recipes[authoridx].favorite = !this.author.recipes[authoridx].favorite
          // }
        }
        this.author.recipes[index].favorite = !this.author.recipes[index].favorite
      } else {
        if (this.author.favorites[index].favorite) {
          const nowidx = this.nowuser.favorites.map(l => l.recipes).indexOf(this.author.favorites[index]._id)
          this.nowuser.favorites.splice(nowidx, 1)
          // if (this.nowuser.isauthor) {
          //   this.author.favorites.splice(index, 1)
          //   const authoridx = this.author.recipes.map(r => r._id).indexof(this.author.favorites[index]._id)
          //   this.author.recipes[authoridx].favorite = !this.author.recipes[authoridx].favorite
          // }
        } else {
          this.nowuser.favorites.push({ recipes: this.author.favorites[index]._id })
        }
        this.author.favorites[index].favorite = !this.author.favorites[index].favorite
      }
    },
    async refresh (value) {
      const { data } = await this.axios.get('/users/' + this.$route.params.id)
      this.author.favorites = data.result.favorites.map(r => {
        r.recipes.publish_date = r.recipes.publish_date.slice(0, 10)
        r.recipes.like = false
        r.recipes.favorite = false
        if (r.recipes.image) {
          r.recipes.image = r.recipes.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
        }
        return r.recipes
      })
      this.author.recipes = data.result.recipes.map(r => {
        r.recipe.publish_date = r.recipe.publish_date.slice(0, 10)
        r.recipe.like = false
        r.recipe.favorite = false
        if (r.recipe.image) {
          r.recipe.image = r.recipe.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
        }
        return r.recipe
      })
      if (this.user.islogin) {
        const user = await this.axios.get('/users/' + this.$store.state.user._id)
        this.nowuser.likes = user.data.result.likes
        this.nowuser.favorites = user.data.result.favorites
        if (this.nowuser.likes !== undefined) {
          this.author.recipes.map(recipe => {
            recipe.like = this.nowuser.likes.some(l => l.recipes === recipe._id)
            return recipe
          })
          this.author.favorites.map(recipe => {
            recipe.like = this.nowuser.likes.some(l => l.recipes === recipe._id)
            return recipe
          })
        } else {
          this.author.recipes.map(r => {
            r.like = false
            return r
          })
          this.author.favorites.map(r => {
            r.like = false
            return r
          })
        }

        if (this.nowuser.favorites !== undefined) {
          this.author.recipes.map(recipe => {
            recipe.favorite = this.nowuser.favorites.some(f => f.recipes._id === recipe._id)
            return recipe
          })
        } else {
          this.author.recipes.map(r => {
            r.favorite = false
            return r
          })
        }
        if (this.nowuser.favorites !== undefined) {
          this.author.favorites.map(recipe => {
            recipe.favorite = this.nowuser.favorites.some(f => f.recipes._id === recipe._id)
            return recipe
          })
        } else {
          this.author.favorites.map(r => {
            r.favorite = false
            return r
          })
        }
      }
      this.recipetab = value
    },
    rpclass (value) {
      return this.recipetab === value ? 'orangetext' : ''
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/users/' + this.$route.params.id)
      this.author = {
        account: data.result.account,
        profile: data.result.profile,
        avatar: data.result.avatar.map(i => `${process.env.VUE_APP_API}/files/${i}`)[0],
        username: data.result.username,
        follower: data.result.follower.map(f => {
          f.users.isfollow = false
          return f.users
        }),
        following: data.result.following.map(f => {
          f.users.isfollow = false
          return f.users
        }),
        _id: data.result._id,
        favorites: data.result.favorites.map(r => {
          r.recipes.publish_date = r.recipes.publish_date.slice(0, 10)
          r.recipes.like = false
          r.recipes.favorite = false
          if (r.recipes.image) {
            r.recipes.image = r.recipes.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
          }
          return r.recipes
        }),
        total: data.result.recipes.filter(r => r.recipe.isEnabled === 1).length,
        recipes: data.result.recipes.map(r => {
          r.recipe.publish_date = r.recipe.publish_date.slice(0, 10)
          r.recipe.like = false
          r.recipe.favorite = false
          if (r.recipe.image) {
            r.recipe.image = r.recipe.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
          }
          return r.recipe
        })
      }
      this.form.newname = this.author.username
      this.author.profile ? this.form.newprofile = this.author.profile : this.form.newprofile = ''
      if (this.user.islogin) {
        const user = await this.axios.get('/users/' + this.$store.state.user._id)
        this.nowuser = {
          isauthor: false,
          showfollow: null,
          likes: user.data.result.likes,
          following: user.data.result.following,
          favorites: user.data.result.favorites
        }
        if (this.nowuser.likes !== undefined) {
          this.author.recipes.map(recipe => {
            recipe.like = this.nowuser.likes.some(l => l.recipes === recipe._id)
            return recipe
          })
          this.author.favorites.map(recipe => {
            recipe.like = this.nowuser.likes.some(l => l.recipes === recipe._id)
            return recipe
          })
        } else {
          this.author.recipes.map(r => {
            r.like = false
            return r
          })
          this.author.favorites.map(r => {
            r.like = false
            return r
          })
        }

        if (this.nowuser.favorites !== undefined) {
          this.author.recipes.map(recipe => {
            recipe.favorite = this.nowuser.favorites.some(f => f.recipes._id === recipe._id)
            return recipe
          })
        } else {
          this.author.recipes.map(r => {
            r.favorite = false
            return r
          })
        }
        if (this.nowuser.favorites !== undefined) {
          this.author.favorites.map(recipe => {
            recipe.favorite = this.nowuser.favorites.some(f => f.recipes._id === recipe._id)
            return recipe
          })
        } else {
          this.author.favorites.map(r => {
            r.favorite = false
            return r
          })
        }
        this.author._id === this.$store.state.user._id ? this.nowuser.isauthor = true : this.nowuser.isauthor = false
        this.author._id === this.$store.state.user._id ? this.form._id = this.author._id : this.form._id = ''
        if (this.nowuser.following !== undefined) {
          if (this.nowuser.following.some(f => f.users._id === this.author._id)) {
            this.nowuser.showfollow = false
          } else {
            this.nowuser.showfollow = true
          }
        } else {
          this.nowuser.showfollow = true
        }
        if (this.nowuser.following !== undefined) {
          this.author.following.map(f => {
            f.isfollow = this.nowuser.following.some(l => l.users._id === f._id)
            return f
          })
          if (this.user._id === this.author._id) {
            this.author.follower.map(f => {
              f.isfollow = true
              return f
            })
          } else {
            this.author.follower.map(f => {
              f.isfollow = this.nowuser.following.some(l => l.users._id === f._id)
              return f
            })
          }
        }
      }
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
