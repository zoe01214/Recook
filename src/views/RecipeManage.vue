<template lang="pug">
v-container#eecipemanage.pa-4
  v-data-table(:headers="headers" :items="recipes" :search="search")
    template(v-slot:top)
      v-toolbar(flat)
        v-toolbar-title 食譜管理
          v-dialog(v-model="dialog" max-width="800px")
            template(v-slot:activator="{ on, attrs }")
              v-btn.ml-12(small color="primary" dark class="mb-2" v-bind="attrs" v-on="on") 新增食譜
            v-card.pa-8.pr-10
              v-form(ref="form")
                v-card-title
                span(class="text-h5") {{formtitle}}
                section(v-show="page === 1")
                  h3.mb-3 食譜基本資料
                  div
                    h4 選擇食譜類型
                      v-radio-group(v-model="form.type" row).mb-1.mt-2
                        v-radio.mr-5(outlined x-large label="文字食譜" value="text")
                        v-radio(outlined x-large label="影片食譜"  value="video")
                  div
                    h4.mb-1 你的食譜應該叫什麼？
                    v-text-field(outlined color="green darken-2" v-model="form.name" :rules="state.name" :counter="15" placeholder="例如：和風蒜蝦義大利麵" required)
                  div
                    h4.mb-1
                    | 你的食譜屬於哪個類型？
                    span.caption.ml-2 (最少勾選一項，最多三項)
                    v-chip-group(v-model="form.classify" color="orange" column multiple max=3)
                      v-chip(filter outlined v-for="item of classify" :value="item" :key="item") {{item}}
                  div
                    h4.mb-1 食譜簡介
                    v-textarea(outlined required v-model="form.description" :rules="state.description" name="input-7-4" placeholder="告訴我們你的料理祕訣或是料理間的趣事！")
                  div
                    h4.mb-1 上傳圖片
                    //- 單圖檔上傳
                    //- img-inputer(v-model="form.image" theme="dark" size="large" placeholder="點擊或拖曳選擇圖片" bottom-text="點擊或拖曳以修改")
                  template
                    draggable(v-model="image" @start="dragging = true" @end="dragging = false")
                      v-sheet.bg-white-2.imagecard(width="25%" v-for="(item,index) of image" :key="item")
                        v-img.rounded(height="200" :src="item")
                        v-btn.btnclose(icon @click="delimage(index)" absolute top right)
                          v-icon.white--text.text-subtitle-2 mdi-close
                  v-divider.my-3
                  file-pond(
                  name="pond"
                  ref="pond"
                  allow-multiple="true"
                  max-files="5"
                  accepted-file-types="image/jpeg, image/png"
                  label-idle="點擊或拖曳選擇圖片"
                  v-bind:files="form.image"
                  allow-reorder="true"
                  @updatefiles="handleFilePondUpdateFile")
                  div(v-if="form.type === 'video'")
                    h4.mb-1 上傳影片 YOUTUBE 連結
                    v-text-field(outlined required :rules="ValidYouTubeLink(form.video)" v-model="form.video" placeholder="YOUTUBE 影片連結，例如：https://www.youtube.com/watch?v=E3kREFb3vHg")
                      v-icon mdi-camera
                section(v-show="page === 2")
                  h3.mb-3 食材事前準備
                  div.d-flex
                    div.mr-8
                      h4.mb-1 你的食譜大約幾人份？
                      v-select(
                        :items="servingValue"
                        v-model="form.servings"
                        :rules="state.servings"
                        outlined required placeholder="例如：3人份")
                    div
                      h4.mb-1 你的料理時間是幾分鐘？
                      v-select(
                        :items="timeValue"
                        v-model="form.time"
                        :rules="state.time"
                        outlined required placeholder="例如：50分鐘")
                  div
                    h4.mb-1 你的食材有哪些？份量是多少？
                    div.d-flex.align-center
                      v-text-field.mr-6(outlined required placeholder="食材" :rules="state.ingredient" v-model="newIngredient")
                      v-text-field.mr-6(outlined required placeholder="份量" :rules="state.portion" v-model="newPortion" @keyup.enter="addNeed")
                      v-btn.red.white--text.mb-8(icon small fab @click="addNeed")
                        v-icon mdi-plus
                    template
                    draggable(v-model="needs" @start="dragging = true" @end="dragging = false")
                      v-card(v-for="(item,idx) of needs" :key="idx")
                        v-list.d-flex.pa-0
                          v-list-item
                            v-text-field.mr-6(solo required placeholder="食材" v-if="item.edit" v-model="item.model1")
                            p.mr-6(v-else) {{item.ingredient}}
                          v-list-item
                            v-text-field.mr-6(solo required placeholder="份量" v-if="item.edit" v-model="item.model2")
                            p.mr-6(v-else) {{item.portion}}
                          v-list-item-icon.mr-12(v-if="!item.edit")
                            v-btn(icon small @click="editNeed(idx)")
                              v-icon(samll) mdi-pencil
                            v-btn(icon small @click="deleteNeed(idx)")
                              v-icon mdi-minus
                          v-list-item-icon.mr-12(v-else)
                            v-btn(icon small @click="changeNeed(idx)")
                              v-icon(samll) mdi-check
                            v-btn(icon small @click="cancelNeed(idx)")
                              v-icon mdi-close
                section(v-show="page === 3")
                  h3.mb-3 料理的步驟說明
                    div
                      p.text-subtitle-1.font-weight-bold.mb-1.mb-1 寫下你的食譜步驟吧！
                      v-textarea.mr-6(rows=3 outlined required placeholder="步驟說明" :rules="state.instructions" v-model="newStep" @keyup.enter="addStep")
                      v-btn.red.white--text.mb-8(icon small fab @click="addStep")
                        v-icon mdi-plus
                    template
                      draggable(v-model="steps" @start="dragging = true" @end="dragging = false")
                        v-card(v-for="(item,idx) of steps" :key="idx")
                          v-list.d-flex.pa-0
                            v-list-item
                              v-textarea.mr-6(solo required placeholder="步驟說明" v-if="item.edit" v-model="item.model")
                              p.mr-6(v-else) {{item.steptext}}
                            v-list-item-icon.mr-12(v-if="!item.edit")
                              v-btn(icon small @click="editStep(idx)")
                                v-icon(samll) mdi-pencil
                              v-btn(icon small @click="deleteStep(idx)")
                                v-icon mdi-minus
                            v-list-item-icon.mr-12(v-else)
                              v-btn(icon small @click="changeStep(idx)")
                                v-icon(samll) mdi-check
                              v-btn(icon small @click="cancelStep(idx)")
                                v-icon mdi-close
                v-toolbar(flat)
                  v-btn(outlined color="grey" @click="prevpage" v-show="page!==1")
                    v-icon mdi-arrow-left
                  v-spacer
                  v-btn.grey.darken-3.white--text(@click="nextpage" v-show="page!==3")
                    v-icon.white--text mdi-arrow-right
                  v-btn.orange.white--text(v-show="page===3" @click="submitModel")
                    span 送出
          v-dialog(v-model="statedialog" max-width="500px")
            v-card
              v-card-title.text-h6 確定更改食譜上架狀態嗎？
              v-card-actions
                v-spacer
                v-btn(color="blue darken-1" text @click="cancelState") 取消
                v-btn(color="blue darken-1" text @click="submitState") 確定
        v-spacer
        v-text-field(v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details)
    template(v-slot:item.classify="{ item }")
      v-chip.mr-2(v-for="i in item.classify" :key="i") {{i}}
    template(v-slot:item.isEnabled="{ item }")
      v-switch(v-model="item.isEnabled" readonly @click="changeState(item)")
    template(v-slot:item.actions="{ item }")
      v-icon(small class="mr-2" @click="editItem(item)") mdi-pencil
</template>

<script>
export default ({
  name: 'RecipeManage',
  data () {
    return {
      recipes: [],
      search: '',
      headers: [
        {
          text: '食譜名稱',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: '作者', value: 'author.account' },
        { text: '食譜類型', value: 'type' },
        { text: '食譜分類', value: 'classify' },
        { text: '食譜上架', value: 'isEnabled' },
        { text: '編輯', value: 'actions', sortable: false }
      ],
      page: 1,
      statedialog: false,
      deldialog: false,
      dialog: false,
      editedIndex: -1,
      servingValue: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '12', '15+'],
      timeValue: ['5', '10', '15', '20', '30', '40', '50', '60', '90', '120', '180+'],
      form: {
        name: '',
        type: 'text',
        image: [],
        description: '',
        video: '',
        servings: '',
        time: '',
        ingredients: [],
        instructions: [],
        _id: '',
        classify: ''
      },
      needs: [],
      newIngredient: '',
      newPortion: '',
      steps: [],
      newStep: '',
      classify: ['烘焙甜點', '家常菜色', '電鍋料理', '蔬食料理', '異國料理', '快速上桌', '飲料冰品', '節慶料理', '寶寶兒童', '寵物料理'],
      image: []
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? '新增食譜' : '編輯食譜'
    },
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
    editItem (item) {
      this.page = 1
      this.editedIndex = this.recipes.indexOf(item)
      this.form = {
        valid: true,
        name: this.recipes[this.editedIndex].name,
        type: this.recipes[this.editedIndex].type,
        description: this.recipes[this.editedIndex].description,
        video: this.recipes[this.editedIndex].video,
        servings: this.recipes[this.editedIndex].servings,
        time: this.recipes[this.editedIndex].time,
        image: [],
        _id: this.recipes[this.editedIndex]._id,
        ingredients: [],
        instructions: [],
        classify: this.recipes[this.editedIndex].classify
      }
      this.image = this.recipes[this.editedIndex].image
      this.needs = []
      this.steps = []
      for (const i of this.recipes[this.editedIndex].ingredients) {
        this.needs.push({
          ingredient: i.ingredient,
          model1: i.ingredient,
          portion: i.portion,
          model2: i.portion,
          edit: false
        })
      }
      for (const i of this.recipes[this.editedIndex].instructions) {
        this.steps.push({
          steptext: i,
          edit: false
        })
      }
      this.dialog = true
    },
    close () {
      this.dialog = false
      this.page = 1
      this.form = {
        name: '',
        type: 'text',
        image: [],
        description: '',
        video: '',
        servings: '',
        time: '',
        ingredients: [],
        instructions: [],
        _id: '',
        classify: ''
      }
      this.image = []
      this.needs = []
      this.steps = []
      this.editedIndex = -1
    },
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
      if (this.newIngredient.length !== 0) {
        if (this.newPortion.length !== 0) {
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
            text: '請輸入食材份量'
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
            text: '請輸入食材名稱'
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
        } if (this.image.length === 0 && this.form.image.length === 0) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '請至少上傳一張照片'
          })
        } else {
          try {
            this.form.orgimage = []
            if (this.image.length !== 0) {
              this.form.orgimage = this.image
            }
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
              if (Array.isArray(this.form[key]) && key !== 'image' && key !== 'orgimage') {
                fd.append(key, JSON.stringify(this.form[key]))
              } else if (Array.isArray(this.form[key]) && key === 'image') {
                for (const i in this.form[key]) {
                  fd.append(key, this.form[key][i])
                }
              } else if (Array.isArray(this.form[key]) && key === 'orgimage') {
                for (const i in this.form[key]) {
                  fd.append(key, this.form[key][i])
                }
              } else {
                fd.append(key, this.form[key])
              }
            }
            await this.axios.patch('/recipes/' + this.form._id, fd, {
              headers: {
                authorization: 'Bearer ' + this.$store.state.jwt.token
              }
            })
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '食譜修改成功'
            })
            this.$router.push('/recipes/')
          } catch (error) {
            this.form.ingredients = []
            this.form.instructions = []
            this.$swal({
              icon: 'error',
              title: '錯誤',
              text: error.response.data.message
            })
          }
        }
      }
    },
    changeState (item) {
      this.editedIndex = this.recipes.indexOf(item)
      this.form = Object.assign({}, item)
      this.statedialog = true
    },
    cancelState () {
      this.statedialog = false
      this.form = {
        name: '',
        type: 'text',
        image: [],
        description: '',
        video: '',
        servings: '',
        time: '',
        ingredients: [],
        instructions: [],
        _id: '',
        classify: ''
      }
      this.editedIndex = -1
      this.needs = []
      this.steps = []
    },
    async submitState () {
      try {
        this.form.isEnabled === 1 ? this.form.isEnabled = 0 : this.form.isEnabled = 1
        await this.axios.patch('/recipes/del/' + this.form._id, { isEnabled: this.form.isEnabled }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.statedialog = false
        this.form = {
          name: '',
          type: 'text',
          image: [],
          description: '',
          video: '',
          servings: '',
          time: '',
          ingredients: [],
          instructions: [],
          _id: '',
          classify: ''
        }
        this.editedIndex = -1
        const { data } = await this.axios.get('/recipes/')
        this.recipes = data.result.map(recipe => {
          if (recipe.image) {
            recipe.image = recipe.image.map(r => `${process.env.VUE_APP_API}/files/${r}`)
          }
          return recipe
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
      this.form.image = files.map(files => files.file)
    },
    handleFilePondReoder (files) {
      this.form.image = files.map(files => files.file)
    },
    async delimage (index) {
      try {
        await this.axios.patch('/recipes/delimage/' + this.form._id, { index: index }, {
          headers: {
            authorization: 'Bearer ' + this.$store.state.jwt.token
          }
        })
        this.image.splice(index, 1)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '刪除圖片失敗'
        })
      }
    }
  },
  async mounted () {
    const { data } = await this.axios.get('/recipes/')
    this.recipes = data.result.map(recipe => {
      if (recipe.image) {
        recipe.image = recipe.image.map(r => `${process.env.VUE_APP_API}/files/${r}`)
      }
      return recipe
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
})
</script>
