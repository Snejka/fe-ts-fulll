import { useReducer } from "react";
import type { User } from "../types/User";

type State = {
  checkedUsers: number[];
};

type Action =
  | { type: "toggle"; id: number }
  | { type: "selectAll"; users: User[] }
  | { type: "clear" };

const initialState: State = {
  checkedUsers: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggle":
      const id = action.id;
      const isChecked = state.checkedUsers.includes(id);
      return {
        checkedUsers: isChecked
          ? state.checkedUsers.filter((uid) => uid !== id)
          : [...state.checkedUsers, id],
      };

    case "selectAll":
      return {
        checkedUsers:
          state.checkedUsers.length === action.users.length
            ? []
            : action.users.map((u) => u.id),
      };

    case "clear":
      return { checkedUsers: [] };

    default:
      return state;
  }
}

export const useUserSelection = (users: User[]) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCheck = (id: number) => dispatch({ type: "toggle", id });

  const handleSelectAll = () => dispatch({ type: "selectAll", users });

  const handleDelete = () => {
    const remaining = users.filter((u) => !state.checkedUsers.includes(u.id));
    dispatch({ type: "clear" });
    return remaining;
  };

  const handleCopy = () => {
    const generateUniqueId = (id: number) =>
      Number(`${id}${Math.floor(Math.random() * 10000)}`);

    const duplicatedUsers = users
      .filter((u) => state.checkedUsers.includes(u.id))
      .map((u) => ({
        ...u,
        id: generateUniqueId(u.id),
        login: `${u.login}_copy`,
      }));

    return duplicatedUsers;
  };

  return {
    checkedUsers: state.checkedUsers,
    handleCheck,
    handleSelectAll,
    handleDelete,
    handleCopy,
    dispatch, // if you want to expose dispatch directly
  };
};
