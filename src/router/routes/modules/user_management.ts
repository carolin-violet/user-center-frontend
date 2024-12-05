import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER_MANAGEMENT: AppRouteRecordRaw = {
  path: '/user_management',
  name: 'userManagement',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user_management',
    requiresAuth: true,
    icon: 'icon-list',
    order: 3,
  },
  children: [
    {
      path: 'search-table', // The midline path complies with SEO specifications
      name: 'SearchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        locale: 'menu.user_list',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default USER_MANAGEMENT;
