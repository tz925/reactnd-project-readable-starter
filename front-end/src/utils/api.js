const url = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
export const getAllCategories = () => {
  return fetch(`${url}/categories`, {
    method: 'GET', headers })
    .then(res => res.json())
    .then(data => data.categories)
}

export const getCategoryPosts = (category) => {
  return fetch(`${url}/${category}/posts`, {
    method: 'GET', headers })
    .then(res => res.json())
}

export const getAllPosts = () => {
  return fetch(`${url}/posts`, {
    method: 'GET', headers })
    .then(res => res.json())
}

export const getPostDetail = (id) => {
  return fetch(`${url}/posts/${id}`, {
    method: 'GET', headers })
    .then(res => res.json())
}

export const getComments = (id) => {
  return fetch(`${url}/posts/${id}/comments`, {
    method: 'GET', headers })
    .then(res => res.json())
}

export const getCommentDetail = (id) => {
  return fetch(`${url}/comments/${id}`, {
    method: 'GET', headers })
    .then(res => res.json())
}
