import { render, screen } from "@testing-library/react";

import Card from "./index";
import styles from "./styles.module.css";

describe("Card Component", () => {
  it("renders the container", () => {
    render(
      <Card.Container>
        <Card.Content>
          <Card.Title>Test Title</Card.Title>
          <Card.Description>Test Description</Card.Description>
        </Card.Content>
      </Card.Container>
    );
    const container =
      screen.getByText("Test Title").parentElement?.parentElement;
    expect(container).toHaveClass(styles.container);
  });

  it("renders the image", () => {
    render(
      <Card.Container>
        <Card.Image src="https://via.placeholder.com/150" alt="Test Image" />
      </Card.Container>
    );
    const image = screen.getByAltText("Test Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://via.placeholder.com/150");
  });

  it("renders the content", () => {
    render(
      <Card.Container>
        <Card.Content>
          <Card.Title>Test Title</Card.Title>
          <Card.Description>Test Description</Card.Description>
        </Card.Content>
      </Card.Container>
    );
    const content = screen.getByText("Test Title").parentElement;
    expect(content).toHaveClass(styles.content);
  });

  it("renders the title", () => {
    render(
      <Card.Container>
        <Card.Content>
          <Card.Title>Test Title</Card.Title>
        </Card.Content>
      </Card.Container>
    );
    const title = screen.getByText("Test Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(styles.title);
  });

  it("renders the description", () => {
    render(
      <Card.Container>
        <Card.Content>
          <Card.Description>Test Description</Card.Description>
        </Card.Content>
      </Card.Container>
    );
    const description = screen.getByText("Test Description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass(styles.description);
  });

  it("renders the footer", () => {
    render(
      <Card.Container>
        <Card.Footer>
          <button>Action 1</button>
          <button>Action 2</button>
        </Card.Footer>
      </Card.Container>
    );
    const footer = screen.getByText("Action 1").parentElement;
    expect(footer).toHaveClass(styles.footer);
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });
});
