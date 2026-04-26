const loginWith = async (page, username, password) => {
  const loginForm = page.locator('form')
  await loginForm.getByLabel('username').fill(username)
  await loginForm.getByLabel('password').fill(password)
  await loginForm.locator('button', { hasText: 'Login' }).click()
}

const showFormAndAddBlog = async (page, title, author, url) => {
  const formToggleBtn = page.locator('button', { hasText: 'add new blog' })
  await formToggleBtn.click()
  const addBlogForm = page.locator('form')
  await addBlogForm.getByLabel('title').fill(title)
  await addBlogForm.getByLabel('author').fill(author)
  await addBlogForm.getByLabel('url').fill(url)
  await addBlogForm.locator('button', { hasText: 'add' }).click()
}

export { loginWith, showFormAndAddBlog }