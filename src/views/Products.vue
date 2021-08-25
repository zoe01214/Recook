<template lang="pug">
v-container(fluid)#products.pa-0.px-lg-12.mb-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 主廚市集
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-row.py-5
      v-col.mb-12(cols="12" md="6" lg="4" v-for="(item,index) in products" :key="item._id" v-if="item.sell")
        router-link(:to="'/products/' + item._id").d-flex.justify-center
          v-card#productcard.mx-3.mx-lg-12(flat max-width="550px").text-center.bgtrans
            v-sheet.bgtrans.px-12.d-flex.justify-center
              v-img.circle(contain max-width="230px" :src="item.image[0]")
            v-sheet.text-left.bgtrans
              v-divider.my-3
              div.mb-2.name.single-line {{item.name}}
              div.mb-5.text-subtitle-1.shcut {{item.shortcut}}
              v-sheet.btnborder.d-flex.align-center.text-center.bgtrans
                div(:style="greyoutline(item.quantity)").pa-2.pricetext NT.{{item.price}}
                button(@click.prevent="addcart(item._id)" :style="outofstock(item.quantity)").pa-2.bagtext {{outofstocktext(item.quantity)}}
  loading(:height="45" :width="45" :active.sync="isLoading")
</template>

<script>
export default ({
  name: 'Products',
  data () {
    return {
      products: [],
      isLoading: false,
      fullPage: true
    }
  },
  methods: {
    async addcart (id) {
      if (this.user.islogin) {
        if (this.$store.state.jwt.token.length === 0) {
          this.$router.push('/login')
        }

        try {
          await this.axios.post('/users/cart', { product: id, amount: 1 }, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '成功購物車'
          })
          const newdata = await this.axios.get('/users/cart', {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.$store.commit('changecart', newdata.data.result)
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '加入購物車失敗'
          })
        }
      } else {
        this.$router.push('/login')
      }
    },
    greyoutline (qt) {
      return qt === 0 ? 'border-color: #c9c5c1;' : ''
    },
    outofstock (qt) {
      return qt === 0 ? 'border-color: #c9c5c1;background-color:#c9c5c1;' : ''
    },
    outofstocktext (qt) {
      return qt === 0 ? '商品已售完' : '放進購物車'
    }
  },
  async mounted () {
    try {
      const vm = this
      vm.isLoading = true
      const { data } = await this.axios.get('/products')
      this.products = data.result.map(p => {
        p.image = p.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
        return p
      })
      vm.isLoading = false
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
})
</script>
