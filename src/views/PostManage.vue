<template lang="pug">
v-container#postmanage.pa-4
  v-data-table(:headers="headers" :items="posts" :search="search")
    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title 文章管理
          v-dialog(v-model="dialog" max-width="800px")
            template(v-slot:activator="{ on, attrs }")
              v-btn.ml-12(small color="primary" dark class="mb-2" v-bind="attrs" v-on="on") 新增文章
            v-card
              v-card-title
                span(class="text-h5") {{formtitle}}
              v-card-text
                v-container
                  v-row
                    v-col(cols="12")
                      v-text-field(v-model="editedItem.title" label="標題")
                      v-select(v-model="editedItem.type" :items="types" label="文章類型")
                      vue-editor(v-model="editedItem.content")
                      file-pond(
                        name="pond"
                        ref="pond"
                        accepted-file-types="image/jpeg, image/png"
                        label-idle="點擊或拖曳選擇圖片"
                        v-bind:files="editedItem.image"
                        @updatefiles="handleFilePondUpdateFile")
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="close") 取消
                v-btn(color="blue darken-1" text @click="save") 保存
          v-dialog(v-model="statedialog" max-width="500px")
            v-card
              v-card-title.text-h6 確定更改文章啟用狀態嗎？
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="cancelState") 取消
                v-btn(color="blue darken-1" text @click="submitState") 確定
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    template(v-slot:item.title="{ item }")
      div(style="width:100px;overflow:hidden; white-space: nowrap; text-overflow: ellipsis;") {{item.title}}
    template(v-slot:item.content="{ item }")
      div(v-html="item.content" style="display: -webkit-box;-webkit-line-clamp: 4; -webkit-box-orient: vertical;white-space: normal;overflow: hidden;")
    template(v-slot:item.image="{ item }")
      v-img(width="125" contain :src="item.image[0]")
    template(v-slot:item.isEnabled="{ item }")
      v-switch(v-model="item.isEnabled" readonly @click="changeState(item)")
    template(v-slot:item.actions="{ item }")
      v-icon(small class="mr-2" @click="editItem(item)") mdi-pencil
</template>

<script>
export default ({
  name: 'PostManage',
  data () {
    return {
      posts: [],
      search: '',
      headers: [
        {
          text: '標題',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: '圖片', value: 'image' },
        { text: '內容', value: 'content' },
        { text: '發布時間', value: 'date' },
        { text: '發布狀態', value: 'isEnabled' },
        { text: '編輯', value: 'actions', sortable: false }
      ],
      statedialog: false,
      deldialog: false,
      dialog: false,
      editedIndex: -1,
      editedItem: {
        title: '',
        image: [],
        type: '',
        content: '',
        isEnabled: 1
      },
      types: ['美食生活', '料理生活', '健康生活', '其他生活']
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? '新增文章' : '編輯文章'
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.posts.indexOf(item)
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
          await this.axios.patch('/posts/' + this.posts[this.editedIndex]._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        } else {
          // 新增
          await this.axios.post('/posts/', fd, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        }
        const { data } = await this.axios.get('/posts/')
        this.posts = data.result.map(p => {
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
      this.editedIndex = this.posts.indexOf(item)
      this.editedItem = {
        title: this.posts[this.editedIndex].title,
        content: this.posts[this.editedIndex].content,
        type: this.posts[this.editedIndex].type,
        isEnabled: this.posts[this.editedIndex].isEnabled
      }
      this.statedialog = true
    },
    cancelState () {
      this.editedItem = {
        title: '',
        image: [],
        type: '',
        content: '',
        isEnabled: 1
      }
      this.editedIndex = -1
      this.statedialog = false
    },
    async submitState () {
      try {
        this.editedItem.isEnabled === 1 ? this.editedItem.isEnabled = 0 : this.editedItem.isEnabled = 1
        const fd = new FormData()
        for (const key in this.editedItem) {
          fd.append(key, this.editedItem[key])
        }
        await this.axios.patch('/posts/' + this.posts[this.editedIndex]._id, fd, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.statedialog = false
        this.editedIndex = -1
        const { data } = await this.axios.get('/posts/')
        this.posts = data.result.map(p => {
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
    const { data } = await this.axios.get('/posts/')
    this.posts = data.result.map(p => {
      p.image = p.image.map(i => `${process.env.VUE_APP_API}/files/${i}`)
      return p
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
})
</script>
