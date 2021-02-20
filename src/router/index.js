import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import('../views/Shop.vue'),
    meta: {
      layout: 'main',
      auth: false,

    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false,
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false,
    }
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import('../views/Thanks.vue'),
    meta: {
      layout: 'main',
      auth: true,
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/GateWay.vue'),
    redirect: '/account/main',
    meta: {
      layout: 'main',
      auth: false,
    },
    children: [{
      path: 'main',
      name: 'AccountMainPage',
      component: () => import('../views/account/Account.vue'),
      meta: {
        layout: 'main',
        auth: false,
      }
    },
      {
        path: 'personal',
        name: 'PersonalData',
        component: () => import('../views/account/PersonalData.vue'),
        meta: {
          layout: 'main',
          auth: true,
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/account/Orders.vue'),
        meta: {
          layout: 'main',
          auth: true,
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/GateWay.vue'),
    redirect: '/admin/products',
    meta: {
      layout: 'admin',
      auth: true,
      admin: true
    },
    children: [{
      path: 'products',
      name: 'AdminProducts',
      component: () => import('../views/admin/ProductList.vue'),
      meta: {
        layout: 'admin',
        auth: true,
        admin: true
      }
    },
      {
        path: 'products/:id',
        name: 'ProductEdit',
        component: () => import('../views/admin/ProductEdit.vue'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true
        },
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/Categories.vue'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true
        }
      },
      {
        path: 'categories/:id',
        name: 'CategoryEdit',
        component: () => import('../views/admin/CategoryEdit.vue'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true
        },
        props: true
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/admin/Orders.vue'),
        meta: {
          layout: 'admin',
          auth: true,
          admin: true
        }
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
  const requireAdmin = to.meta.admin

  if(requireAdmin) {
    if(store.getters['auth/isAdmin']) {
      return next()
    } else {
      return next('/auth?message=admin')
    }
  }

  if(requireAuth){
    if(store.getters['auth/isAuthenticated']) {
      return next()
    } else {
      return next('/auth?message=auth')
    }
  }

  next()

})

export default router
