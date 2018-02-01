export const POST_ALL_CATEGORIES = 'POST_ALL_CATEGORIES' //post to redux
export const POST_POST_DETAIL = 'POST_POST_DETAIL'
export const POST_POSTS = 'POST_POSTS'
export const POST_COMMENTS = 'POST_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_POST = 'ADD_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_POST = 'DELETE_POST'

export function postAllCategories (categories) {
  //push the categories into redux category state
  return {
    type: POST_ALL_CATEGORIES,
    categories: categories
  }
}

export function postPosts (posts) {
  //update redux state.post(an object of posts)
  return {
    type: POST_POSTS,
    posts: posts
  }
}

export function postPostDetail (postDetail) {
  return {
    type: POST_POST_DETAIL,
    postDetail: postDetail
  }
}

export function postComments (comments) {
  return {
    type: POST_COMMENTS,
    comments: comments
  }
}

export function commentEdit (commentBody) {
  return {
    type: EDIT_COMMENT,
    commentBody: commentBody
  }
}
//use to both update and add
export function addComment (comment){
  return{
    type: ADD_COMMENT,
    comment: comment
  }
}

export function addPost (post){
  return{
    type: ADD_POST,
    post: post
  }
}

export function deleteComment (comment){
  return{
    type: DELETE_COMMENT,
    comment: comment
  }
}

export function deletePost (post){
  return{
    type: DELETE_POST,
    post: post
  }
}
