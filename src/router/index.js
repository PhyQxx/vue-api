import Vue from 'vue'
import Router from 'vue-router'
import Garbage from '@/view/Garbage.vue'
import Content2 from '@/view/Content2.vue'
import Add from '@/view/Add.vue'
import Edit from '@/view/Edit.vue'
import Editv from '@/view/Editv.vue'
import Markdown from '@/view/Markdown.vue'
import Editor from '@/view/Editor.vue'
import Nav from '@/view/Nav.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/garbage',
      name: 'Garbage',
      component: Garbage
    },
    {
      path: '/content2',
      name: 'Content2',
      component: Content2
    },
    {
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/editv',
      name: 'Editv',
      component: Editv
    },
    {
      path: '/markdown',
      name: 'Markdown',
      component: Markdown
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/',
      name: 'Nav',
      component: Nav
    },

  ]
})
