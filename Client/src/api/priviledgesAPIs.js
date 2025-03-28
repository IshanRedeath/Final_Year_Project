import { apiAxios } from './base';

export function getPriviledges(query, options) {
  return apiAxios.get(`/priviledges${query ? '?' + query : ''}`, options);
}
export function getOnePriviledge(id, options) {
  return apiAxios.get(`/priviledges/${id}`, options);
}
export function deletePriviledge(id, options) {
  return apiAxios.delete(`/priviledges/${id}`, options);
}

export function createPriviledge(options) {
  return apiAxios.post('/priviledges', options);
}
export function updatePriviledge(id, data, options) {
  return apiAxios.put(`/priviledges/${id}`, data, options);
}
export function getPriviledgeView(url, options) {
  return apiAxios.get(`/priviledges/view?${url}`, options);
}
