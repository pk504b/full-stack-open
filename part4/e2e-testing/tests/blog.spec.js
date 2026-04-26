const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, showFormAndAddBlog } = require('./helpers')

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
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'User 2',
        username: 'user2',
        password: 'password2'
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
      await loginWith(page, 'user1', 'password1')
      await expect(page.getByText('Logged in as user1', { exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'wrongpassword')
      await expect(page.getByRole('heading', { name: 'blogs' })).not.toBeVisible()
    })
  })

  describe('when logged in', () => {  
    beforeEach(async ({ page }) => {
      loginWith(page, 'user1', 'password1')
    })
    test('add blog succeeds with correct data', async ({ page }) => {
      await showFormAndAddBlog(page, 'Blog 1', 'Author 1', 'https://example.com')
      await expect(page.getByText('Added Blog 1', { exact: true })).toBeVisible()
      await expect(page.getByText('Blog 1 Author 1')).toBeVisible()
    })
    describe('when added a blog', () => {
      beforeEach(async ({ page }) => {
        await showFormAndAddBlog(page, 'Blog 1', 'Author 1', 'https://example.com')
      })
      test('it can be liked', async ({ page }) => {
        await page.locator('button', { hasText: 'show' }).click()
        await page.locator('button', { hasText: 'like' }).click()
        await expect(page.getByText('1 likes')).toBeVisible()
      })
      test('it can be removed', async ({ page }) => {
        page.once('dialog', dialog => dialog.accept());

        await page.locator('button', { hasText: 'show' }).click()
        await page.locator('button', { hasText: 'remove' }).click()
        await expect(page.getByText('Blog 1 Author 1')).not.toBeVisible()
      })
      test('remove button is visible only to user who added the blog', async ({ page }) => {
        await page.locator('button', { hasText: 'logout' }).click()
        loginWith(page, 'user2', 'password2')
        await page.locator('button', { hasText: 'show' }).click()
        await expect(page.locator('button', { hasText: 'remove' })).not.toBeVisible()
      })
    })
  })
  describe('blogs are sorted by likes', () => {
    beforeEach(async ({ page }) => {
      // Login
      await loginWith(page, 'user1', 'password1')
      // Add blogs
      await showFormAndAddBlog(page, 'Blog 1', 'Author 1', 'https://example.com')
      await showFormAndAddBlog(page, 'Blog 2', 'Author 2', 'https://example.com')
    })
    test('blogs are sorted by likes', async ({ page }) => {
      const blogs = page.locator('div.blog')
  
      const blog2 = await blogs.nth(1)
      await blog2.getByRole('button', { name: 'show' }).click()
      await blog2.getByRole('button', { name: 'like' }).click()

      await page.waitForTimeout(1000)
  
      expect(blogs.nth(0).getByText('1 likes')).toBeVisible()
      expect((await blogs.nth(0).innerText()).includes('Blog 2 Author 2'))
    })
  })
})