import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER_MANAGEMENT: AppRouteRecordRaw = {
  path: '/user_management',
  name: 'UserManagement',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user_management',
    requiresAuth: true,
    icon: 'icon-list',
    order: 3,
  },
  children: [
    {
      path: 'user_list', // The midline path complies with SEO specifications
      name: 'UserList',
      component: () => import('@/views/user_management/user_list/index.vue'),
      meta: {
        locale: 'menu.user_list',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default USER_MANAGEMENT;
