import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface LoginRes {
  token?: string;
  id: string;
  userAvatar?: string;
  userName?: string;
  userProfile?: string;
  userRole: string;
  phone: string;
  email: string;
  createTime: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/user/menu');
}
