export const dayPast = (start) => {
  let day = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24))
  return `${day} days ago`
}
export const uuid = () => {return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);}
