const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'User 1',
        username: 'user1',
        password: 'password1'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.locator('form')
    const loginButton = page.locator('button')
    await expect(loginForm).toBeVisible()
    await expect(loginButton).toHaveText('Login')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const loginForm = page.locator('form')
      await loginForm.getByLabel('username').fill('user1')
      await loginForm.getByLabel('password').fill('password1')
      await loginForm.locator('button', { hasText: 'Login' }).click()
      await expect(page.getByText('Logged in as user1', { exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const loginForm = page.locator('form')
      await loginForm.getByLabel('username').fill('user1')
      await loginForm.getByLabel('password').fill('wrongpassword')
      await loginForm.locator('button', { hasText: 'Login' }).click()
      await expect(page.getByRole('heading', { name: 'blogs' })).not.toBeVisible()
    })
  })

  describe('when logged in', () => {  
    beforeEach(async ({ page }) => {
      const loginForm = page.locator('form')
      await loginForm.getByLabel('username').fill('user1')
      await loginForm.getByLabel('password').fill('password1')
      await loginForm.locator('button', { hasText: 'Login' }).click()
    })
    test('add blog succeeds with correct data', async ({ page }) => {
      const formToggleBtn = page.locator('button', { hasText: 'add new blog' })
      await formToggleBtn.click()
      const addBlogForm = page.locator('form')
      await addBlogForm.getByLabel('title').fill('Blog 1')
      await addBlogForm.getByLabel('author').fill('Author 1')
      await addBlogForm.getByLabel('url').fill('https://example.com')
      await addBlogForm.locator('button', { hasText: 'add' }).click()
      await expect(page.getByText('Added Blog 1', { exact: true })).toBeVisible()
      await expect(page.getByText('Blog 1 Author 1')).toBeVisible()
    })
  })
})