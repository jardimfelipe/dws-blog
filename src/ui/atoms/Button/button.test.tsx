import { render, screen, fireEvent } from "@testing-library/react";

import Button from "./index";
import styles from "./styles.module.css";

it("renders the Button with text", () => {
  render(<Button>Click Me</Button>);

  const buttonElement = screen.getByRole("button", { name: /click me/i });
  expect(buttonElement).toBeInTheDocument();
});

it("applies primary variant styles", () => {
  render(<Button variant="primary">Primary Button</Button>);

  const buttonElement = screen.getByRole("button", { name: /primary button/i });
  expect(buttonElement.className).toContain(styles.button);
  expect(buttonElement.className).toContain(styles.primary);
});

it("applies ghost variant styles", () => {
  render(<Button variant="ghost">Ghost Button</Button>);

  const buttonElement = screen.getByRole("button", { name: /ghost button/i });
  expect(buttonElement.className).toContain(styles.button);
  expect(buttonElement.className).toContain(styles.ghost);
});

it("applies link variant styles", () => {
  render(<Button variant="link">Link Button</Button>);

  const buttonElement = screen.getByRole("button", { name: /link button/i });
  expect(buttonElement.className).toContain(styles.button);
  expect(buttonElement.className).toContain(styles.link);
});

it("handles click event", () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  const buttonElement = screen.getByRole("button", { name: /click me/i });
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
