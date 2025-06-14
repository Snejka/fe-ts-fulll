type SearchBarProps = {
  selectedCount: number;
};

export default function SearchBar({ selectedCount }: SearchBarProps) {
  return (
    <section className="search-section">
      <input type="text" placeholder="Search users..." className="user-search" />
      <div className="control-bar">
        <label className="select-all">
          <input type="checkbox" checked={true} /> {/* should be connected to state */}
          {selectedCount} items selected
        </label>
        <div className="btn-group">
          <button className="copy-all"><i className="fa-regular fa-copy"></i></button>
          <button className="delete-all"><i className="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    </section>
  );
}