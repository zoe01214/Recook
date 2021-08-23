<template lang="pug">
v-container#postmanage.pa-4
  v-data-table(:headers="headers" :items="orders" :search="search")
    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title 訂單管理
          v-dialog(v-model="dialog" max-width="800px")
            v-card
              v-card-title
                span(class="text-h5") 編輯訂單
              v-card-text
                v-container
                  v-row
                    v-col(cols="12")
                      v-text-field(v-model="editedItem.name" label="收件人姓名")
                      v-text-field(v-model="editedItem.phone" label="收件人手機號碼")
                      v-text-field(v-model="editedItem.address" label="收件人地址")
                      v-select(:items="state" item-text="text" item-value="value" v-model="editedItem.state" label="訂單狀態")
                      p 訂單內容
                      v-card(flat v-for="(item, index) of editedItem.products" :key="item._id")
                        div.d-flex
                          p {{item.product.name}}
                          v-spacer
                          v-btn(text color="red" @click="delproduct(index)") 刪除商品
                        InputNumber(v-model="editedItem.products[index].amount")
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="close") 取消
                v-btn(color="blue darken-1" text @click="save") 保存
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    template(v-slot:item.state="{ item }")
      v-chip.white--text(small :color="getColor(item.state)") {{ statetext (item.state) }}
    template(v-slot:item.actions="{ item }")
      v-icon(small class="mr-2" @click="editItem(item)") mdi-pencil
</template>

<script>
import InputNumber from '@/components/InputNumber.vue'

export default ({
  name: 'PostManage',
  data () {
    return {
      orders: [],
      search: '',
      headers: [
        {
          text: '訂單編號',
          align: 'start',
          sortable: false,
          value: '_id'
        },
        { text: '訂購人', value: 'user.account' },
        { text: '收件人', value: 'name' },
        { text: '日期', value: 'date' },
        { text: '商品數量', value: 'productnum' },
        { text: '總金額', value: 'total' },
        { text: '狀態', value: 'state' },
        { text: '編輯', value: 'actions', sortable: false }
      ],
      statedialog: false,
      deldialog: false,
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        products: [],
        state: 1
      },
      state: [
        { text: '訂單成立', value: 1 },
        { text: '訂單取消', value: 0 },
        { text: '訂單已完成', value: 2 }
      ]
    }
  },
  components: {
    InputNumber
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async save () {
      try {
        const newdata = {
          products: this.editedItem.products,
          name: this.editedItem.name,
          phone: this.editedItem.phone,
          address: this.editedItem.address,
          state: this.editedItem.state
        }
        if (this.editedIndex > -1) {
          // 編輯
          await this.axios.patch('/orders/' + this.orders[this.editedIndex]._id, newdata, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        }
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '訂單修改成功'
        })
        const { data } = await this.axios.get('/orders/all')
        this.orders = data.result.map(order => {
          order.date = new Date(order.date).toLocaleString().slice(0, 10)
          order.total = order.products.map(i => i.amount * i.product.price).reduce((acc, cur) => acc + cur)
          order.detail = order.products.map(i => `${i.product.name} ${i.amount} 個`).join(', ')
          return order
        })
        this.close()
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    delproduct (index) {
      this.editedItem.products.splice(index, 1)
    },
    getColor (value) {
      return value === 1 ? 'green' : value === 0 ? 'red' : 'grey'
    },
    statetext (value) {
      return value === 1 ? '成立' : value === 0 ? '取消' : '已完成'
    }
  },
  async mounted () {
    const { data } = await this.axios.get('/orders/all', {
      headers: {
        authorization: 'Bearer ' + this.$store.state.jwt.token
      }
    })
    this.orders = data.result.map(order => {
      order.date = new Date(order.date).toLocaleString().slice(0, 10)
      order.productnum = order.products.map(i => i.amount).reduce((acc, cur) => acc + cur)
      order.total = order.products.map(i => i.amount * i.product.price).reduce((acc, cur) => acc + cur)
      order.detail = order.products.map(i => `${i.product.name} ${i.amount} 個`).join(', ')
      return order
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
})
</script>
