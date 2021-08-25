<template lang="pug">
v-container#forget(fluid).pa-0.px-lg-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 忘記密碼
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-card(flat max-width="550px").bg-white-2.text-center.bgtrans.mx-auto.pa-12
      v-form(ref="form" lazy-validation width="100%" )
        h2.pb-6 發送驗證信件到您的信箱
        v-text-field.pa-2(color="#DEA56A" v-model="form.account" :counter="20" label="account" placeholder="請輸入帳號" required)
        v-text-field.pa-2(color="#DEA56A" v-model="form.email"  label="email" placeholder="請輸入信箱" required)
        p.d-flex
          v-btn(plain to='/login') 已經擁有帳號?
          v-spacer
          v-btn(plain to='/register') 還沒擁有帳號?
        p.text-center
          v-btn.loginbtn() 發信
</template>

<script>
export default {
  name: 'Forget',
  data () {
    return {
      form: {
        account: '',
        email: ''
      }
    }
  }
}
</script>
