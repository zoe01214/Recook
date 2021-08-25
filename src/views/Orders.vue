<template lang="pug">
v-container#orders(fluid).pa-0.px-lg-12.mb-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 我的訂單
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-row.py-5
      v-col(cols="12" v-for="(item,index) in orders" :key="item._id")
        div.pa-10
          p.font-h4 訂單編號: {{item._id}}
          v-divider
          table.ordertable
            tr
              th.pl-5 日期
              th 訂單明細
              th 總金額
              th 狀態
            tr
              td.pl-5 {{item.date}}
              td {{item.detail}}
              td NT.{{item.total}}
              td {{item.state}}
</template>

<script>
export default ({
  name: 'Orders',
  data () {
    return {
      orders: []
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/orders', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.orders = data.result.map(order => {
        order.date = new Date(order.date).toLocaleString()
        order.total = order.products.map(i => i.amount * i.product.price).reduce((acc, cur) => acc + cur)
        order.detail = order.products.map(i => `${i.product.name} ${i.amount} 個`).join(', ')
        order.state = order.state === 1 ? '訂單成立' : order.state === 0 ? '訂單取消' : '訂單已完成'
        return order
      })
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得訂單失敗'
      })
    }
  }
})
</script>
