import { combineReducers } from 'redux'
import {
  POST_ALL_CATEGORIES,
  POST_POSTS,
  POST_POST_DETAIL,
  POST_COMMENTS
} from '../actions/action'

// let initialCategories = getAllCategories().then(value => {
//   console.log(value)
//   let initialCategories = value
//   return initialCategories
// })
// console.log(initialCategories)

function categories (state = [], action) {
  switch (action.type) {
    case POST_ALL_CATEGORIES :
      const { categories } = action
      return categories //an array
    default :
      return state
  }
}

function posts (state = {}, action){
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

function postDetail (state = {}, action){
  switch (action.type) {
    case POST_POST_DETAIL:
      const { postDetail } = action
      state = postDetail
      return state
    default:
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case POST_COMMENTS :
      const { comments } = action
      return comments //an array
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  postDetail,
  comments
})
