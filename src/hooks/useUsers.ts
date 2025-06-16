import { useState, useEffect } from "react";
import type { User } from "../types/User";

export const useUsers = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

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
          `https://api.github.com/search/users?q=${encodeURIComponent(debouncedQuery)}`,
          {
            headers: token ? { Authorization: `token ${token}` } : undefined,
          }
        );

        if (res.status === 403) {
          setError("GitHub API rate limit exceeded.");
          setUsers([]);
        } else if (!res.ok) {
          throw new Error("Something went wrong while fetching data.");
        } else {
          const data = await res.json();
          setUsers(data.items || []);
          if (data.items.length === 0) {
            setError("No users found.");
          }
        }
      } catch (err) {
        setError((err as Error).message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return { users, setUsers, loading, error };
};
