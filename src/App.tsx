import { useState, useEffect } from "react";
// import rawData from './mocks/users.json';
import type { User } from "./types/User";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import UserList from "./components/UserList";
import Footer from "./components/Footer";

import "./App.css";

type UserResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
};

function App() {
  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);
  
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleCheck = (id: number) => {
    setCheckedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (checkedUsers.length === users.length) {
      // All selected, so clear selection
      setCheckedUsers([]);
    } else {
      // Select all user IDs
      setCheckedUsers(users.map(user => user.id));
    }
  };

// Debounce query input by 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  // Fetch users whenever debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      setError("");
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;

        const res = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            debouncedQuery
          )}`,
          {
            headers: token
              ? { Authorization: `token ${token}` }
              : undefined,
          }
        );

        if (res.status === 403) {
          setError("GitHub API rate limit exceeded.");
          setUsers([]);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error("Something went wrong while fetching data.");
        }

        const data: UserResponse = await res.json();

        if (data.items.length === 0) {
          setError("No users found.");
          setUsers([]);
        } else {
          setUsers(data.items);
        }
      } catch (err) {
        setError((err as Error).message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    setCheckedUsers([]);
    fetchUsers();
  }, [debouncedQuery]);

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
        />

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {(users.length < 1 && !loading && !error) && <p className="error">Make a search to show users</p>}

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
