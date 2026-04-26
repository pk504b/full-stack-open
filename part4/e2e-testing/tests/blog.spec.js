const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginForm = page.locator('form')
    const loginButton = page.locator('button')
    await expect(loginForm).toBeVisible()
    await expect(loginButton).toHaveText('Login')
  })
})