import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface DeleteData {
  id: string;
}

export interface UserQueryRequest {
  id?: string;
  userName?: string;
  userProfile?: string;
  userRole?: string;
  current?: string;
  pageSize?: string;
}

/**
 * 登录
 * @param data
 * @returns
 */
export function login(data: LoginData) {
  return axios.post<Partial<UserState>>('/user/login', data);
}

/**
 * 注册
 * @param data
 * @returns
 */
export function register(data: Partial<UserState>) {
  return axios.post<number>('/user/register', data);
}

/**
 * 退出登录
 * @returns
 */
export function logout() {
  return axios.post<Partial<UserState>>('/user/logout');
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
export function deleteUser(id: number) {
  return axios.delete<boolean>(`/user/delete/${id}`);
}

/**
 * 更新用户信息
 * @param data
 * @returns
 */
export function updateUser(data: UserState) {
  return axios.put<Partial<UserState>>('/user/update', data);
}

/**
 * 更新用户密码(管理员)
 * @param data
 * @returns
 */
export function updateUserPassword(data: UserState) {
  return axios.put<Partial<UserState>>('/user/edit/password', data);
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
  return axios.get<Partial<UserState>>(`/user/get/${userId}`);
}

/**
 * 分页查询用户信息
 * @param data
 * @returns
 */
export function listUserByPage(params: UserQueryRequest) {
  return axios.get<Partial<UserState>[]>('/user/list/page', {
    params,
  });
}

/**
 * 用户更新自己的信息
 * @param data
 * @returns
 */
export function updatePersonalInfo(data: UserState) {
  return axios.put<boolean>('/user/update/my', data);
}

/**
 * 用户更新自己的密码
 * @param data
 * @returns
 */
export function updatePersonalPassword(data: UserState) {
  return axios.put<boolean>('/user/edit/password/my', data);
}
