import { useEditMode } from "../hooks/useEditMode";
import "../styles/search-bar.css";
import Button from "./ui/Button";
import Checkbox from "./ui/Checkbox";

type SearchBarProps = {
  query: string;
  onSearchChange: (value: string) => void;
  selectedCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
};

export default function SearchBar({
    query,
    onSearchChange,
    selectedCount,
    allSelected,
    onSelectAll,
}: SearchBarProps) {
  const { isEditMode } = useEditMode();

  const hasSelection = selectedCount > 0;

  return (
    <section className="search-section">
      <input
        type="text"
        name="main-search"
        placeholder="Search users..."
        aria-label="Search users"
        className="user-search"
        value={query}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {isEditMode && (
        <div className="control-bar">
            <Checkbox
                id="checked-items"
                type="checkbox"
                onChange={onSelectAll}
                checked={allSelected}
                label={
                hasSelection ? `${selectedCount} items selected` : "Select All"
                }
            />

            {hasSelection && (
                <div className="btn-group">
                <Button className="icon-button" aria-label="Copy selected users">
                    <i className="fa-regular fa-copy"></i>
                </Button>
                <Button
                    className="icon-button"
                    aria-label="Delete selected users"
                >
                    <i className="fa-regular fa-trash-can"></i>
                </Button>
                </div>
            )}
        </div>
      )}
    </section>
  );
}
