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
    order: 2,
    roles: ['admin'],
  },
  children: [
    {
      path: 'user_list',
      name: 'UserList',
      component: () => import('@/views/user_management/user_list/index.vue'),
      meta: {
        locale: 'menu.user_list',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'user_add',
      name: 'UserAdd',
      component: () => import('@/views/user_management/user_detail/index.vue'),
      meta: {
        locale: 'menu.user_add',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'user_edit',
      name: 'UserEdit',
      component: () => import('@/views/user_management/user_detail/index.vue'),
      meta: {
        locale: 'menu.user_edit',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default USER_MANAGEMENT;
