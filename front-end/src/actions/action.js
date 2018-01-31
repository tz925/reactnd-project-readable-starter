export const POST_ALL_CATEGORIES = 'POST_ALL_CATEGORIES' //post to redux
export const POST_POST_DETAIL = 'POST_POST_DETAIL'
export const POST_POSTS = 'POST_POSTS'
export const POST_COMMENTS = 'POST_COMMENTS'

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
