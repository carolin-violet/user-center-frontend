import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface LoginRes {
  token: string;
  id: string;
  userAvatar: string;
  userName: string;
  userProfile: string;
  userRole: string;
  phone: string;
  email: string;
  createTime: string;
}

export interface DeleteData {
  id: string;
}

export interface UserQueryRequest {
  id: string;
  userName?: string;
  userProfile?: string;
  userRole: string;
}

/**
 * 登录
 * @param data
 * @returns
 */
export function login(data: LoginData) {
  return axios.post<Partial<LoginRes>>('/user/login', data);
}

/**
 * 退出登录
 * @returns
 */
export function logout() {
  return axios.post<Partial<LoginRes>>('/user/logout');
}

/**
 * 获取当前登录用户信息
 * @returns
 */
export function getUserInfo() {
  return axios.get<Partial<UserState>>('/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/user/menu');
}

/**
 * 删除用户
 * @param data
 * @returns
 */
export function deleteUser(data: DeleteData) {
  return axios.post<boolean>('/user/delete', data);
}

/**
 * 更新用户信息
 * @param data
 * @returns
 */
export function updateUser(data: UserState) {
  return axios.post<Partial<UserState>>('/user/update', data);
}

/**
 * 更新用户密码
 * @param data
 * @returns
 */
export function updateUserPassword(data: UserState) {
  return axios.post<Partial<UserState>>('/user/edit/password', data);
}

/**
 * 添加用户信息
 * @param data
 * @returns
 */
export function addUser(data: UserState) {
  return axios.post<Partial<UserState>>('/user/add', data);
}

/**
 * 根据id获取用户详情
 * @param userId
 * @returns
 */
export function getUserById(userId: string) {
  return axios.get<Partial<UserState>>('/user/get', {
    params: {
      id: userId,
    },
  });
}

/**
 * 分页查询用户信息
 * @param data
 * @returns
 */
export function listUserByPage(data: UserQueryRequest) {
  return axios.post<Partial<UserState>[]>('/user/list/page', data);
}
