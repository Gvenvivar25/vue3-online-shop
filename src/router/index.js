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
      role: 'customer'

    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth',
      auth: false,
      role: 'customer'
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
    meta: {
      layout: 'main',
      auth: false,
      role: 'customer'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
    meta: {
      layout: 'main',
      auth: false,
      role: 'customer'
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
      role: 'customer'
    },
    children: [{
      path: 'main',
      name: 'AccountMainPage',
      component: () => import('../views/account/Account.vue'),
      meta: {
        layout: 'main',
        auth: false,
        role: 'customer'
      }
    },
      {
        path: 'personal',
        name: 'PersonalData',
        component: () => import('../views/account/PersonalData.vue'),
        meta: {
          layout: 'main',
          auth: true,
          role: 'customer'
        }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/account/Orders.vue'),
        meta: {
          layout: 'main',
          auth: true,
          role: 'customer'
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
      role: 'admin'
    },
    children: [{
      path: 'products',
      name: 'AdminProducts',
      component: () => import('../views/admin/ProductList.vue'),
      meta: {
        layout: 'admin',
        auth: true,
        role: 'admin'
      }
    },
      {
        path: 'products/:id',
        name: 'ProductEdit',
        component: () => import('../views/admin/ProductEdit.vue'),
        meta: {
          layout: 'admin',
          auth: true,
          role: 'admin'
        },

      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/admin/Categories.vue'),
        meta: {
          layout: 'admin',
          auth: true,
          role: 'admin'
        }
      },
      {
        path: 'categories/:id',
        name: 'CategoryEdit',
        component: () => import('../views/admin/CategoryEdit.vue'),
        meta: {
          layout: 'admin',
          auth: true,
          role: 'admin'
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
          role: 'admin'
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
  console.log(store.getters['auth/role'])

  if(requireAuth && store.getters['auth/isAuthenticated']) {
    if(to.meta.role === store.getters['auth/role'] || store.getters['auth/role'] === 'admin') {
      next()
    } else {
      next('/auth?message=auth')
    }

  } else if(requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next()
  }
})

export default router
