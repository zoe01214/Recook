<template lang="pug">
v-container(fluid)#recipes.pa-0.px-lg-12.mb-12
  v-row.mx-3.mx-lg-10
    v-col(cols="12").px-0
      div.d-flex.justify-center
        v-sheet.searchbar-big.rounded-xl.d-flex.align-center
          v-icon.px-3 mdi-magnify
          input(v-model="query" type="text" placeholder="搜尋食譜 / 食材 / 作者")
    v-col(cols="12").px-0.mb-lg-8
      v-row.d-flex.align-center
        v-col(cols="12").relative
          v-row.d-flex.align-center
            v-col(cols="12" lg="6").text-center.order-lg-2
              v-row
                v-col(cols="12")
                  v-btn.selectborder(small elevation="1" height="38px" :class="kindactive('all')" @click="changekind('all')")
                    span.icon-all A
                      span.lowercase ll
                    span.ml-2.font-weight-bold.d-none.d-md-flex 全部食譜
                  v-btn.selectborder(small elevation="1" height="38px" :class="kindactive('text')" @click="changekind('text')").mx-5
                    v-icon mdi-book-open-outline
                    span.ml-2.font-weight-bold.d-none.d-md-flex 文字食譜
                  v-btn.selectborder(small elevation="1" height="38px" :class="kindactive('video')" @click="changekind('video')")
                    v-icon mdi-television-classic
                    span.ml-2.font-weight-bold.d-none.d-md-flex 影片食譜
            v-col(cols="6" lg="3").d-flex.justify-start.align-center.order-lg-1
              v-menu(v-model="sortdia" :close-on-content-click="false" :nudge-bottom="50")
                template(v-slot:activator="{ on, attrs }")
                  div.custom-btn(@click="sortdia = !sortdia")
                    div.selectbox.leftbtn
                      v-icon.black--text.lefticon mdi-chevron-down
                      span.font-h3 熱門食譜
                v-card
                  v-list
                    v-list-item-group(v-model="sort" mandatory)
                      v-list-item(v-for="item of select" :key="item" :value="item") {{selecttext(item)}}
            v-col(cols="6" lg="3").d-flex.justify-end.align-center.order-lg-3
              v-menu(v-model="filter" :close-on-content-click="false" nudge-left="380" :nudge-bottom="50"  max-width="500" )
                template(v-slot:activator="{ on, attrs }")
                  div.custom-btn(@click="filter = !filter")
                    div.selectbox.rightbtn
                      div.righticon
                        v-img(src="../assets/filter_list_black_24dp.svg")
                      span.font-h3 食譜分類
                v-card.rounded-xl.pa-6.pr-7.pt-12
                  v-row
                    v-col(cols="12")
                      v-row
                        v-col(cols="6" sm="4" lg="4" v-for="item of classify" :key="item").pb-0
                          v-sheet.pointer.d-flex.align-center.justify-center
                            input(type="checkbox" :value="item" :id="item" v-model="choose")
                            label.checktext.d-flex.align-center(:for="item")
                              v-icon(:class="checkclass(item)") {{checktext(item)}}
                              span.ml-2 {{item}}
                    v-col(cols="12").pt-10
                      v-divider
                    v-col(cols="12").px-6
                      v-sheet.d-flex.align-center
                        v-sheet
                          v-btn(text :disabled="choose.length === 0" @click="cleanchoose") 清除選取項目
                        v-spacer
                        v-sheet
                          div {{filternum}}
  v-row.mx-1.mx-lg-8
    v-col(cols="12" lg="3" md="4" sm="6" v-for="(recipe,index) in showrecipes" :key="recipe._id")
      RecipeCard(:recipe="recipe" :nowuser="nowuser" @sendlike="likes(index)" @sendfav="favorites(index)")
  loading(:height="45" :width="45" :active.sync="isLoading")
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue'
import vuetify from '../plugins/vuetify'

export default ({
  name: 'Recipes',
  data () {
    return {
      recipes: [],
      showrecipes: [],
      isLoading: false,
      fullPage: true,
      nowuser: {
        likes: [],
        favorites: []
      },
      filter: false,
      sortdia: false,
      kind: 'all',
      query: '',
      choose: [],
      sort: 'likes',
      select: ['likes', 'publish_date'],
      classify: ['烘焙甜點', '家常菜色', '電鍋料理', '蔬食料理', '異國料理', '快速上桌', '飲料冰品', '節慶料理', '寶寶兒童', '寵物料理']
    }
  },
  components: {
    RecipeCard,
    vuetify
  },
  computed: {
    filternum () {
      return this.choose.length > 0 ? `共選 ${this.choose.length} 項分類` : '尚未選擇分類'
    }
  },
  methods: {
    async likes (index) {
      if (this.recipes[index].like) {
        const idx = this.recipes[index].likes.map(l => l.users).indexOf(this.$store.state.user._id)
        this.recipes[index].likes.splice(idx, 1)
        const nowidx = this.nowuser.likes.map(l => l.recipes).indexOf(this.recipes[index]._id)
        this.nowuser.likes.splice(nowidx, 1)
      } else {
        this.recipes[index].likes.push({ user: this.$store.state.user._id })
        this.nowuser.likes.push({ recipes: this.recipes[index]._id })
      }
      this.recipes[index].like = !this.recipes[index].like
    },
    async favorites (index) {
      if (this.recipes[index].favorite) {
        const nowidx = this.nowuser.favorites.map(l => l.recipes).indexOf(this.recipes[index]._id)
        this.nowuser.favorites.splice(nowidx, 1)
      } else {
        this.nowuser.favorites.push({ recipes: this.recipes[index]._id })
      }
      this.recipes[index].favorite = !this.recipes[index].favorite
    },
    async searchquery () {
      try {
        const classify = this.choose.join(',')
        const { data } = await this.axios.get('/recipes/?keywords=' + this.query + '&chooses=' + classify + '&sort=' + this.sort)
        this.recipes = data.result.map(recipe => {
          if (recipe.image) {
            recipe.image = recipe.image.map(r => `${process.env.VUE_APP_API}/files/${r}`)
          }
          recipe.favorite = false
          recipe.like = false
          if (recipe.author.avatar) {
            recipe.author.avatar = recipe.author.avatar.map(i => `${process.env.VUE_APP_API}/files/${i}`)
          }
          return recipe
        })
        this.recipes = this.recipes.filter(r => r.isEnabled !== 0)
        this.showrecipes = this.recipes
      } catch (error) {
      }
    },
    checkclass (item) {
      return this.choose.includes(item) ? 'checkbox-check' : 'checkbox-default'
    },
    checktext (item) {
      return this.choose.includes(item) ? 'mdi-check' : ''
    },
    selecttext (item) {
      return item === 'likes' ? '熱門食譜' : '最新發佈'
    },
    cleanchoose () {
      this.choose = []
    },
    changekind (value) {
      this.kind = `${value}`
    },
    kindactive (value) {
      return this.kind === value ? 'kind-active' : ''
    },
    kindfilter () {
      if (this.kind === 'text') {
        this.showrecipes = this.recipes.filter(f => f.type === this.kind)
      }
      if (this.kind === 'video') {
        this.showrecipes = this.recipes.filter(f => f.type === this.kind)
      }
      if (this.kind === 'all') {
        this.showrecipes = this.recipes
      }
    }
  },
  async mounted () {
    try {
      const vm = this
      vm.isLoading = true
      const { data } = await this.axios.get('/recipes/?sort=likes')
      this.recipes = data.result.map(recipe => {
        if (recipe.image) {
          recipe.image = recipe.image.map(r => `${process.env.VUE_APP_API}/files/${r}`)
        }
        recipe.favorite = false
        recipe.like = false
        if (recipe.author.avatar) {
          recipe.author.avatar = recipe.author.avatar.map(i => `${process.env.VUE_APP_API}/files/${i}`)
        }
        return recipe
      })
      vm.isLoading = false
      this.recipes = this.recipes.filter(r => r.isEnabled !== 0)
      if (this.user.islogin) {
        const user = await this.axios.get('/users/' + this.$store.state.user._id)
        this.nowuser = {
          likes: user.data.result.likes,
          favorites: user.data.result.favorites
        }
        if (this.nowuser.likes !== undefined) {
          this.recipes.map(recipe => {
            recipe.like = this.nowuser.likes.some(l => l.recipes === recipe._id)
            return recipe
          })
        } else {
          this.recipe.like = false
        }
        if (this.nowuser.favorites !== undefined) {
          this.recipes.map(recipe => {
            recipe.favorite = this.nowuser.favorites.some(f => f.recipes._id === recipe._id)
            return recipe
          })
        } else {
          this.recipe.favorite = false
        }
      }
      this.showrecipes = this.recipes
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得食譜錯誤'
      })
    }
  },
  watch: {
    choose: {
      handler (nVal, oVal) {
        this.searchquery()
      },
      deep: true
    },
    sort: {
      handler (nVal, oVal) {
        this.searchquery()
      },
      deep: true
    },
    query: {
      handler (nVal, oVal) {
        this.searchquery()
      }
    },
    kind: {
      handler (nVal, oVal) {
        this.kindfilter()
      },
      deep: true
    }
  }
})
</script>
