import { combineReducers } from 'redux'
import {
  POST_ALL_CATEGORIES,
  POST_POSTS,
  POST_POST_DETAIL,
  POST_COMMENTS,
  EDIT_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT
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

function comments (state = {}, action) {
  switch (action.type) {
    case POST_COMMENTS :
      state = {}
      const { comments } = action
      comments.map(comment => {
        let id = comment.id
        state[id] = comment
        return null
      })
      return state
    case ADD_COMMENT : //use to both update and add
      let { comment } = action
      return {
        ...state,
        [comment.id]: comment
      }
    default :
      return state
  }
}

function tempComment (state ='', action){
  switch (action.type) {
    case EDIT_COMMENT :
      const { commentBody } = action
      return commentBody //an array
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  postDetail,
  comments,
  tempComment
})
