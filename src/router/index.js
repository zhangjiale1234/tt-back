import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login.vue'
import Index from '@/pages/index.vue'
import Welcome from '@/pages/welcome.vue'
import addPost from '@/pages/addPost.vue'
import userManagement from '@/pages/userManagement.vue'
import editPost from '@/pages/editPost.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: { name: 'Welcome' },
    children: [
      {
        name: 'Welcome',
        path: 'wel',
        component: Welcome
      },
      {
        name: 'addPost',
        path: 'addpost',
        component: addPost
      },
      {
        name: 'userManagement',
        path: 'usermanagement',
        component: userManagement
      },
      {
        name: 'editPost',
        path: 'editpost',
        component: editPost
      }

    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to和from都是路由实例
  // to：即将跳转到的路由
  // from：现在的要离开的路由
  // next：函数
  // 如果未登录，就跳到登录页，如果登录了，选择哪个页面跳到哪个页面；如果登录了还去了login页面，就跳到首页。
  console.log(to)
  console.log(from)
  const HAS_LOGIN = localStorage.getItem('token')
  // 添加导航守卫
  if (to.name !== 'Login') {
    if (HAS_LOGIN) next()
    else next({ name: 'Login' })
  } else {
    if (HAS_LOGIN) next({ name: 'Index' })
    else next()
  }
})
export default router
