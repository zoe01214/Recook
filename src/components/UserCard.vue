<template lang="pug">
router-link(:to="'/user/'+ uid")
  v-sheet.d-flex.align-center
    v-avatar.d-flex.mr-3(v-if="uavatar" :size="avatar.size -20")
      img(:src="uavatar")
    avatar.d-flex.mr-3(v-else :size="avatar.size - 20" :name="uaccount" :variant="avatar.variant" :colors="avatar.colors")
    div.text-left
      h3.mb-2 {{uname}}
      div.text-subtitle-2.grey--text.font-weight-light.mt-n2 {{uaccount}}
    v-spacer
    v-btn.w(small depressed outlined color="grey" @click.prevent="sendfollow")
      span {{btnname}}
</template>

<script>
export default ({
  name: 'UserCard',
  data () {
    return {
      uaccount: '',
      uname: '',
      uavatar: '',
      uid: ''
    }
  },
  props: {
    userdata: {
      type: Object,
      required: true
    },
    avatar: {
      type: Object,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    nowuser: {
      type: Object,
      required: true
    }
  },
  computed: {
    btnname () {
      if (this.action === 'follower') {
        if (this.nowuser.isauthor) {
          return this.userdata.isfollow === true ? '移除' : '已移除'
        } else {
          return this.userdata.isfollow === true ? '追蹤中' : '追蹤'
        }
      } else {
        return this.userdata.isfollow === true ? '追蹤中' : '追蹤'
      }
    }
  },
  methods: {
    async sendfollow () {
      if (this.user.islogin) {
        if (this.nowuser.isauthor && this.action === 'follower') {
          await this.axios.patch('/users/follow/' + this.$store.state.user._id, { _id: this.uid, type: 'delfans' }, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        } else {
          await this.axios.patch('/users/follow/' + this.$store.state.user._id, { _id: this.uid }, {
            headers: {
              authorization: 'Bearer ' + this.$store.state.jwt.token
            }
          })
        }
        this.$emit('sendfollow', this.action)
      } else {
        this.$router.push('/login')
      }
    }
  },
  async mounted () {
    this.uid = this.userdata._id
    this.uaccount = this.userdata.account
    this.uname = this.userdata.username
    if (this.userdata.avatar && this.userdata.avatar !== undefined && this.userdata.avatar.length !== 0) {
      this.uavatar = this.userdata.avatar.map(i => `${process.env.VUE_APP_API}/files/${i}`)[0]
    }
  }
})
</script>
