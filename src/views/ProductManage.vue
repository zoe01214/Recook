<template lang="pug">
v-container#productmanage.pa-4
  v-data-table(:headers="headers" :items="products" :search="search")
    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title 商品管理
          v-dialog(v-model="dialog" max-width="800px")
            template(v-slot:activator="{ on, attrs }")
              v-btn.ml-12(small color="primary" dark class="mb-2" v-bind="attrs" v-on="on") 新增商品
            v-card
              v-card-title
                span(class="text-h5") {{formtitle}}
              v-card-text
                v-container
                  v-row
                    v-col(cols="12")
                      v-text-field(v-model="editedItem.name" label="商品名稱")
                      v-text-field(v-model="editedItem.discounttext" label="商品促銷活動")
                      file-pond(
                        name="pond"
                        ref="pond"
                        accepted-file-types="image/jpeg, image/png"
                        label-idle="點擊或拖曳選擇圖片"
                        v-bind:files="editedItem.image"
                        @updatefiles="handleFilePondUpdateFile")
                      InputNumber(v-model="editedItem.quantity" label="商品數量")
                      v-text-field(prefix="$" v-model="editedItem.price" label="商品價格")
                      v-textarea(v-model="editedItem.shortcut" label="商品簡述")
                      vue-editor(v-model="editedItem.description" label="詳細說明")
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="close") 取消
                v-btn(color="blue darken-1" text @click="save") 保存
          v-dialog(v-model="statedialog" max-width="500px")
            v-card
              v-card-title.text-h6 確定更改商品上架狀態嗎？
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="cancelState") 取消
                v-btn(color="blue darken-1" text @click="submitState") 確定
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    template(v-slot:item.image="{ item }")
      v-img(width="125" contain :src="item.image[0]" max-width)
    template(v-slot:item.sell="{ item }")
      v-switch(v-model="item.sell" readonly @click="changeState(item)")
    template(v-slot:item.actions="{ item }")
      v-icon(small class="mr-2" @click="editItem(item)") mdi-pencil
</template>

<script>
import InputNumber from '@/components/InputNumber.vue'
export default {
  name: 'ProductManage',
  data () {
    return {
      products: [],
      search: '',
      headers: [
        {
          text: '商品名稱',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: '商品圖片', value: 'image' },
        { text: '商品數量', value: 'quantity' },
        { text: '商品價格', value: 'price' },
        { text: '發布狀態', value: 'sell' },
        { text: '編輯', value: 'actions', sortable: false }
      ],
      statedialog: false,
      deldialog: false,
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        price: 0,
        quantity: 0,
        image: [],
        shortcut: '',
        description: '',
        discounttext: '',
        sell: false
      }
    }
  },
  components: {
    InputNumber
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? '新增商品' : '編輯商品'
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.products.indexOf(item)
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
        const fd = new FormData()
        for (const key in this.editedItem) {
          if (Array.isArray(this.editedItem[key]) && key === 'image') {
            for (const i in this.editedItem[key]) {
              fd.append(key, this.editedItem[key][i])
            }
          } else {
            fd.append(key, this.editedItem[key])
          }
        }
        if (this.editedIndex > -1) {
          // 編輯
          await this.axios.patch('/products/' + this.products[this.editedIndex]._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        } else {
          // 新增
          await this.axios.post('/products/', fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        }
        const { data } = await this.axios.get('/products/')
        this.products = data.result.map(p => {
          p.image = p.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
          return p
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
    changeState (item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.statedialog = true
    },
    cancelState () {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.statedialog = false
    },
    async submitState () {
      try {
        this.editedItem.sell === 1 ? this.editedItem.sell = 0 : this.editedItem.sell = 1
        const fd = new FormData()
        for (const key in this.editedItem) {
          fd.append(key, this.editedItem[key])
        }
        await this.axios.patch('/products/' + this.products[this.editedIndex]._id, fd, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.statedialog = false
        this.editedIndex = -1
        const { data } = await this.axios.get('/products/')
        this.products = data.result.map(p => {
          p.image = p.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
          return p
        })
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    handleFilePondUpdateFile (files) {
      this.editedItem.image = files.map(files => files.file)
    }
  },
  async mounted () {
    const { data } = await this.axios.get('/products/')
    this.products = data.result.map(p => {
      p.image = p.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
      return p
    })
  }
}
</script>
