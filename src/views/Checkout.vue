<template lang="pug">
v-container#checkout(fluid).pa-0.mb-12
  v-container.mb-4
    v-row
      v-col(cols="12")
        v-sheet.px-12.d-flex.align-center
          h2.header-title.mr-6 訂單資料
          v-divider
  v-container
    v-sheet.mx-10.rounded-xl.bg-white-2.pa-10
      p.font-h3 1.收件人資料
      v-form
        v-text-field(outlined label="收件人姓名" v-model="form.name")
        v-text-field(outlined label="收件人手機號碼" maxlength="10" v-model="form.phone")
        v-text-field(outlined label="請輸入地址" v-model="form.address")
      p.font-h3 2.付款資訊
      vue-paycard(:value-fields="valueFields" :valueFields="valueFields")
      v-form
        p 卡號
        v-text-field(data-card-field outlined autocomplete="off" :maxLength="cardNumberMaxLength" @input="changeNumber" :id="inputFields.cardNumber" v-model="valueFields.cardNumber")
        p 姓名(英文字母)
        v-text-field(data-card-field outlined :id="inputFields.cardName" v-model="valueFields.cardName")
        div.d-flex
          div.mr-12
            p 有效日期
            div.d-flex
              v-select.mr-3(data-card-field outlined :id="inputFields.cardMonth" :items="month" v-model="valueFields.cardMonth")
              v-select(data-card-field outlined :id="inputFields.cardYear" :items="year" v-model="valueFields.cardYear")
          div
            p 末三碼
            v-text-field(data-card-field autocomplete="off" maxlength="3" :id="inputFields.cardCvv" outlined v-model.number="valueFields.cardCvv")
      v-btn.white--text(block elevation="0" color="#DEA56A" @click="checkout")
        span.font-h3 送出訂單
</template>

<script>
import InputNumber from '@/components/InputNumber.vue'

export default {
  name: 'Cart',
  data () {
    return {
      cart: [],
      form: {
        name: '',
        phone: '',
        address: '',
        credit: ''
      },
      valueFields: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: ''
      },
      inputFields: {
        cardNumber: 'v-card-number',
        cardName: 'v-card-name',
        cardMonth: 'v-card-month',
        cardYear: 'v-card-year',
        cardCvv: 'v-card-cvv'
      },
      month: [],
      year: [],
      cardNumberMaxLength: 19
    }
  },
  components: {
    InputNumber
  },
  methods: {
    async checkout () {
      try {
        const data = {
          name: this.form.name,
          phone: this.form.phone,
          address: this.form.address,
          credit: this.valueFields.cardNumber
        }
        await this.axios.post('/orders', data, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '您的訂單已送出'
        })
        this.$router.push('/orders')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '結帳失敗'
        })
      }
    },
    changeNumber (e) {
      const value = this.valueFields.cardNumber.replace(/\D/g, '')
      // american express, 15 digits
      if ((/^3[47]\d{0,13}$/).test(value)) {
        this.valueFields.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        this.cardNumberMaxLength = 17
      } else if ((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) { // diner's club, 14 digits
        this.valueFields.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ')
        this.cardNumberMaxLength = 16
      } else if (/^62[0-9]\d*/.test(value)) {
        this.valueFields.cardNumber = value.replace(/(\d{6})/, '$1 ').replace(/(\d{6}) (\d{7})/, '$1 $2 ').replace(/(\d{6}) (\d{7}) (\d{6})/, '$1 $2 $3 ').replace(/(\d{5}) (\d{5}) (\d{5}) (\d{4})/, '$1 $2 $3 $4')
        this.cardNumberMaxLength = 21
      } else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
        this.valueFields.cardNumber = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ')
        this.cardNumberMaxLength = 19
      }
      if (e.inputType === 'deleteContentBackward') {
        const lastChar = this.valueFields.cardNumber.substring(this.valueFields.cardNumber.length, this.valueFields.cardNumber.length - 1)
        if (lastChar === ' ') { this.valueFields.cardNumber = this.valueFields.cardNumber.substring(0, this.valueFields.cardNumber.length - 1) }
      }
    }
  },
  async mounted () {
    try {
      const { data } = await this.axios.get('/users/cart', {
        headers: {
          authorization: 'Bearer ' + this.$store.state.jwt.token
        }
      })
      this.cart = data.result.map(item => {
        item = { ...item.product, amount: item.amount }
        item.image = item.image.map(i => `${process.env.VUE_APP_API}/files/${item.image}`)[0]
        item.amountModel = item.amount
        return item
      })
      // 計算 month 資料
      for (let i = 1; i < 13; i++) {
        let month = ''
        if (i < 10) {
          month = `0${i}`
        } else {
          month = `${i}`
        }
        this.month.push(month)
      }
      // 計算 year 資料
      const thisyear = new Date().getFullYear()
      for (let i = thisyear; i < thisyear + 17; i++) {
        this.year.push(i)
      }
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
