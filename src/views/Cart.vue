<template lang="pug">
v-container#cart(fluid).pa-0.px-lg-12.mb-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title 購物車
    span.text-h6.ml-3.mr-6 {{cart.length}} 項商品
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-card.trans.pa-6(flat v-for="(item,index) of cart" :key="item._id")
      v-row.d-flex-.align-center
        v-col(cols="12" md="4")
          router-link(:to="'/products/' + item._id")
            v-img.circle.mx-auto(contain max-width="150px" min-width="100px" :src="item.image")
        v-col(cols="12" md="4")
          p.font-h2.single-line {{item.name}}
          div.font-h3.mainorange.single-line 單價 NT.{{item.price}}
        v-col(cols="12" md="2")
          InputNumber.numtext(v-model="item.amountModel" @input="amountchange(index)")
        v-col(cols="12" md="2")
          v-btn(icon absolute top right @click="delProduct(index)")
            v-icon mdi-close
          div.d-flex.align-center
            v-card-title.single-line NT.{{item.price * item.amountModel}}
      v-divider.mt-6
    v-card(flat).pa-6.trans.d-flex.flex-column
      v-row
        v-col(cols="8")
        v-col(cols="12" md="4")
          div.ml-auto.text-right
            p.font-h3 訂單總計 NT.{{totalprice}}
            p 共 {{totalamount}} 件商品
            v-btn.orangebtn.ml-auto.px-12(block text @click="checkout" :disabled="cart.length === 0")
              span.font-h3.white--text 結帳
</template>

<script>
import InputNumber from '@/components/InputNumber.vue'

export default {
  name: 'Cart',
  data () {
    return {
      cart: []
    }
  },
  components: {
    InputNumber
  },
  computed: {
    totalprice () {
      return this.cart.length === 0 ? 0 : this.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount * currentValue.price), 0)
    },
    totalamount () {
      return this.cart.length === 0 ? 0 : this.cart.reduce((accumulator, currentValue) => accumulator + (currentValue.amount), 0)
    }
  },
  methods: {
    async delProduct (index) {
      try {
        await this.axios.patch('/users/cart', { product: this.cart[index]._id, amount: 0 }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.cart.splice(index, 1)
        const { data } = await this.axios.get('/users/cart', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.cart = data.result.map(item => {
          item = { ...item.product, amount: item.amount }
          item.image = item.image.map(i => `${process.env.VUE_APP_API}/files/${item.image}`)[0]
          item.amountModel = item.amount
          return item
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
          text: '刪除商品失敗'
        })
      }
    },
    async amountchange (index) {
      try {
        await this.axios.patch('/users/cart', { product: this.cart[index]._id, amount: this.cart[index].amountModel }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.cart[index].amount = this.cart[index].amountModel
        const { data } = await this.axios.get('/users/cart', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.cart = data.result.map(item => {
          item = { ...item.product, amount: item.amount }
          item.image = item.image.map(i => `${process.env.VUE_APP_API}/files/${item.image}`)[0]
          item.amountModel = item.amount
          return item
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '修改商品數量失敗'
        })
      }
    },
    checkout () {
      if (this.cart.length !== 0) {
        this.$router.push('/checkout')
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/users/cart', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.cart = data.result.map(item => {
        item = { ...item.product, amount: item.amount }
        item.image = item.image.map(i => `${process.env.VUE_APP_API}/files/${item.image}`)[0]
        item.amountModel = item.amount
        return item
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
