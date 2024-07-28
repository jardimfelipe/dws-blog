import { describe, it, expect } from "vitest";

import { Post } from "../types";
import { filterPosts } from "./filterPost";

const getFilteredPosts = (
  posts: unknown[],
  params: { categories: string[]; authors: string[] }
): Post[] => {
  return filterPosts(posts as Post[], params);
};

const posts = [
  {
    id: "1",
    title: "Post 1",
    categories: [
      { id: "cat1", name: "Category 1" },
      { id: "cat2", name: "Category 2" },
    ],
    author: { id: "auth1", name: "Author 1" },
    content: "Content 1",
  },
  {
    id: "2",
    title: "Post 2",
    categories: [{ id: "cat2", name: "Category 2" }],
    author: { id: "auth2", name: "Author 2" },
    content: "Content 2",
  },
  {
    id: "3",
    title: "Post 3",
    categories: [{ id: "cat3", name: "Category 3" }],
    author: { id: "auth1", name: "Author 1" },
    content: "Content 3",
  },
];

describe("filterPosts", () => {
  const emptyParams = { categories: [], authors: [] };

  it("filters posts by category", () => {
    const params = {
      categories: ["cat1"],
      authors: [],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("filters posts by author", () => {
    const params = {
      categories: [],
      authors: ["auth2"],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters posts by category and author", () => {
    const params = {
      categories: ["cat2"],
      authors: ["auth2"],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("returns all posts if no category or author is specified", () => {
    const result = getFilteredPosts(posts, emptyParams);
    expect(result).toHaveLength(3);
  });

  it("returns no posts if no post matches the criteria", () => {
    const params = {
      categories: ["cat3"],
      authors: ["auth3"],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(0);
  });

  it("handles empty posts list", () => {
    const result = getFilteredPosts([], emptyParams);
    expect(result).toHaveLength(0);
  });

  it("returns posts that match any of the given categories", () => {
    const params = {
      categories: ["cat2"],
      authors: [],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
  });

  it("returns posts that match any of the given authors", () => {
    const params = {
      categories: [],
      authors: ["auth1"],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("3");
  });

  it("handles multiple categories and authors", () => {
    const params = {
      categories: ["cat1", "cat3"],
      authors: ["auth1"],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("3");
  });

  it("handles case where only some posts match the criteria", () => {
    const params = {
      categories: ["cat2"],
      authors: ["auth1"],
    };
    const result = getFilteredPosts(posts, params);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });
});
