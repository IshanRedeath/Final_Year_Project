import { apiAxios } from './base';

export function getUsers(options) {
  return apiAxios.get('/users', options);
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
