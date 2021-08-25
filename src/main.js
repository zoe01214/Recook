import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './scss/index.scss'
import './plugins/axios.js'
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from 'gsap/all'
import VueSplide from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import mixin from './mixin.js'
import draggable from 'vuedraggable'

// 圖片上傳
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilepondPluginDragReorder from 'filepond-plugin-drag-reorder'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop'
import FilePondPluginImageEdit from 'filepond-plugin-image-edit'
import Avatar from 'vue2-boring-avatars'
import VuePaycard from 'vue-paycard'

import VueEditor from 'vue2-editor'
import VueGtag from 'vue-gtag'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(VueGtag, {
  config: { id: 'G-8Z1XETWKQ7' }
})

gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin)
Vue.use(VuePaycard)
Vue.use(VueSweetalert2)

Vue.component('draggable', draggable)

Vue.component('FilePond', vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilepondPluginDragReorder,
  FilePondPluginImageCrop,
  FilePondPluginImageEdit
))
Vue.component('ImgInputer', ImgInputer)
Vue.component('avatar', Avatar)
Vue.component('Loading', Loading)

Vue.use(VueEditor)
Vue.use(VueSplide)

Vue.config.productionTip = false

Vue.mixin(mixin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
