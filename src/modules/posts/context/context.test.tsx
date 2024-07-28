import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostsContextProvider, PostContext } from ".";

vi.mock("../../src/modules/posts/services/usePostsQuery", () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock("react-router-dom", () => ({
  useSearchParams: () => [new URLSearchParams()],
}));
vi.mock("../components/PostListSkeleton", () => ({
  default: () => <div data-testid="skeleton">Loading...</div>,
}));

vi.mock("../components/PostListError", () => ({
  default: () => <div data-testid="error">Error</div>,
}));

const queryClient = new QueryClient();
const mockedUsePostsQuery = vi.fn();

const renderWithProvider = (children: ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <PostsContextProvider>{children}</PostsContextProvider>
    </QueryClientProvider>
  );
};

const TestConsumer = () => (
  <PostContext.Consumer>
    {(posts) => (
      <div data-testid="posts-output">
        {posts.length ? "Posts found" : "No posts"}
      </div>
    )}
  </PostContext.Consumer>
);

describe("PostsContextProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading state initially", () => {
    mockedUsePostsQuery.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    renderWithProvider(<TestConsumer />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByText("Posts found")).not.toBeInTheDocument();
  });

  it("should show error state if query fails", async () => {
    mockedUsePostsQuery.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    renderWithProvider(<TestConsumer />);

    expect(screen.queryByText("Posts found")).not.toBeInTheDocument();
    expect(screen.getByTestId("error")).toBeInTheDocument();
  });

  it("should show filtered posts when data is available", async () => {
    mockedUsePostsQuery.mockReturnValue({
      data: [
        {
          id: "1",
          title: "Post 1",
          content: "Content 1",
          thumbnail_url: "",
          author: "Author 1",
          category: "Category 1",
        },
      ],
      isLoading: false,
      isError: false,
    });

    renderWithProvider(<TestConsumer />);

    expect(await screen.findByText("Posts found")).toBeInTheDocument();
  });
});
