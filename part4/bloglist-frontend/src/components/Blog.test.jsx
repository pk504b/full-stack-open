import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import { test } from "vitest"

const testBlog = {
  id: 1,
  title: "test title",
  author: "test author",
  url: "https://testurl.com",
  likes: 0,
  user: {
    id: 1,
    username: "testusername",
    name: "test user"
  }
}

describe("Blog", () => {
  test("should render title and author only", () => {
    render(<Blog blog={testBlog} />)
    expect(screen.getByText("test title", { exact: false })).toBeDefined()
    expect(screen.getByText("test author", { exact: false })).toBeDefined()
    expect(screen.queryByText("https://testurl.com", { exact: false })).toBeNull()
    expect(screen.queryByText("0 likes", { exact: false })).toBeNull()
    expect(screen.queryByText("test user", { exact: false })).toBeNull()
  })
  test("should render also url, likes, username when expanded", async () => {
    render(<Blog blog={testBlog}  />)

    const expandButton = screen.getByText("show")
    await userEvent.click(expandButton)

    expect(screen.getByText("test title", { exact: false })).toBeDefined()
    expect(screen.getByText("test author", { exact: false })).toBeDefined()
    expect(screen.getByText("https://testurl.com", { exact: false })).toBeDefined()
    expect(screen.getByText("0 likes", { exact: false })).toBeDefined()
    expect(screen.getByText("test user", { exact: false })).toBeDefined()
  })
  test("clicking on like button should call incrementLike", async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={testBlog} incrementLike={mockHandler} />)
    // Expand blog
    const expandButton = screen.getByText("show")
    await userEvent.click(expandButton)
    // Test liking
    const user = userEvent.setup()
    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

