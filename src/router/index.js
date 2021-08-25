import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Recook'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      title: '登入 - Recook'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '關於我們 - Recook'
    }
  },
  {
    path: '/user/:id',
    name: 'Userpage',
    component: () => import(/* webpackChunkName: "userpage" */ '../views/Userpage.vue'),
    meta: {
      title: '個人食譜 - Recook'
    }
  },
  {
    path: '/recipe/:id',
    name: 'RecipeInfo',
    component: () => import(/* webpackChunkName: "recipeinfo" */ '../views/RecipeInfo.vue'),
    meta: {
      title: '食譜介紹 - Recook'
    }
  },
  {
    path: '/recipe/edit/:id',
    name: 'EditRecipe',
    component: () => import(/* webpackChunkName: "editrecipe" */ '../views/EditRecipe.vue'),
    meta: {
      login: true,
      title: '編輯食譜 - Recook'
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta: {
      title: '註冊 - Recook'
    }
  },
  {
    path: '/post/:id',
    name: 'PostInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "postinfo" */ '../views/PostInfo.vue'),
    meta: {
      title: '文章閱覽 - Recook'
    }
  },
  {
    path: '/products/:id',
    name: 'ProductInfo',
    component: () => import(/* webpackChunkName: "productsinfo" */ '../views/ProductInfo.vue'),
    meta: {
      title: '商品資訊 - Recook'
    }
  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "new" */ '../views/New.vue'),
    meta: {
      login: true,
      title: '建立食譜 - Recook'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import(/* webpackChunkName: "admin" */ '../views/AdminHome.vue'),
        meta: {
          login: true,
          admin: true,
          title: '管理首頁 - Recook'
        }
      },
      {
        path: '/accountmanage',
        name: 'AccountManage',
        component: () => import(/* webpackChunkName: "accountmanage" */ '../views/AccountManage.vue'),
        meta: {
          login: true,
          admin: true,
          title: '帳號管理 - Recook'
        }
      },
      {
        path: '/recipemanage',
        name: 'RecipeManage',
        component: () => import(/* webpackChunkName: "recipemanage" */ '../views/RecipeManage.vue'),
        meta: {
          login: true,
          admin: true,
          title: '食譜管理 - Recook'
        }
      },
      {
        path: '/reportmanage',
        name: 'ReportManage',
        component: () => import(/* webpackChunkName: "reportmanage" */ '../views/ReportManage.vue'),
        meta: {
          login: true,
          admin: true,
          title: '評論管理 - Recook'
        }
      },
      {
        path: '/postmanage',
        name: 'PostManage',
        component: () => import(/* webpackChunkName: "postmanage" */ '../views/PostManage.vue'),
        meta: {
          login: true,
          admin: true,
          title: '文章管理 - Recook'
        }
      },
      {
        path: '/productmanage',
        name: 'ProductManage',
        component: () => import(/* webpackChunkName: "productmanage" */ '../views/ProductManage.vue'),
        meta: {
          login: true,
          admin: true,
          title: '商品管理 - Recook'
        }
      },
      {
        path: '/ordermanage',
        name: 'OrderManage',
        component: () => import(/* webpackChunkName: "ordermanage" */ '../views/OrderManage.vue'),
        meta: {
          login: true,
          admin: true,
          title: '商品管理 - Recook'
        }
      }
    ]
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import(/* webpackChunkName: "recipes" */ '../views/Recipes.vue'),
    meta: {
      title: '探索食譜 - Recook'
    }
  },
  {
    path: '/posts',
    name: 'Posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "posts" */ '../views/Posts.vue'),
    meta: {
      title: '料理文章 - Recook'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
    meta: {
      title: '主廚市集 - Recook'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      login: true,
      title: '購物車 - Recook'
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue'),
    meta: {
      login: true,
      title: '結帳 - Recook'
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../views/Orders.vue'),
    meta: {
      login: true,
      title: '我的訂單 - Recook'
    }
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import(/* webpackChunkName: "questions" */ '../views/Questions.vue'),
    meta: {
      title: '常見問題 - Recook'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && store.state.user.account.length === 0) {
    next('/login')
  } else if (to.meta.admin && store.state.user.role !== 1) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
