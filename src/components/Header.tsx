import '../styles/header.css';
import { useEditMode } from "../hooks/useEditMode";
import Button from "./ui/Button";

export default function Header() {

   const { isEditMode, toggleEditMode } = useEditMode();

  return (
    <header className="app-header">
      <Button className="icon-button light" aria-label="Select from menu">
        <i className="fa-solid fa-bars"></i>
      </Button>
        
      <h1>GitHub Search</h1>

      <Button className="icon-button light" 
              onClick={toggleEditMode} 
              aria-label={`Toggle edit mode ${isEditMode ? "on" : "off"}`}>
        <span className="info">{isEditMode ? "On" : "Off"}</span>
        <i className="fa-regular fa-pen-to-square"></i>
      </Button>
    </header>
  );
}