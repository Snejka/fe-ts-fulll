import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { useUserSelection } from "./hooks/useUserSelection";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import StatusMessages from "./components/StatusMessages";
import UserList from "./components/UserList";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");
  const { users, setUsers, loading, error } = useUsers(query);
  const {
    checkedUsers,
    handleCheck,
    handleSelectAll,
    handleDelete,
    handleCopy,
  } = useUserSelection(users);

  const onDelete = () => {
    const remaining = handleDelete();
    setUsers(remaining);
    if (remaining.length === 0) setQuery("");
  };

  const onCopy = () => {
    const duplicated = handleCopy();
    setUsers((prev) => [...prev, ...duplicated]);
  };

  return (
    <>
      <Header />
      <main>
        <SearchBar
          query={query}
          onSearchChange={setQuery}
          selectedCount={checkedUsers.length}
          allSelected={checkedUsers.length === users.length && users.length > 0}
          onSelectAll={handleSelectAll}
          onDelete={onDelete}
          onCopy={onCopy}
        />

        <StatusMessages loading={loading} error={error} usersCount={users.length} />

        <UserList
          users={users}
          checkedUsers={checkedUsers}
          onCheck={handleCheck}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
