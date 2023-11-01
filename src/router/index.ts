import FilesTable from '@/components/filesTable/FilesTable.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'filesTable',
      component: FilesTable
    }
  ]
});

export default router;
