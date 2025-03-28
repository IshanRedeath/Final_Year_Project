import { apiAxios } from './base';

export function getUsers(query, options) {
  return apiAxios.get(`/users${query ? '?' + query : ''}`, options);
}
export function getOneUser(id, options) {
  return apiAxios.get(`/users/${id}`, options);
}
export function deleteUser(id, options) {
  return apiAxios.delete(`/users/${id}`, options);
}

export function createUser(options) {
  return apiAxios.post('/users', options);
}
export function updateUser(id, data, options) {
  return apiAxios.put(`/users/${id}`, data, options);
}
export function patchUser(id, data, options) {
  return apiAxios.patch(`/users/${id}`, data, options);
}
export function getRolesNames(options) {
  return apiAxios.get('/roles/names', options);
}

export function getEmployees(options) {
  return apiAxios.get('/employees', options);
}

export function getEmployeeIds(options) {
  return apiAxios.get('/employees/active', options);
}
export function getUserView(url, options) {
  return apiAxios.get(`/users/view?${url}`, options);
}
