<template lang="pug">
v-container(fluid)#home.pa-0.px-lg-12.mb-12
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-sm-3.mb-md-12
    div.d-flex.flex-column.align-center.justify-center.mb-3.py-lg-8
      p.black--text.font-title.mb-12 分享食譜建立屬於您的食譜社群
      router-link(to="/about")
        p.underline.font-subtitle.mr-3 前往了解
  v-sheet.mx-3.mx-lg-10.rounded-xl.py-12
    v-row
        v-col(cols="12" sm="6")
          router-link(to="/recipes")
            v-img.rounded-lg(cover src="../assets/photo-1.jpg")
              v-sheet.rounded-xl.imgchip(width="200" height="45px" elevation="3").d-flex.align-center.justify-center
                span.black--text.header-title 快速烹飪
        v-col(cols="12" sm="6")
          router-link(to="/posts")
              v-img.rounded-lg(cover src="../assets/photo-2.jpg")
                v-sheet.rounded-xl.imgchip(width="200" height="45px" elevation="3").d-flex.align-center.justify-center
                  span.black--text.header-title 分享生活
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    div.d-flex.align-center.mb-3
      p.font-title 熱門食譜
      v-spacer
      router-link(to="/recipes")
        span.mr-3.font-link 展示更多
        v-icon.iconcircle mdi-chevron-right
    splide(:slides="recipes" :options="options")
      splide-slide(v-for="(recipe,index) in recipes" :key="recipe._id")
        RecipeCard(:recipe="recipe" :nowuser="nowuser" @sendlike="likes(index)" @sendfav="favorites(index)")
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-12.pt-8.mb-12
    div.d-flex.align-center.mb-3
      p.font-title 人氣主廚
      v-spacer
      router-link(to="/recipes")
        span.mr-3.font-link 展示更多
        v-icon.iconcircle mdi-chevron-right
    splide(:slides="users" :options="options1")
      splide-slide(v-for="(user,index) in users" :key="user._id")
        router-link(:to="'/user/' + user._id")
          v-sheet(height="300px")
            v-sheet.rounded-lg(height="100%" v-if="user.avatar && user.avatar.length !== 0" outlined)
              v-img.rounded(height="100%" :src="user.avatar[0]")
            v-sheet.rounded-lg.bg-white-2(v-else outlined height="100%").d-flex.align-center.justify-center
              avatar(:size="avatar.size" :name="user.account" :square="avatar.square" :variant="avatar.variant" :colors="avatar.colors")
          v-sheet.mt-3
            div.mb-1.single-line.font-h3.black--text {{user.username}}
            div.single-line.text-subtitle-1.grey--text.mt-n2 {{ user.recipenum }} 道食譜 {{user.followernum}} 位粉絲
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12.pt-8
    div.d-flex.align-center.mb-3
      p.font-title 生活資訊
      v-spacer
      router-link(to="/posts")
        span.mr-3.font-link 展示更多
        v-icon.iconcircle mdi-chevron-right
    splide(:slides="posts" :options="options3")
      splide-slide(v-for="(post,index) in posts" :key="post._id")
        v-card(flat).text-center.bgtrans
          router-link(:to="'/post/' + post._id")
          v-sheet(height="300px")
              v-sheet(width="100%")
                img.rounded.rwdimg(:src="post.image[0]")
              v-sheet.rounded-lg.bg-white-2.pa-3.pa-md-6.px-lg-12.text-left.bgtrans.d-flex.flex-column.justify-center
                v-sheet.rounded.mb-4.tag.text-center {{post.type}}
                h3.mb-2.ptitle {{post.title}}
  v-sheet.mx-3.mx-lg-10.rounded-xl.py-12
    v-row
        v-col(cols="12")
          router-link(to="/products")
            v-parallax.rounded-lg(src="../assets/photo-3.jpg" height="350")
              v-sheet.rounded-xl.imgchip(width="200" height="45px" elevation="3").d-flex.align-center.justify-center
                span.black--text.header-title 主廚市集
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12.pb-12
    div.d-flex.align-center.mb-3.pb-3
      p.font-title 最新商品
      v-spacer
      router-link(to="/products")
        span.mr-3.font-link 展示更多
        v-icon.iconcircle mdi-chevron-right
    splide(:slides="products" :options="options2")
      splide-slide(v-for="(product,index) in products" :key="product._id")
        router-link(:to="'/products/' + product._id").d-flex.justify-center
          v-card(flat).text-center.bgtrans
            v-row
              v-col(cols="4" md="5")
                v-sheet(width="100%").bgtrans.d-flex.justify-center
                  img.rounded-lg.rwdimg(:src="product.image[0]")
              v-col(cols="8" md="7")
                v-sheet(height="100%").pr-12.text-left.bgtrans.d-flex.flex-column.justify-center
                  v-divider.my-3
                  div.mb-2.name.single-line {{product.name}}
                  div.mb-5.text-subtitle-1.shcut {{product.shortcut}}
  v-divider.py-6
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    router-link(to="/register").d-flex.align-center.mb-3.py-lg-8
      p.black--text.font-title 參與料理盛事
      v-spacer
      div
        span.mr-3.font-link 前往註冊
        v-icon.iconcircle mdi-chevron-right
  v-divider.py-6
  v-sheet.mx-3.mx-lg-10.rounded-xl.mt-3.mb-12
    router-link(to="/about").d-flex.align-center.mb-3.py-lg-8
      p.black--text.font-title 關於我們
      v-spacer
      div
        span.mr-3.font-link 前往了解
        v-icon.iconcircle mdi-chevron-right
  v-divider.py-6
  loading(:height="45" :width="45" :active.sync="isLoading")
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue'
export default {
  name: 'Home',
  data () {
    return {
      recipes: [],
      bake: [],
      posts: [],
      users: [],
      products: [],
      nowuser: {
        likes: [],
        favorites: []
      },
      options: {
        rewind: true,
        gap: '1rem',
        perPage: 4,
        cover: true,
        breakpoints: {
          860: {
            perPage: 2
          },
          1280: {
            perPage: 3
          }
        }
      },
      options1: {
        rewind: true,
        gap: '1rem',
        perPage: 6,
        cover: true,
        breakpoints: {
          860: {
            perPage: 2
          },
          1280: {
            perPage: 4
          }
        }
      },
      options2: {
        rewind: true,
        gap: '1rem',
        perPage: 2,
        cover: true,
        breakpoints: {
          860: {
            perPage: 1
          },
          1280: {
            perPage: 2
          }
        }
      },
      options3: {
        rewind: true,
        gap: '1rem',
        perPage: 3,
        cover: true,
        breakpoints: {
          860: {
            perPage: 1
          },
          1280: {
            perPage: 3
          }
        }
      },
      avatar: {
        size: 80,
        square: true,
        colors: ['#F0F2DC', '#F9D365', '#D9EB52', '#87796F', '#9FA789'],
        variant: 'beam'
      },
      email: '',
      isLoading: false,
      fullPage: true
    }
  },
  components: {
    RecipeCard
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
    }
  },
  async mounted () {
    try {
      const vm = this
      vm.isLoading = true
      const loading = async () => {
        const { data } = await this.axios.get('/recipes/home')
        const popular = await this.axios.get('/users/home')
        const product = await this.axios.get('/products/home')
        const post = await this.axios.get('/posts/home')
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
        this.users = popular.data.result.map(u => {
          if (u.avatar !== undefined && u.avatar.length !== 0) {
            u.avatar = u.avatar.map(r => `${process.env.VUE_APP_API}/files/${r}`)
          }
          return u
        })
        this.products = product.data.result.map(p => {
          if (p.image) {
            p.image = p.image.map(r => `${process.env.VUE_APP_API}/files/${r}`)
          }
          return p
        })
        this.posts = post.data.result.map(p => {
          p.image = p.image.map(r => `${process.env.VUE_APP_API}/files/${r}`)
          return p
        })
      }
      loading().then(result => {
        console.log(result)
        vm.isLoading = false
      })
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
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得食譜錯誤'
      })
    }
  }
}
</script>
