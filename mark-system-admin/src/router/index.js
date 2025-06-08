import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/layout/login/index.vue'
import Main from '@/layout/main/index.vue'
import User from '@/layout/main/content/user'
import Reply from '@/layout/main/content/reply'
import Message from '@/layout/main/content/message'
import Research from '@/layout/main/content/research'
import Mark from '@/layout/main/content/mark'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'Login',
    component:Login
  },
  {
    path:'/main',
    name:'Main',
    component:Main,
    redirect:'/main/user',
    children:[
      {
        path:'user',
        name:'User',
        component:User
      },
      {
        path:'reply',
        name:'Reply',
        component:Reply
      },
      {
        path:'message',
        name:'Messager',
        component:Message
      },
      {
        path:'research',
        name:'Research',
        component:Research
      },
      {
        path:'mark',
        name:'Mark',
        component:Mark
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
