export const POST_ALL_CATEGORIES = 'POST_ALL_CATEGORIES' //post to redux

export const POST_POSTS = 'POST_POSTS'

export function postAllCategories (data) {
  //push the categories into redux category state
  return {
    type: POST_ALL_CATEGORIES,
    categories: data
  }
}

export function postPosts (data) {
  //update redux state.post(an object of posts)
  return {
    type: POST_POSTS,
    posts: data
  }
}
