import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddBlog from "./AddBlog"
import { test } from "vitest"

describe("Add Blog Form", () => {
  test("should call addBlog with correct data", async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()

    render(<AddBlog addBlog={mockHandler} />)
    // Click `add new blog` button
    await user.click(screen.getByText("add new blog"))
    // Get the form elements
    const titleInput = screen.getByLabelText("title")
    const authorInput = screen.getByLabelText("author")
    const urlInput = screen.getByLabelText("url")
    const sendButton = screen.getByText("add")
    // Fill in the form
    await user.type(titleInput, "Testing React Forms")
    await user.type(authorInput, "John Doe")
    await user.type(urlInput, "http://testing.com")
    // Submit the form
    await user.click(sendButton)

    // Assert the mock was called with the right data
    expect(mockHandler).toHaveBeenCalledTimes(1)
    expect(mockHandler).toHaveBeenCalledWith({
      title: "Testing React Forms",
      author: "John Doe",
      url: "http://testing.com"
    })
  })
})

