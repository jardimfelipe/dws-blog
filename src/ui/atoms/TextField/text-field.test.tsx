import { fireEvent, render, screen } from "@testing-library/react";
import TextField from "./index";
import styles from "./styles.module.css";

it("renders the TextField", () => {
  render(<TextField placeholder="Enter text" />);

  const inputElement = screen.getByPlaceholderText("Enter text");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.className).toContain(styles.input);
});

it("renders startAdornment", () => {
  render(
    <TextField startAdornment={<span>Start</span>} placeholder="Enter text" />
  );

  const startAdornment = screen.getByText("Start");
  expect(startAdornment).toBeInTheDocument();
});

it("renders endAdornment", () => {
  render(
    <TextField endAdornment={<span>End</span>} placeholder="Enter text" />
  );

  const endAdornment = screen.getByText("End");
  expect(endAdornment).toBeInTheDocument();
});

it("renders start and end adornments", () => {
  render(
    <TextField
      startAdornment={<span>Start</span>}
      endAdornment={<span>End</span>}
      placeholder="Enter text"
    />
  );

  const startAdornment = screen.getByText("Start");
  const endAdornment = screen.getByText("End");

  expect(startAdornment).toBeInTheDocument();
  expect(endAdornment).toBeInTheDocument();
});

it("accepts and displays a value", () => {
  render(<TextField value="Test value" readOnly />);

  const inputElement = screen.getByDisplayValue("Test value");
  expect(inputElement).toBeInTheDocument();
});

it("should call the onChange handler", () => {
  const handleChange = vi.fn();
  render(<TextField onChange={handleChange} placeholder="Enter text" />);

  const inputElement = screen.getByPlaceholderText("Enter text");
  fireEvent.change(inputElement, { target: { value: "New text" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});

it("applies additional classnames", () => {
  render(<TextField className="additionalClass" placeholder="Enter text" />);

  const inputElement = screen.getByPlaceholderText("Enter text");
  expect(inputElement).toHaveClass("additionalClass");
});
