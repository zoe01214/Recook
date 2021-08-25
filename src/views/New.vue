<template lang="pug">
v-container#new(fluid).pa-0.px-lg-12.mb-12
  v-sheet.mx-3.px-lg-12.d-flex.align-center.mb-12
    h2.header-title.mr-6 編輯食譜
    v-divider
  v-sheet.mx-3.mx-lg-10.pa-8.rounded-xl.bg-white-2.mt-12
    v-card(flat).bg-white-2.bgtrans.pa-3.pa-lg-12
      v-form(ref="form" v-model="form.valid" lazy-validation)
        section(v-show="page === 1")
          p.font-h2.text-center 食譜基本資料
          v-divider.mb-6
          div
            p.font-h3 選擇食譜類型
              div.d-flex
                v-btn.mr-12.typebtn(outlined icon :class="typeclass('text')" @click="form.type = 'text'" x-large)
                  v-icon mdi-book-open-outline
                v-btn.mr-12.typebtn(outlined icon :class="typeclass('video')" @click="form.type = 'video'" x-large)
                  v-icon mdi-television-classic
                v-text-field(outlined color="#DEA56A" v-if="form.type === 'video'" required :rules="ValidYouTubeLink (form.video)" v-model="form.video" placeholder="YOUTUBE 影片連結，例如：https://www.youtube.com/watch?v=E3kREFb3vHg")
          div
            p.font-h3 你的食譜應該叫什麼？
            v-text-field(outlined color="#DEA56A" v-model="form.name" :rules="state.name" :counter="15" placeholder="例如：和風蒜蝦義大利麵" required)
          div
            p.font-h3 你的食譜屬於哪個分類？
              span.ml-2.subtitle-2 (最少勾選一項，最多三項)
            v-chip-group(v-model="form.classify" color="orange" column multiple max=3)
              v-chip.chips(:class="chipclass(item)"  outlined v-for="item of classify" :value="item" :key="item") {{item}}
          div.mt-5
            p.font-h3 關於你的食譜
            v-textarea(outlined color="#DEA56A" required v-model="form.description" :rules="state.description" name="input-7-4" placeholder="告訴我們你的料理祕訣或是料理間的趣事！")
          div
            p.font-h3 上傳食譜圖片
            file-pond(
            name="pond"
            ref="pond"
            allow-multiple="true"
            max-files="5"
            accepted-file-types="image/jpeg, image/png"
            label-idle="點擊或拖曳選擇圖片"
            v-bind:files="form.image"
            allow-reorder="true"
            @updatefiles="handleFilePondUpdateFile"
            @reorderfiles="handleFilePondReoder")
          div.text-right.mt-8
            v-btn.ml-auto.nextbtn(large text @click="nextpage" v-show="page!==3")
              span.font-h3.mr-2 下一步
              v-icon mdi-arrow-right
        section(v-show="page === 2")
          p.font-h2.text-center 食材事前準備
          v-divider.mb-6
          div
            p.font-h3 你的食譜大約幾人份？
            v-select(
              color="#DEA56A"
              :items="servingValue"
              v-model="form.servings"
              :rules="state.servings"
              outlined required placeholder="例如：3人份")
          div
            p.font-h3 你的料理時間是幾分鐘？
            v-select(
              color="#DEA56A"
              :items="timeValue"
              v-model="form.time"
              :rules="state.time"
              outlined required placeholder="例如：50分鐘")
          div
            p.font-h3 你的食材有哪些？份量是多少？
            v-row
              v-col(cols="10")
                v-row
                  v-col.pb-0(cols="6")
                    v-text-field(outlined color="#DEA56A" required placeholder="食材" :rules="state.ingredient" v-model="newIngredient")
                  v-col.pb-0(cols="6")
                    v-text-field(outlined color="#DEA56A" required placeholder="份量" :rules="state.portion" v-model="newPortion" @keyup.enter="addNeed")
              v-col.pb-0(cols="2").text-center
                v-btn.white--text(small fab color="#DEA56A" elevation="0" @click="addNeed")
                  v-icon mdi-plus
            template
              draggable(v-model="needs" @start="dragging = true" @end="dragging = false")
                div(v-for="(item,idx) of needs" :key="idx")
                  v-row
                    v-col(cols="10")
                      v-row
                        v-col(cols="6")
                          v-sheet.rounded-lg.stepcard.pa-2.px-6
                            v-text-field( color="#DEA56A" required placeholder="食材" v-if="item.edit" v-model="item.model1")
                            p(v-else) {{item.ingredient}}
                        v-col(cols="6")
                          v-sheet.rounded-lg.stepcard.pa-2.px-6
                            v-text-field( color="#DEA56A" required placeholder="份量" v-if="item.edit" v-model="item.model2")
                            p(v-else) {{item.portion}}
                    v-col(cols="2")
                      div(v-if="!item.edit").d-flex.justify-center
                        v-btn.mr-3(x-small fab outlined  elevation="0" @click="editNeed(idx)")
                          v-icon(samll) mdi-pencil
                        v-btn(x-small fab outlined  elevation="0" @click="deleteNeed(idx)")
                          v-icon mdi-close
                      div(v-else).d-flex.justify-center
                        v-btn.mr-3(x-small fab outlined  elevation="0" @click="changeNeed(idx)")
                          v-icon(samll) mdi-check
                        v-btn(x-small fab outlined  elevation="0" @click="cancelNeed(idx)")
                          v-icon mdi-close
            div.d-flex.mt-8
              v-btn.ml-auto.nextbtn(large text @click="prevpage")
                v-icon mdi-arrow-left
                span.font-h3.mr-2 上一步
              v-spacer
              v-btn.ml-auto.nextbtn(large text @click="nextpage")
                span.font-h3.mr-2 下一步
                v-icon mdi-arrow-right
        section(v-show="page === 3")
          p.font-h2.text-center 食譜料理步驟
          v-divider.mb-6
          div.mt-3
            p.font-h3 寫下你的食譜步驟吧！
            v-row
              v-col(cols="10")
                v-textarea( outlined color="#DEA56A" required placeholder="步驟說明" :rules="state.instructions" v-model="newStep")
              v-col(cols="2").text-center
                v-btn.white--text.my-12(small fab color="#DEA56A" elevation="0" @click="addStep")
                  v-icon mdi-plus
          template
            draggable(v-model="steps" @start="dragging = true" @end="dragging = false")
              div(flat v-for="(item,idx) of steps" :key="idx")
                v-row
                  v-col(cols="10")
                    v-sheet.rounded-lg.stepcard.pa-3.px-6
                      v-textarea(counter rows="3" background-color="transparent" color="#DEA56A" required placeholder="步驟說明" v-if="item.edit" v-model="item.model")
                      p(v-else style="white-space: pre-wrap;") {{item.steptext}}
                  v-col(cols="2")
                    div(v-if="!item.edit").d-flex.justify-center
                      v-btn.mr-3(x-small fab outlined  elevation="0" @click="editStep(idx)")
                        v-icon(samll) mdi-pencil
                      v-btn.stepicon(x-small fab outlined elevation="0" @click="deleteStep(idx)")
                        v-icon mdi-close
                    div(v-else).d-flex.justify-center
                      v-btn.mr-3(x-small fab outlined  elevation="0" @click="changeStep(idx)")
                        v-icon(samll) mdi-check
                      v-btn(x-small fab outlined  elevation="0" @click="cancelStep(idx)")
                        v-icon mdi-close
          div.d-flex.mt-8
            v-btn.ml-auto.nextbtn(large text @click="prevpage")
              v-icon mdi-arrow-left
              span.font-h3.mr-2 上一步
            v-spacer
            v-btn.ml-auto.orangebtn(large text @click="submitModel")
              span.font-h3.mr-2 完成
              v-icon mdi-hand-okay
</template>

<script>
export default {
  name: 'New',
  data () {
    return {
      servingValue: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '15+'],
      timeValue: ['5', '10', '15', '20', '30', '40', '50', '60', '90', '120', '180+'],
      page: 1,
      form: {
        valid: true,
        name: '',
        type: 'text',
        image: [],
        description: '',
        video: '',
        servings: '',
        time: '',
        ingredients: [],
        instructions: [],
        classify: ''
      },
      needs: [],
      newIngredient: '',
      newPortion: '',
      steps: [],
      newStep: '',
      classify: ['烘焙甜點', '家常菜色', '電鍋料理', '蔬食料理', '異國料理', '快速上桌', '飲料冰品', '節慶料理', '寶寶兒童', '寵物料理']
    }
  },
  computed: {
    state () {
      const name = this.form.name
      const image = this.form.image
      const description = this.form.description
      const servings = this.form.servings
      const time = this.form.time
      const instructions = this.newStep
      const ingredient = this.newIngredient
      const portion = this.newPortion
      return {
        name: [!!name || '食譜名稱不得為空值', name.length >= 5 || '食譜名稱最少 5 個字', name.length <= 20 || '食譜名稱最多 20 個字'],
        image: [!!image || '請上傳至少一張照片', image.length >= 1 || '請上傳至少 1 張照片', image.length < 5 || '照片最多 5 張'],
        description: [!!description || '食譜簡介至少 10 個字', description.length >= 10 || '食譜簡介最少 10 個字', description.length <= 400 || '食譜簡介不得超過 400 個字'],
        servings: [!!servings || '請選擇食譜份量'],
        time: [!!time || '請選擇料理時間'],
        instructions: [instructions.length <= 100 || '料理步驟最多 100 個字'],
        ingredient: [ingredient.length <= 15 || '食材名稱最多 15 個字'],
        portion: [portion.length <= 10 || '食材份量最多 10 個字']
      }
    }
  },
  methods: {
    ValidYouTubeLink (url) {
      if (url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
        const match = url.match(regExp)
        return ([(match && match[7].length === 11) || '輸入的連結不是 Youtube，請再次確認'])
      } else {
        return ['請輸入影片 Youtube 連結']
      }
    },
    addNeed () {
      if (this.newIngredient.length !== 0 && this.newIngredient.length <= 15) {
        if (this.newPortion.length !== 0 && this.newPortion.length <= 10) {
          this.needs.push({
            ingredient: this.newIngredient,
            portion: this.newPortion,
            edit: false,
            model1: this.newIngredient,
            model2: this.newPortion
          })
          this.newIngredient = ''
          this.newPortion = ''
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '請重新確認食材名稱，最多 10 個字'
          })
        }
      } else {
        if (this.newPortion.length === 0) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '請輸入食材份量及名稱'
          })
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '請重新確認食材名稱，最多 15 個字'
          })
        }
      }
    },
    editNeed (idx) {
      this.needs[idx].edit = true
    },
    changeNeed (idx) {
      this.needs[idx].ingredient = this.needs[idx].model1
      this.needs[idx].portion = this.needs[idx].model2
      this.needs[idx].edit = false
    },
    cancelNeed (idx) {
      this.needs[idx].model1 = this.needs[idx].ingredient
      this.needs[idx].model2 = this.needs[idx].portion
      this.needs[idx].edit = false
    },
    deleteNeed (idx) {
      this.needs.splice(idx, 1)
    },
    addStep () {
      if (this.newStep.length >= 10 || this.newStep.length <= 200) {
        this.steps.push({
          steptext: this.newStep,
          edit: false,
          model: this.newStep
        })
        this.newStep = ''
      } else {
        return ['步驟說明最少 10 個字，最多 200 個字']
      }
    },
    editStep (idx) {
      this.steps[idx].edit = true
    },
    changeStep (idx) {
      this.steps[idx].steptext = this.steps[idx].model
      this.steps[idx].edit = false
    },
    cancelStep (idx) {
      this.steps[idx].model = this.steps[idx].steptext
      this.steps[idx].edit = false
    },
    deleteStep (idx) {
      this.steps.splice(idx, 1)
    },
    nextpage () {
      if (this.page !== 3) this.page++
    },
    prevpage () {
      if (this.page !== 1) this.page--
    },
    async submitModel () {
      if (this.$refs.form.validate() === false) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '食譜資料未完成'
        })
      } else {
        if (this.needs.length === 0 || this.steps.length === 0) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '請輸入食材項目與料理步驟'
          })
        } else if (this.form.image.length !== 0) {
          try {
            for (const s of this.steps) {
              this.form.instructions.push(s.steptext.toString())
            }
            for (const n of this.needs) {
              this.form.ingredients.push({
                ingredient: n.ingredient.toString(),
                portion: n.portion.toString()
              })
            }
            const fd = new FormData()
            for (const key in this.form) {
              if (Array.isArray(this.form[key]) && key !== 'image') {
                fd.append(key, JSON.stringify(this.form[key]))
              } else if (Array.isArray(this.form[key]) && key === 'image') {
                for (const i in this.form[key]) {
                  fd.append(key, this.form[key][i])
                }
              } else {
                fd.append(key, this.form[key])
              }
            }
            // 新增
            await this.axios.post('/recipes', fd, {
              headers: {
                authorization: 'Bearer ' + this.$store.state.jwt.token
              }
            })
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '食譜發布成功'
            })
            this.$router.push('/')
          } catch (error) {
            this.form.ingredients = []
            this.form.instructions = []
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: error.response.data.message
            })
          }
        } else {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '請至少上傳一張食譜照片'
          })
        }
      }
    },
    handleFilePondUpdateFile (files) {
      this.form.image = files.map(files => files.file)
    },
    handleFilePondReoder (files) {
      this.form.image = files.map(files => files.file)
    },
    typeclass (value) {
      return this.form.type === value ? 'typebtn-active' : ''
    },
    chipclass (value) {
      let result = false
      if (this.form.classify !== '') {
        result = this.form.classify.some(c => c === value)
      }
      return result ? 'chips-active' : ''
    }
  }
}
</script>
