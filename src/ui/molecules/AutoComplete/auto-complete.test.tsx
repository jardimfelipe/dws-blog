import { render, screen, fireEvent } from "@testing-library/react";
import AutoComplete, { Suggestion } from "./index";

describe("AutoComplete Component", () => {
  const suggestions: Array<Suggestion> = [
    {
      name: "Apple",
      description: "A fruit",
      image: "https://via.placeholder.com/50",
      id: "1",
    },
    {
      name: "Banana",
      description: "A yellow fruit",
      image: "https://via.placeholder.com/50",
      id: "2",
    },
    {
      name: "Cherry",
      description: "A small red fruit",
      image: "https://via.placeholder.com/50",
      id: "3",
    },
  ];

  const handleSelect = vi.fn();

  beforeEach(() => {
    render(
      <AutoComplete
        suggestions={suggestions}
        id="autocomplete"
        onSelect={handleSelect}
      />
    );
  });

  afterEach(() => {
    handleSelect.mockClear();
  });

  it("renders", () => {
    const input = screen.getByPlaceholderText("Search");
    expect(input).toBeInTheDocument();
  });

  it("shows suggestions when typing", () => {
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "a" } });
    const suggestionItems = screen.getAllByRole("option");
    expect(suggestionItems.length).toBe(2);
  });

  it("filters suggestions based on input", () => {
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "ch" } });
    const suggestionItems = screen.getAllByRole("option");
    expect(suggestionItems.length).toBe(1);
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("calls onSelect with the correct suggestion when Enter is pressed", () => {
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(handleSelect).toHaveBeenCalledWith(suggestions[0]);
  });

  it("hides suggestions when input is cleared", () => {
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("shows 'Nothing found' when no matches are found", () => {
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "xyz" } });

    expect(screen.getByText("Nothing found")).toBeInTheDocument();
  });

  it("renders suggestions with correct ARIA roles", () => {
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "a" } });

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(2);
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(
      <AutoComplete
        suggestions={suggestions}
        id="autocomplete"
        onSelect={handleSelect}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
