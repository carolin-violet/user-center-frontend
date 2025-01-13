import { PageResponse } from '@/types/global';
import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface UserState {
  token: string;
  id: string;
  userAccount: string;
  userAvatar: string;
  userName: string;
  userProfile: string;
  userRole: string;
  phone: string;
  email: string;
  createTime: string;
  userPassword: string;
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

const prefix: string = import.meta.env.VITE_API_USER_CENTER_PREFIX;
// const prefix: string = import.meta.env.VITE_API_NAVIGATION_PREFIX;

/**
 * 登录
 * @param data
 * @returns
 */
export function login(data: LoginData) {
  return axios.post<Partial<UserState>>(`${prefix}/user/login`, data);
}

/**
 * 注册
 * @param data
 * @returns
 */
export function register(data: Partial<UserState>) {
  return axios.post<number>(`${prefix}/user/register`, data);
}

/**
 * 退出登录
 * @returns
 */
export function logout() {
  return axios.post<Partial<UserState>>(`${prefix}/user/logout`);
}

/**
 * 获取当前登录用户信息
 * @returns
 */
export function getUserInfo() {
  return axios.get<Partial<UserState>>(`${prefix}/user/info`);
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>(`${prefix}/user/menu`);
}

/**
 * 用户更新自己的信息
 * @param data
 * @returns
 */
export function updatePersonalInfo(data: Partial<UserState>) {
  return axios.put<boolean>(`${prefix}/user/update/my`, data);
}

/**
 * 用户更新自己的密码
 * @param data
 * @returns
 */
export function updatePersonalPassword(data: Partial<UserState>) {
  return axios.put<boolean>(`${prefix}/user/edit/password/my`, data);
}

/**
 * 删除用户
 * @param data
 * @returns
 */
export function deleteUser(data: DeleteData) {
  return axios.post<boolean>(`${prefix}/user/delete`, data);
}

/**
 * 更新用户信息
 * @param data
 * @returns
 */
export function updateUser(data: Partial<UserState>) {
  return axios.post<Partial<UserState>>(`${prefix}/user/update`, data);
}

/**
 * 更新用户密码(管理员)
 * @param data
 * @returns
 */
export function updateUserPassword(data: Partial<UserState>) {
  return axios.post<Partial<UserState>>(`${prefix}/user/edit/password`, data);
}

/**
 * 添加用户信息
 * @param data
 * @returns
 */
export function addUser(data: Partial<UserState>) {
  return axios.post<Partial<UserState>>(`${prefix}/user/add`, data);
}

/**
 * 根据id获取用户详情
 * @param userId
 * @returns
 */
export function getUserById(userId: number) {
  return axios.get<Partial<UserState>>(`${prefix}/user/get`, {
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
  return axios.post<PageResponse<UserState>>(`${prefix}/user/list/page`, data);
}
