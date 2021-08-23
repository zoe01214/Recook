<template lang="pug">
v-container#register(fluid).pa-0.mb-12
  v-container.mb-4
    v-row
      v-col(cols="12")
        v-sheet.px-12.d-flex.align-center
          h2.ctitle.mr-6 會員註冊
          v-divider
  v-container
    v-sheet.mx-10.rounded-xl.bg-white-2.py-5
      v-card(flat max-width="550px").bg-white-2.text-center.bgtrans.mx-auto.pa-12
        v-form(ref="form" lazy-validation width="100%" @submit.prevent="submit")
          h2.pb-6 加入 RECOOK 參與更多料理盛事
          v-text-field.pa-2(color="#DEA56A" v-model="form.account"  :rules="state.account" :counter="20" label="account" placeholder="請輸入帳號" required)
          v-text-field.pa-2(color="#DEA56A" v-model="form.password"  :rules="state.password" :counter="20" label="password" placeholder="請輸入密碼" required)
          v-text-field.pa-2(color="#DEA56A" v-model="form.email" :rules="state.email" label="E-mail" placeholder="請輸入電子信箱" required)
          p.d-flex
            v-btn(plain) 忘記密碼?
            v-spacer
            v-btn(plain to='/login') 已經擁有帳號?
          p.text-center
            v-btn.loginbtn(:disabled="!form.valid"  @click="submit") 送出
</template>

<script>
import isEmail from 'validator/es/lib/isEmail'

export default {
  name: 'Register',
  data () {
    return {
      form: {
        valid: true,
        account: '',
        password: '',
        email: ''
      }
    }
  },
  computed: {
    state () {
      const account = this.form.account
      const password = this.form.password
      const email = this.form.email
      return {
        account: [!!account || '請輸入帳號', (account.length >= 4 && account.length <= 20) || '帳號必須大於 4 個字且不超過 20 個字'],
        password: [!!password || '請輸入密碼', (password.length >= 4 && password.length <= 20) || '密碼必須大於 4 個字且不超過 20 個字'],
        email: [isEmail(email) || '請輸入有效的電子信箱']
      }
    }
  },
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        try {
          this.form.username = this.form.account
          await this.axios.post('/users', this.form)
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '註冊成功'
          })
          this.$router.push('/')
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '失敗',
            text: error.response.data.message
          })
        }
      }
    }
  }
}
</script>
