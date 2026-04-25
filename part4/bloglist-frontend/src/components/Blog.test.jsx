import { render, screen } from "@testing-library/react"
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
})

