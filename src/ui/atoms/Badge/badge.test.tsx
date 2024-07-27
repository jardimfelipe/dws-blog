import { render, screen } from "@testing-library/react";
import Badge from "./index";
import styles from "./styles.module.css";

let badgeElement: HTMLElement;

const renderBadge = (text = "Badge") => {
  render(<Badge>{text}</Badge>);
  return screen.getByText(text);
};

describe("Badge component", () => {
  beforeEach(() => {
    badgeElement = renderBadge();
  });

  it("renders the Badge component with default text", () => {
    expect(badgeElement).toBeInTheDocument();
  });

  it("applies correct class name", () => {
    expect(badgeElement.className).toContain(styles.container);
  });

  it("renders the Badge component with custom text", () => {
    const customText = "Custom Badge";
    badgeElement = renderBadge(customText);
    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement.textContent).toBe(customText);
  });
});
