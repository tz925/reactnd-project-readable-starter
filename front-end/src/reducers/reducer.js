import { combineReducers } from 'redux'
import {
  POST_ALL_CATEGORIES,
  POST_POSTS,
  POST_POST_DETAIL,
  POST_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  ADD_POST,
  DELETE_POST,
  DELETE_COMMENT
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
    case ADD_POST :
      let {post} = action
      return {
        ...state,
        [post.id]: post
      }
    case DELETE_POST :
      delete state[action.post.id]
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
    case DELETE_COMMENT :
      delete state[action.comment.id]
      return state
    default :
      return state
  }
}


export default combineReducers({
  categories,
  posts,
  postDetail,
  comments,
})
