export const POST_ALL_CATEGORIES = 'POST_ALL_CATEGORIES'

export function postAllCategories (data) {
  //push the categories into redux category state
  return {
    type: POST_ALL_CATEGORIES,
    categories: data
  }
}
