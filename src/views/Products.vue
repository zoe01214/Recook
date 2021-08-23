<template lang="pug">
v-container#products(fluid).pa-0.mb-12
  v-container.mb-4
    v-row
      v-col(cols="12")
        v-sheet.px-12.d-flex.align-center
          h2.header-title.mr-6 主廚市集
          v-divider
  v-container
    v-sheet.mx-10.rounded-xl.bg-white-2
      v-row.py-5
        v-col(cols="12" lg="4" md="6" sm="12" v-for="(item,index) in products" :key="item._id" v-if="item.sell").mb-12
          router-link(:to="'/products/' + item._id").d-flex.justify-center
            v-card(flat max-width="550px").text-center.bgtrans
              v-sheet.bgtrans.px-12.d-flex.justify-center
                v-img.circle(contain max-width="230px" :src="item.image[0]")
              v-sheet.px-12.text-left.bgtrans
                v-divider.my-3
                div.mb-2.name.single-line {{item.name}}
                div.mb-5.text-subtitle-1.shcut {{item.shortcut}}
                v-sheet.btnborder.d-flex.align-center.text-center.bgtrans
                  div.pa-2.pricetext NT.{{item.price}}
                  button(@click.prevent="addcart(item._id)").pa-2.bagtext 放進購物車
</template>

<script>
export default ({
  name: 'Products',
  data () {
    return {
      products: []
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
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/products')
      this.products = data.result.map(p => {
        p.image = p.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
        return p
      })
    } catch (error) {
    }
  }
})
</script>
