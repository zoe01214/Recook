<template lang="pug">
v-container#reportmanage.pa-4
  v-data-table(:headers="headers" :items="reports" :search="search")
    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title 檢舉管理
          v-dialog(v-model="statedialog" max-width="500px")
            v-card
              v-card-title.text-h6 {{actiontext}}
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="cancelState") 取消
                v-btn(color="blue darken-1" text @click="submitState") 確定
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    template(v-slot:item.status="{ item }")
      v-chip.white--text(small :color="getColor(item.status)") {{statustext (item.status)}}
    template(v-slot:item.isEnabled="{ item }")
      v-switch(v-model="item.isEnabled" readonly disabled)
    template(v-slot:item.actions="{ item }")
       v-icon.mr-2(color="green" @click="changeState(item, 'pass')") mdi-check
       v-icon(color="red" @click="changeState(item, 'fail')") mdi-close
</template>

<script>
export default ({
  name: 'ReportManage',
  data () {
    return {
      reports: [],
      search: '',
      headers: [
        { text: '檢舉人', value: 'reportuser.account' },
        { text: '處理進度', value: 'status' },
        { text: '留言人', value: 'commentuser.account' },
        { text: '檢舉內容', value: 'content' },
        { text: '檢舉原因', value: 'reason' },
        { text: '留言狀態', value: 'isEnabled' },
        { text: '審核', value: 'actions' }
      ],
      action: '',
      editedIndex: -1,
      statedialog: false
    }
  },
  computed: {
    actiontext () {
      return this.action === 'pass' ? '確認通過這則檢舉，下架該筆留言嗎？' : '確認不通過檢舉，保留該筆留言嗎？'
    }
  },
  methods: {
    changeState (item, value) {
      this.action = value
      this.editedIndex = this.reports.indexOf(item)
      this.statedialog = true
    },
    close () {
      this.statedialog = false
      this.action = ''
    },
    cancelState () {
      this.editedIndex = -1
      this.action = ''
      this.statedialog = false
    },
    async submitState () {
      try {
        const report = this.reports[this.editedIndex]
        if (this.action === 'pass') {
          report.recipe.comments[report.commentidx].isEnabled = 0
          const sendData = {
            _id: report.comment_id,
            isEnabled: 0
          }
          await this.axios.patch('/recipes/msgedit/' + report.recipe._id, sendData, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        }
        const reportData = {
          _id: report._id,
          status: 1
        }
        await this.axios.patch('/reports/', reportData, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        const { data } = await this.axios.get('/reports/', {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.reports = data.result.map(r => {
          r.commentidx = r.recipe.comments.map(c => c._id).indexOf(r.comment_id)
          r.content = r.recipe.comments[r.commentidx].content
          r.isEnabled = r.recipe.comments[r.commentidx].isEnabled
          return r
        })
        this.action = ''
        this.statedialog = false
        this.editedIndex = -1
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    statustext (value) {
      return value === 0 ? '待處理' : '已解決'
    },
    getColor (value) {
      return value === 0 ? 'red' : 'green'
    }
  },
  async mounted () {
    const { data } = await this.axios.get('/reports/', {
      headers: {
        authorization: 'Bearer ' + this.$store.state.jwt.token
      }
    })
    this.reports = data.result.map(r => {
      r.commentidx = r.recipe.comments.map(c => c._id).indexOf(r.comment_id)
      r.content = r.recipe.comments[r.commentidx].content
      r.isEnabled = r.recipe.comments[r.commentidx].isEnabled
      return r
    })
  },
  watch: {
    statedialog (val) {
      val || this.close()
    }
  }
})
</script>
