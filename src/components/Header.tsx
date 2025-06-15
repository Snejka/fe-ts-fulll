import { useEditMode } from "../context/EditModeContext";

export default function Header() {

   const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <header className="app-header">
      <button className="icon-button light">
        <i className="fa-solid fa-bars"></i>
      </button>
      <h1>GitHub Search</h1>
      <button className="icon-button light" onClick={toggleEditMode}>
        {isEditMode ? "On" : "Off"}
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
    </header>
  );
}