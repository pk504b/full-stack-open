const getUser = () => { 
  return window.localStorage.getItem("bloglist-user")
}
const saveUser = (user) => {
  window.localStorage.setItem("bloglist-user", user)
}
const removeUser = () => {
  window.localStorage.removeItem("bloglist-user")
}

export default { getUser, saveUser, removeUser }