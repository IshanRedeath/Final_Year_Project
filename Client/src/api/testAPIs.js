import { apiFetch, apiAxios } from './base';
// export function getPosts(options) {
//   return apiFetch('/posts', options);
// }
// export function getPostsUsingAxios(options) {
//   return apiAxios.get('/posts', options);
// }

export function getUsersUsingAxios(options) {
  return apiAxios.get('/users', options);
}
