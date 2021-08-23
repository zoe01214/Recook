<template lang="pug">
  v-app#app
    v-sheet.bg-white-2.px-lg-6.px-lg-8.vh-100.pb-lg-9
      v-container(fluid).px-lg-12.bg-white-2.section01.d-flex.align-center
        div 🥳 與我們分享您的食譜
        v-spacer
        div.d-none.d-sm-flex.align-center
          router-link(:to="'/questions'")
            div.black--text 常見問題
          v-divider(vertical).mx-3
          v-menu(v-if="user.islogin" bottom :nudge-width="100" offset-y transition="slide-y-transition")
            template(v-slot:activator="{ on, attrs }")
              v-btn(small color="grey" outlined v-bind="attrs" v-on="on")
                span.subtitle-1.black--text ✌️ 您好，{{user.username}}
            v-list
              v-list-item(v-if="user.islogin && user.isAdmin")
                v-list-item(to="/admin") 管理
              v-list-item
                v-list-item(to="/new") 寫食譜
              v-list-item
                  v-list-item(:to="'/user/'+user._id") 個人食譜
              v-list-item
                  v-list-item(:to="'/orders/'") 我的訂單
              v-list-item
                v-list-item(@click="logout") 登出
          v-btn(v-else small color="grey" outlined to="/login")
              span.subtitle-1.font-weight-bold.black--text ✌️ 登入
      v-card.rounded-xl.vh-100
        v-sheet.px-6.px-lg-10
          v-sheet.white.py-12.d-flex.align-center.navshadow
            v-container(fluid).px-lg-12
              v-row.d-flex.align-center
                v-col(cols="5")
                  nav.d-none.d-md-flex.align-center
                    router-link(to="/recipes")
                      div.navlist 探索食譜
                    router-link.mx-6(:to="'/posts'")
                      div.navlist 料理生活
                    router-link(:to="'/products'")
                      div.navlist 主廚市集
                v-col(cols="2")
                  router-link.d-flex.justify-center(to='/')
                    v-img(contain max-width="120" :src="require('./assets/logo-text.svg')" @click="nowtab = '/'")
                v-col(cols="5")
                  nav.d-none.d-md-flex.align-center.justify-end
                    div
                      v-sheet.searchbar.rounded-xl.d-flex.align-center
                        v-icon.black--text.px-3 mdi-magnify
                        input(type="text" placeholder="搜尋")
                    v-menu(v-if="user.islogin" bottom :nudge-width="120" :nudge-left="50" :nudge-bottom="20" offset-y transition="slide-y-transition")
                      template(v-slot:activator="{ on, attrs }")
                        v-icon(v-bind="attrs" v-on="on").black--text.mx-6 mdi-account-outline
                      v-list
                        v-list-item(v-if="user.islogin && user.isAdmin")
                          v-list-item(to="/admin") 管理
                        v-list-item
                          v-list-item(to="/new") 寫食譜
                        v-list-item
                            v-list-item(:to="'/user/'+user._id") 個人食譜
                        v-list-item
                            v-list-item(:to="'/orders/'") 我的訂單
                        v-list-item
                          v-list-item(@click="logout") 登出
                    router-link(v-else to="/cart")
                      v-icon.black--text.mx-6 mdi-account-outline
                    v-badge(overlap color="#DEA56A" :content="user.cart.length" offset-y="14" offset-x="12" v-if="user.islogin && user.cart.length > 0")
                      router-link(to="/cart")
                        v-icon.black--text mdi-cart
                    router-link(to="/cart" v-else)
                      v-icon.black--text mdi-cart-outline
                v-navigation-drawer(v-model="drawer" absolute temporary)
                  v-list(nav dense)
                    v-list-item-group(v-model="group" active-class="deep-purple--text text--accent-4")
                      v-list-item(to='/')
                        v-list-item-icon
                          v-icon mdi-home
                        v-list-item-content
                          v-list-item-title Home
                      v-list-item(to='/register')
                        v-list-item-icon
                          v-icon mdi-account-outline
                        v-list-item-content
                          v-list-item-title Register
          v-main
            router-view(:key="$route.fullPath")
    v-sheet.topline.px-6.py-2(elevation="2")
      v-row.d-flex.align-center
          v-col(cols="5")
            nav.d-none.d-md-flex.align-center
              router-link.pr-12(to="/recipes")
                div.navlist.text-color 探索食譜
              router-link(:to="'/posts'")
                div.navlist.text-color 料理生活
          v-col(cols="2")
            router-link.d-flex.justify-center(to='/')
              v-img.logosquare(contain max-height="45" :src="require('./assets/logo-icon-no-square.svg')" @click="nowtab = '/'")
          v-col(cols="5")
            nav.d-none.d-md-flex.align-center.justify-end
              router-link.pr-12(:to="'/products'")
                div.navlist.text-color 主廚市集
              div.pr-6
                v-sheet.searchbar.rounded-xl.d-flex.align-center
                  v-icon.px-3 mdi-magnify
                  input(type="text" placeholder="搜尋")
              v-badge(overlap color="green" :content="user.cart.length" offset-y="22" offset-x="14" v-if="user.islogin && user.cart.length > 0")
                router-link(to="/cart")
                  v-icon.navlist.text-color mdi-cart
              router-link(to="/cart" v-else)
                v-icon.navlist.text-color mdi-cart-outline
          v-navigation-drawer(v-model="drawer" absolute temporary)
            v-list(nav dense)
              v-list-item-group(v-model="group" active-class="deep-purple--text text--accent-4")
                v-list-item(to='/')
                  v-list-item-icon
                    v-icon mdi-home
                  v-list-item-content
                    v-list-item-title Home
                v-list-item(to='/register')
                  v-list-item-icon
                    v-icon mdi-account-outline
                  v-list-item-content
                    v-list-item-title Register
    v-sheet.appmenu.d-flex.align-center.justify-center.pa-3.text-center.d-md-none(elevation="2")
      router-link.applist(to="/")
        v-icon.text-color mdi-home-outline
      router-link.applist(to="/recipes")
        v-icon.text-color mdi-magnify
      div.applist.square
        v-icon.text-color(@click="menudwr = !menudwr") {{menuicon}}
      router-link.applist(to="/products")
        v-icon.text-color mdi-shopping-outline
      router-link.applist(:to="'/user/'+user._id")
        v-icon.text-color mdi-account-outline
    v-navigation-drawer.menudwr(width="100%" v-model="menudwr" app bottom temporary)
      v-sheet.pa-6
        div.mb-6
          v-btn.btnborder(v-if="user.islogin" block outlined height="48px" :to="'/user/'+user._id")
            span.subtitle-1.black--text ✌️ 您好，{{user.username}}
            v-spacer
            v-icon.iconcircle mdi-chevron-right
          v-btn.btnborder(v-else block outlined height="48px" to="/login")
            span.subtitle-1.font-weight-bold.black--text ✌️ 登入
            v-spacer
            v-icon.iconcircle mdi-chevron-right
        v-row.mb-6
          v-col(cols="12")
            v-btn.btnborder(block outlined height="100px" to="/recipes")
              span 探索食譜
              v-spacer
              v-icon.iconcircle mdi-chevron-right
          v-col(cols="6")
            v-btn.btnborder(block outlined height="100px" to="/posts")
              span 料理生活
              v-spacer
              v-icon.iconcircle mdi-chevron-right
          v-col(cols="6")
            v-btn.btnborder(block outlined height="100px" to="/products")
              span 主廚市集
              v-spacer
              v-icon.iconcircle mdi-chevron-right
        v-list(nav dense)
          v-list-item-group(active-class="deep-purple--text text--accent-4")
            v-list-item(to="/new")
              span 寫食譜
              v-spacer
              v-icon.iconcircle mdi-chevron-right
            v-divider.my-3
            v-list-item(:to="'/user/'+user._id")
              span 個人頁面
              v-spacer
              v-icon.iconcircle mdi-chevron-right
            v-divider.my-3
            v-list-item(to="/orders")
              span 我的訂單
              v-spacer
              v-icon.iconcircle mdi-chevron-right
            v-divider.my-3
            v-list-item(@click="logout")
              span 登出
              v-spacer
              v-icon.iconcircle mdi-chevron-right
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default ({
  name: 'App',
  data () {
    return {
      users: [],
      menudwr: false,
      drawer: false,
      group: null,
      nowtab: '/',
      tabs: [
        {
          name: '探索食譜',
          to: '/recipes'
        },
        {
          name: '料理生活',
          to: '/posts'
        },
        {
          name: '主廚市集',
          to: '/products'
        }
      ]
    }
  },
  computed: {
    menuicon () {
      return this.menudwr === true ? 'mdi-close' : 'mdi-menu'
    }
  },
  methods: {
    async logout () {
      try {
        await this.axios.delete('/users/logout', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('logout')
        this.$swal({
          icon: 'success',
          title: '登出成功',
          text: '登出成功'
        })
        if (this.$route.path !== '/') this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '發生錯誤'
        })
      }
    },
    changetab (to) {
      this.nowtab = to
      this.$router.push(to)
    },
    animation () {
      gsap.to('.topline', {
        scrollTrigger: {
          trigger: '.navshadow',
          start: 'bottom top',
          end: '+=50 top',
          scrub: true
        },
        y: 0
      })
    }
  },
  async mounted () {
    this.animation()
    const diff = Date.now() - this.$store.state.jwt.received
    try {
      if (diff > 1000 * 60 * 60 * 24 * 6 && this.$store.state.jwt) {
        const { data } = await this.axios.post('/users/extend', {}, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$store.commit('extend', data.result)
      }
      const { data } = await this.axios.get('/users/my', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.$store.commit('getinfo', data.result)
    } catch (error) {
      this.$store.commit('logout')
    }
  }
})
</script>
