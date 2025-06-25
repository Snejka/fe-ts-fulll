import { useState } from "react";
import type { User } from "../types/User";

//useReducer() is a better option for managing complex state.
//Makes it easier to extend functionality in the future.
export const useUserSelection = (users: User[]) => {
  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);

  const handleCheck = (id: number) => {
    setCheckedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setCheckedUsers((prev) =>
      prev.length === users.length ? [] : users.map((u) => u.id)
    );
  };

  const handleDelete = () => {
    const remaining = users.filter((u) => !checkedUsers.includes(u.id));
    setCheckedUsers([]);
    return remaining;
  };

  const handleCopy = () => {
    const generateUniqueId = (id: number) =>
      Number(`${id}${Math.floor(Math.random() * 10000)}`);

    const duplicatedUsers = users
      .filter((u) => checkedUsers.includes(u.id))
      .map((u) => ({
        ...u,
        id: generateUniqueId(u.id),
        login: `${u.login}_copy`,
      }));

    return duplicatedUsers;
  };

  return {
    checkedUsers,
    handleCheck,
    handleSelectAll,
    handleDelete,
    handleCopy,
    setCheckedUsers,
  };
};
