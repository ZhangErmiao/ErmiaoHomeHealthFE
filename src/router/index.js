import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import About from '@/components/About'
import Help from '@/components/Help'
import Set from '@/components/Set'
import Member from '@/components/Member'
import Registered from '@/components/Registered'
import HeartTest from '@/components/HeartTest'
// import {ls} from '../store/pageStore.js'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/set',
      name: 'Set',
      component: Set
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/heartTest',
      name: 'HeartTest',
      component: HeartTest
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/' || to.path === '/registered') {
    next()
  } else {
    let user = localStorage.getItem('Authorization')
    let time = localStorage.getItem('userTime')
    let nowDate = new Date()
    let nowTime = nowDate.getTime()
    // console.log(time)
    // console.log(nowTime)
    if (user && nowTime < time) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
