import { createContext } from "react";

type EditModeContextType = {
  isEditMode: boolean;
  toggleEditMode: () => void;
};

export const EditModeContext = createContext<EditModeContextType | undefined>(undefined);
