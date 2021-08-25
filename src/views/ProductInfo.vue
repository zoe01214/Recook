<template lang="pug">
v-container(fluid)#productinfo.pa-0.px-lg-12.mb-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 主廚市集
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-row.pa-6.px-lg-12
      v-col(cols="12" md="5")
        v-sheet.bgtrans.px-lg-12.d-flex.justify-center
          v-img.circle(contain max-width="250px" :src="product.image")
      v-col(cols="12" md="7")
        v-card(flat).bgtrans
          h2.name.mb-5 {{product.name}}
          p.distext {{product.discounttext}}
          v-divider.my-6
          p.mb-3
            strong 商品詳情
          p(v-html="product.description")
          v-row.d-flex.align-center.mt-12
            v-col(cols="12" lg="6")
              InputNumber.numtext(v-model.number="amount" :rules="state.amount")
            v-col(cols="12" lg="6")
              v-sheet.btnborder.d-flex.align-center.text-center.bgtrans
                div(:style="greyoutline(product.quantity)").pa-2.pricetext NT.{{product.price}}
                button(@click="addcart" :style="outofstock(product.quantity)").pa-2.bagtext {{outofstocktext(product.quantity)}}
</template>

<script>
import InputNumber from '@/components/InputNumber.vue'

export default {
  name: 'ProductInfo',
  data () {
    return {
      product: [],
      amount: 1
    }
  },
  components: {
    InputNumber
  },
  computed: {
    state () {
      const amount = this.amount
      return {
        amount: [!!amount || '商品數量不得為空值', amount < this.product.quantity || `目前商品庫存只有 ${this.product.quantity} 個`]
      }
    }
  },
  methods: {
    async addcart () {
      if (this.user.islogin) {
        if (!this.state) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '請輸入正確數量'
          })
          return
        }
        if (this.$store.state.jwt.token.length === 0) {
          this.$router.push('/login')
        }
        try {
          if (this.product.sell) {
            await this.axios.post('/users/cart', { product: this.$route.params.id, amount: this.amount }, {
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
          } else {
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: '這項商品已下架'
            })
          }
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
      if (!this.product.sell) {
        return 'border-color: #c9c5c1;'
      } else if (qt === 0) {
        return 'border-color: #c9c5c1;'
      } else {
        return ''
      }
    },
    outofstock (qt) {
      if (!this.product.sell) {
        return 'border-color: #c9c5c1;background-color: #c9c5c1;'
      } else if (qt === 0) {
        return 'border-color: #c9c5c1;background-color: #c9c5c1;'
      } else {
        return ''
      }
    },
    outofstocktext (qt) {
      if (!this.product.sell) {
        return '商品已下架'
      } else if (qt === 0) {
        return '商品已售完'
      } else {
        return '放進購物車'
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/products/' + this.$route.params.id)
      this.product = data.result
      this.product.image = this.product.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)[0]
      document.title = this.product.name + '- Recook'
    } catch (error) {
      this.$router.push('/')
    }
  }
}
</script>
