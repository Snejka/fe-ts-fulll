import { useState } from "react";
import type { ReactNode } from "react";
import { EditModeContext } from "./EditModeContext";

// This component accepts children — and those children can be anything React can render.
// Perfect for context providers, layout components, or wrappers where you don’t know exactly what the children will be.
export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
}