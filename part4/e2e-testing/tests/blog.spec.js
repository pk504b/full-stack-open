const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, fill, fillFormAndAddBlog } = require('./helpers')

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
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto('http://localhost:5173/login')
    const loginForm = page.locator('form')
    const loginButton = page.locator('button')
    await expect(loginForm).toBeVisible()
    await expect(loginButton).toHaveText('Login')
  })

  describe('Login', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173/login')
    })
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'password1')
      await expect(page).toHaveURL(/.*\//);
      await expect(page.getByText('Logged in as user1', { exact: true })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'user1', 'wrongpassword')
      await expect(page.getByText('invalid username or password', { exact: true })).toBeVisible()
    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'user1', 'password1')
        await expect(page).toHaveURL(/.*\//);
        await expect(page.getByText('Logged in as user1', { exact: true })).toBeVisible()
        await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
      })
      test('add blog succeeds with correct data', async ({ page }) => {
        await page.goto('http://localhost:5173/add')
        await expect(page).toHaveURL(/.*\/add/);
        expect(page.getByText('add blog', { exact: true })).toBeVisible()
        await fillFormAndAddBlog(page, 'Blog 1', 'Author 1', 'https://example.com')
        await expect(page).toHaveURL(/.*\//);
        await expect(page.getByText('Added Blog 1', { exact: true })).toBeVisible()
        await expect(page.getByText('Blog 1 by Author 1')).toBeVisible()
      })
      describe('when added a blog', () => {
        beforeEach(async ({ page }) => {
          await page.goto('http://localhost:5173/add')
          await expect(page).toHaveURL(/.*\/add/);
          expect(page.getByText('add blog', { exact: true })).toBeVisible()
          await fillFormAndAddBlog(page, 'Blog 1', 'Author 1', 'https://example.com')
          await expect(page).toHaveURL(/.*\//);
          await expect(page.getByText('Added Blog 1', { exact: true })).toBeVisible()
          await expect(page.getByText('Blog 1 by Author 1')).toBeVisible()
        })
        test('blog can be liked', async ({ page }) => {
          await page.getByText('Blog 1 by Author 1').click()
          await expect(page).toHaveURL(/.*\/blogs\/*/);
          await expect(page.getByText('Blog 1 by Author 1')).toBeVisible()
          await expect(page.getByText('0 likes')).toBeVisible()
          await page.locator('button', { hasText: 'like' }).click()
          await expect(page.getByText('1 likes')).toBeVisible()
        })
        test('blog can be removed', async ({ page }) => {
          page.once('dialog', dialog => dialog.accept());

          await page.getByText('Blog 1 by Author 1').click()
          await expect(page).toHaveURL(/.*\/blogs\/*/);
          await expect(page.getByText('Blog 1 by Author 1')).toBeVisible()
          await page.locator('button', { hasText: 'remove' }).click()
          await expect(page).toHaveURL(/.*\//);
          await expect(page.getByText('Blog 1 by Author 1')).not.toBeVisible()
        })
      })
    })
  })
})