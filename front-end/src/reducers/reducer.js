import { combineReducers } from 'redux'
import {POST_ALL_CATEGORIES} from '../actions/action'
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

export default combineReducers({
  category
})
