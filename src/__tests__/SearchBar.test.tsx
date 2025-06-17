import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

vi.mock("../hooks/useEditMode", () => ({
  useEditMode: () => ({ isEditMode: true }),
}));

describe("SearchBar", () => {
  const mockProps = {
    query: "john",
    onSearchChange: vi.fn(),
    selectedCount: 2,
    allSelected: false,
    onSelectAll: vi.fn(),
    onDelete: vi.fn(),
    onCopy: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input with the correct value", () => {
    render(<SearchBar {...mockProps} />);
    const input = screen.getByPlaceholderText("Search users...") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("john");
  });

  it("calls onSearchChange when input changes", () => {
    render(<SearchBar {...mockProps} />);
    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "jane" } });
    expect(mockProps.onSearchChange).toHaveBeenCalledWith("jane");
  });

  it("shows checkbox with selected count label", () => {
    render(<SearchBar {...mockProps} />);
    expect(screen.getByLabelText("2 items selected")).toBeInTheDocument();
  });

  it("calls onSelectAll when checkbox is clicked", () => {
    render(<SearchBar {...mockProps} />);
    const checkbox = screen.getByLabelText("2 items selected");
    fireEvent.click(checkbox);
    expect(mockProps.onSelectAll).toHaveBeenCalled();
  });

  it("calls onCopy and onDelete when buttons are clicked", () => {
    render(<SearchBar {...mockProps} />);
    const copyButton = screen.getByLabelText("Copy selected users");
    const deleteButton = screen.getByLabelText("Delete selected users");

    fireEvent.click(copyButton);
    expect(mockProps.onCopy).toHaveBeenCalled();

    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalled();
  });

  it("does not show buttons or checkbox if no selection", () => {
    const props = { ...mockProps, selectedCount: 0 };
    render(<SearchBar {...props} />);
    expect(screen.queryByLabelText("Delete selected users")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Select All")).toBeInTheDocument();
  });
});
