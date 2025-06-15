import { useEditMode } from "../hooks/useEditMode";

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
                className="user-search"
                value={query}
                onChange={(e) => onSearchChange(e.target.value)}
            />

            { isEditMode && <div className="control-bar">
                <label className="select-all" htmlFor="checked-items">
                    <input
                        id="checked-items"
                        type="checkbox"
                        onChange={onSelectAll}
                        checked={allSelected}
                    />{" "}
                    { hasSelection ? `${selectedCount} items selected` : "Select All"}
                </label>

                { hasSelection && <div className="btn-group">
                    <button className="icon-button">
                        <i className="fa-regular fa-copy"></i>
                    </button>
                    <button className="icon-button">
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                </div> }
            </div>}
        </section>
    );
}
