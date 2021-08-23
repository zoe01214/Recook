<template lang="pug">
v-container#accountmanage.pa-4
  v-data-table(:headers="headers" :items="accounts" :search="search")
    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title 帳號管理
          v-dialog(v-model="dialog" max-width="500px")
            template(v-slot:activator="{ on, attrs }")
              v-btn.ml-12(small color="primary" dark class="mb-2" v-bind="attrs" v-on="on") 新增帳號
            v-card
              v-card-title
                span(class="text-h5") {{formtitle}}
              v-card-text
                v-container
                  v-row
                    v-col(cols="12")
                      v-text-field(v-model="editedItem.account" label="帳號")
                      v-text-field(v-model="editedItem.password" v-if="editedIndex===-1" label="密碼")
                      v-text-field(v-model="editedItem.email" label="信箱")
                      v-text-field(v-model="editedItem.username" label="用戶名稱" v-if="editedIndex!==-1")
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="close") 取消
                v-btn(color="blue darken-1" text @click="save") 保存
          v-dialog(v-model="statedialog" max-width="500px")
            v-card
              v-card-title.text-h6 確定更改帳號啟用狀態嗎？
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="cancelState") 取消
                v-btn(color="blue darken-1" text @click="submitState") 確定
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    template(v-slot:item.isEnabled="{ item }")
      v-switch(v-model="item.isEnabled" readonly @click="changeState(item)")
    template(v-slot:item.actions="{ item }")
      v-icon(small class="mr-2" @click="editItem(item)") mdi-pencil
</template>

<script>
export default ({
  name: 'AccountManage',
  data () {
    return {
      accounts: [],
      search: '',
      headers: [
        {
          text: '帳號',
          align: 'start',
          sortable: false,
          value: 'account'
        },
        { text: '使用者名稱', value: 'username' },
        { text: '信箱', value: 'email' },
        { text: '帳號啟用', value: 'isEnabled' },
        { text: '編輯', value: 'actions', sortable: false }
      ],
      statedialog: false,
      deldialog: false,
      dialog: false,
      editedIndex: -1,
      editedItem: {
        account: '',
        email: '',
        password: '',
        isEnabled: true
      }
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? '新增帳號' : '編輯帳號'
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.accounts.indexOf(item)
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
        if (this.editedIndex > -1) {
          Object.assign(this.accounts[this.editedIndex], this.editedItem)
          const data = {
            _id: this.accounts[this.editedIndex]._id,
            account: this.accounts[this.editedIndex].account,
            email: this.accounts[this.editedIndex].email,
            username: this.accounts[this.editedIndex].username
          }
          await this.axios.patch('/users/' + this.accounts[this.editedIndex]._id, data, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        } else {
          const user = {
            account: this.editedItem.account,
            password: this.editedItem.password,
            email: this.editedItem.email
          }
          await this.axios.post('/users/', user)
          const { data } = await this.axios.get('/users/', {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
          this.accounts = data.result.map(r => {
            if (r.username === undefined || r.username === null) {
              r.username = '未設定'
            }
            r.editedIndex = false
            return r
          })
        }
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
      this.editedIndex = this.accounts.indexOf(item)
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
        this.accounts[this.editedIndex].isEnabled = !this.accounts[this.editedIndex].isEnabled
        const data = {
          _id: this.accounts[this.editedIndex]._id,
          account: this.accounts[this.editedIndex].account,
          email: this.accounts[this.editedIndex].email,
          username: this.accounts[this.editedIndex].username,
          isEnabled: this.accounts[this.editedIndex].isEnabled
        }
        await this.axios.patch('/users/' + this.accounts[this.editedIndex]._id, data, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.statedialog = false
        this.editedIndex = -1
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  },
  async mounted () {
    const { data } = await this.axios.get('/users/all', {
      headers: {
        authorization: 'Bearer ' + this.$store.state.jwt.token
      }
    })
    this.accounts = data.result.map(r => {
      if (r.username === undefined || r.username === null) {
        r.username = '未設定'
      }
      r.editedIndex = false
      return r
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
})
</script>
