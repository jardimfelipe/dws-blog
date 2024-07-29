import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
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
      createdAt: "2024-07-25T16:19:30.419Z",
      thumbnail_url: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      title: "Post 2",
      categories: [{ id: "cat2", name: "Category 2" }],
      author: { id: "auth2", name: "Author 2" },
      content: "Content 2",
      thumbnail_url: "https://via.placeholder.com/150",
      createdAt: "2024-03-21T12:19:30.419Z",
    },
    {
      id: "3",
      title: "Post 3",
      categories: [{ id: "cat3", name: "Category 3" }],
      author: { id: "auth1", name: "Author 2" },
      content: "Content 3",
      createdAt: "2023-07-25T16:20:30.419Z",
      thumbnail_url: "https://via.placeholder.com/150",
    },
  ];

  const authors = [
    { id: "auth1", name: "Author 1" },
    { id: "auth2", name: "Author 2" },
  ];

  const categories = [
    { id: "cat1", name: "Category 1" },
    { id: "cat2", name: "Category 2" },
    { id: "cat3", name: "Category 3" },
  ];

  test.beforeEach(async ({ page }) => {
    await page.route(
      "https://tech-test-backend.dwsbrazil.io/posts",
      async (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(posts),
        });
      }
    );

    await page.route(
      "https://tech-test-backend.dwsbrazil.io/authors",
      async (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(authors),
        });
      }
    );

    await page.route(
      "https://tech-test-backend.dwsbrazil.io/categories",
      async (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(categories),
        });
      }
    );
    await page.goto("http://localhost:5173");
  });

  test("select a post from the autocomplete", async ({ page }) => {
    await page.getByPlaceholder("Search").fill("Post 1");
    const suggestions = page.getByRole("option");
    await suggestions.first().click();
    await expect(page).toHaveURL("http://localhost:5173/posts/1");
  });

  test("select a post from autocomplete using the keyboard", async ({
    page,
  }) => {
    const input = page.getByPlaceholder("Search");
    await input.fill("Post 1");
    await input.press("ArrowDown");
    await page.getByRole("option").first().press("Enter");
    await expect(page).toHaveURL("http://localhost:5173/posts/1");
  });

  test("filter posts by category", async ({ page }) => {
    await page.getByRole("link", { name: categories[0].name }).click();
    const visiblePosts = await page.locator("[data-testid=post]").count();
    expect(visiblePosts).toBe(1);
  });

  test("filter posts by author", async ({ page }) => {
    await page.getByRole("link", { name: authors[1].name }).click();
    const visiblePosts = await page.locator("[data-testid=post]").count();
    expect(visiblePosts).toBe(1);
  });

  test("filter posts by category and author", async ({ page }) => {
    await page.getByRole("link", { name: categories[2].name }).click();
    await page.getByRole("link", { name: authors[0].name }).click();
    const visiblePosts = await page.locator("[data-testid=post]").count();
    expect(visiblePosts).toBe(1);
  });

  test("order posts by createdAt in descending order", async ({ page }) => {
    await page.getByRole("button", { name: "Newest first" }).click();

    await expect(
      page.getByRole("button", { name: "Oldest first" })
    ).toBeVisible();

    const postDates = await page
      .getByRole("time")
      .evaluateAll((elements) =>
        elements.map((element) =>
          new Date(element.textContent as string).getTime()
        )
      );
    const isSorted = postDates.every(
      (date, i, array) => !i || array[i - 1] <= date
    );
    expect(isSorted).toBe(true);
  });
});
