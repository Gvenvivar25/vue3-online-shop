import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false
    },
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/AdminMain.vue'),
    redirect: '/admin/products',
    meta: {
      layout: 'admin',
      auth: true
    },
    children: [{
      path: 'products',
      name: 'AdminProducts',
      component: () => import('../views/admin/ProductList.vue'),
      meta: {
        layout: 'admin',
        auth: true
      }
    },
      {
        path: 'products/:id',
        name: 'CategoryEdit',
        component: () => import('../views/admin/ProductEdit.vue'),
        meta: {
          layout: 'admin',
          auth: true
        },
        props: true
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/Categories.vue'),
        meta: {
          layout: 'admin',
          auth: true
        }
      },
      {
        path: 'categories/:id',
        name: 'CategoryEdit',
        component: () => import('../views/admin/CategoryEdit.vue'),
        meta: {
          layout: 'admin',
          auth: true
        },
        props: true
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  if(requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if(requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
