import { fireEvent, render, screen } from "@testing-library/react";
import TextField, { Props } from "./index";
import styles from "./styles.module.css";

let inputElement: HTMLElement;

const renderTextField = (props: Props) => {
  render(<TextField {...props} placeholder="Enter text" />);
  inputElement = screen.getByPlaceholderText("Enter text");
};

describe("TextField component", () => {
  it("renders the TextField", () => {
    renderTextField({});
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.className).toContain(styles.input);
  });

  it("renders startAdornment", () => {
    renderTextField({
      startAdornment: <span>Start</span>,
    });
    const startAdornment = screen.getByText("Start");
    expect(startAdornment).toBeInTheDocument();
  });

  it("renders endAdornment", () => {
    renderTextField({
      endAdornment: <span>End</span>,
    });
    const endAdornment = screen.getByText("End");
    expect(endAdornment).toBeInTheDocument();
  });

  it("renders start and end adornments", () => {
    renderTextField({
      startAdornment: <span>Start</span>,
      endAdornment: <span>End</span>,
    });
    const startAdornment = screen.getByText("Start");
    const endAdornment = screen.getByText("End");
    expect(startAdornment).toBeInTheDocument();
    expect(endAdornment).toBeInTheDocument();
  });

  it("accepts and displays a value", () => {
    renderTextField({ value: "Test value", readOnly: true });
    inputElement = screen.getByDisplayValue("Test value");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onChange handler", () => {
    const handleChange = vi.fn();
    renderTextField({ onChange: handleChange });
    fireEvent.change(inputElement, { target: { value: "New text" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies additional classnames", () => {
    renderTextField({
      className: "additionalClass",
    });
    expect(inputElement).toHaveClass("additionalClass");
  });
});
