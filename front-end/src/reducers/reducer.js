import { combineReducers } from 'redux'
import {
  POST_ALL_CATEGORIES,
  POST_POSTS} from '../actions/action'

// let initialCategories = getAllCategories().then(value => {
//   console.log(value)
//   let initialCategories = value
//   return initialCategories
// })
// console.log(initialCategories)

function category (state = [], action) {
  switch (action.type) {
    case POST_ALL_CATEGORIES :
      const { categories } = action
      return categories //an array
    default :
      return state
  }
}

function post (state = {}, action){
  switch (action.type) {
    case POST_POSTS:
      state = {}
      const { posts } = action
      posts.map(post => {
        let id = post.id
        state[id] = post
        return null
      })
      return state
    default:
      return state
  }
}

export default combineReducers({
  category,
  post
})
