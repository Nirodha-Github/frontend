import { createRouter, createWebHistory } from 'vue-router';
import Customers from '../components/NewCustomer.vue'; 
import Projects from '../components/NewProject.vue';
import EditProject from '../components/EditProject.vue';

const routes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/project/:id',
    name: 'EditProject',
    component: EditProject,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
