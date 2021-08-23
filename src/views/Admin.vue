<template lang="pug">
v-container(fluid)#admin.mx-0
  v-row.mt-3
    v-col(cols="12" sm="2").mr-6
      v-sheet(rounded="lg" outlined)
        v-list(color="transparent")
          v-list-item.text-center(
            v-for="item of adminMenu"
            :key="item.name"
            link)
            v-list-item-content
              router-link(:to="item.to")
                v-list-item-title.black--text {{ item.name }}
    v-col
      v-sheet(
        min-height="70vh"
        rounded="lg" outlined)
        router-view
</template>

<script>
export default ({
  name: 'Admin',
  data () {
    return {
      adminMenu: [
        { name: '帳號管理', to: '/accountmanage' },
        { name: '食譜管理', to: '/recipemanage' },
        { name: '評論管理', to: '/reportmanage' },
        { name: '貼文管理', to: '/postmanage' },
        { name: '商品管理', to: '/productmanage' },
        { name: '訂單管理', to: '/ordermanage' },
        { name: '前台管理', to: '/frontmanage' },
        { name: '意見箱', to: '/recievemanage' }
      ]
    }
  }
})
</script>
