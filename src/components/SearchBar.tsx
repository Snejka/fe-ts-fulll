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

        <div className="control-bar">
            <label className="select-all" htmlFor="checked-items">
                <input
                    id="checked-items"
                    type="checkbox"
                    onChange={onSelectAll}
                    checked={allSelected}
                />{" "}
                {selectedCount > 0 ? `${selectedCount} items selected` : "Select All"}
            </label>

            <div className="btn-group">
                <button className="icon-button">
                    <i className="fa-regular fa-copy"></i>
                </button>
                <button className="icon-button">
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
    </section>
  );
}
