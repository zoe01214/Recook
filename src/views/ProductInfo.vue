<template lang="pug">
v-container#productinfo(fluid).pa-0.mb-12
  v-container.mb-4
    v-row
      v-col(cols="12")
        v-sheet.px-12.d-flex.align-center
          h2.header-title.mr-6 主廚市集
          v-divider
  v-container(v-if="product.sell")
    v-sheet.mx-10.rounded-xl.bg-white-2
      v-row.pa-6.px-12
        v-col(cols="12" md="5")
          v-sheet.bgtrans.px-12.d-flex.justify-center
            v-img.circle(contain max-width="250px" :src="product.image")
        v-col(cols="12" md="7")
          v-card(flat).bgtrans
            h2.name.mb-5 {{product.name}}
            p.distext {{product.discounttext}}
            v-divider.my-6
            p.mb-3
              strong 商品詳情
            p(v-html="product.description")
            v-row.d-flex.align-center
              v-col(cols="12" lg="6")
                InputNumber.numtext(v-model.number="amount" :rules="state.amount")
              v-col(cols="12" lg="6")
                v-sheet.btnborder.d-flex.align-center.text-center.bgtrans
                  div.pa-2.pricetext NT.{{product.price}}
                  button(@click="addcart").pa-2.bagtext 放進購物車
  v-container(v-else)
    v-sheet.mx-10.rounded-xl.bg-white-2
       h2 這項商品已經下架囉！
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
