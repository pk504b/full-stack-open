import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { expect, test, vi, beforeEach, describe } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const testBlogs = [
  {
    id: "1",
    title: "test title",
    author: "test author",
    url: "https://testurl.com",
    likes: 0,
    user: {
      id: "1",
      username: "testusername",
      name: "test user 1",
    },
  },
  {
    id: "2",
    title: "test title 2",
    author: "test author 2",
    url: "https://testurl2.com",
    likes: 0,
    user: {
      id: "2",
      username: "testusername2",
      name: "test user 2",
    },
  },
];

describe("Blog", () => {
  let mockIncreaseLike;
  let mockRemoveBlog;

  beforeEach(() => {
    mockIncreaseLike = vi.fn();
    mockRemoveBlog = vi.fn();
  });

  const renderBlog = (user = null) => {
    render(
      <MemoryRouter initialEntries={["/blogs/1"]}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <Blog
                blogs={testBlogs}
                loggedinUser={user}
                increaseLike={mockIncreaseLike}
                removeBlog={mockRemoveBlog}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  };

  test("unauthenticated users see blog info but no buttons", () => {
    renderBlog(null);

    expect(
      screen.getByText("test title", { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("test author", { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("https://testurl.com", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText("0 likes", { exact: false })).toBeInTheDocument();
    expect(
      screen.getByText("test user 1", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  test("authenticated non-creators see only the like button", () => {
    renderBlog(testBlogs[1].user);

    expect(screen.getByRole("button", { name: "like" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "remove" }),
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(1);
  });

  test("blog creators see both like and remove buttons", () => {
    renderBlog(testBlogs[0].user);

    expect(screen.getByRole("button", { name: "like" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "remove" })).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(2);
  });
});
