import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import type { User } from "../types/User";
import { useState } from "react";

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

const users: User[] = [
  {
    id: 1,
    login: "user1",
    node_id: "node1",
    avatar_url: "avatar1",
    gravatar_id: "",
    url: "url1",
    html_url: "html_url1",
    followers_url: "followers_url1",
    following_url: "following_url1",
    gists_url: "gists_url1",
    starred_url: "starred_url1",
    subscriptions_url: "subscriptions_url1",
    organizations_url: "organizations_url1",
    repos_url: "repos_url1",
    events_url: "events_url1",
    received_events_url: "received_events_url1",
    type: "User",
    site_admin: false,
    user_view_type: "some_value",
    score: 1.0,
  },
  {
    id: 2,
    login: "user2",
    node_id: "node2",
    avatar_url: "avatar2",
    gravatar_id: "",
    url: "url1",
    html_url: "html_url",
    followers_url: "followers_url",
    following_url: "following_url",
    gists_url: "gists_url1",
    starred_url: "starred_url1",
    subscriptions_url: "subscriptions_url1",
    organizations_url: "organizations_url1",
    repos_url: "repos_url1",
    events_url: "events_url1",
    received_events_url: "received_events_url1",
    type: "User",
    site_admin: false,
    user_view_type: "some_value",
    score: 1.0,
  }
];

function TestComponent({ users }: { users: User[] }) {
  const {
    checkedUsers,
    handleCheck,
    handleSelectAll,
    handleDelete,
    handleCopy,
  } = useUserSelection(users);

  return (
    <div>
      <div data-testid="checked-users">{checkedUsers.join(",")}</div>

      <button onClick={() => handleCheck(1)}>Toggle User 1</button>
      <button onClick={() => handleCheck(2)}>Toggle User 2</button>
      <button onClick={handleSelectAll}>Select/Deselect All</button>

      <button
        onClick={() => {
          const remaining = handleDelete();
          const elem = document.getElementById("remaining-users");
          if (elem) {
            elem.textContent = remaining.map((u) => u.login).join(",");
          }
        }}
      >
        Delete Selected
      </button>

      <button
        onClick={() => {
          const copies = handleCopy();
          const elem = document.getElementById("copied-users");
          if (elem) {
            elem.textContent = copies.map((u) => u.login).join(",");
          }
        }}
      >
        Copy Selected
      </button>

      <div id="remaining-users"></div>
      <div id="copied-users"></div>
    </div>
  );
}

describe("useUserSelection hook", () => {
  beforeEach(() => {
    render(<TestComponent users={users} />);
  });

  it("starts with empty checkedUsers", () => {
    expect(screen.getByTestId("checked-users").textContent).toBe("");
  });

  it("handleCheck toggles user selection", () => {
    fireEvent.click(screen.getByText("Toggle User 1"));
    expect(screen.getByTestId("checked-users").textContent).toBe("1");

    fireEvent.click(screen.getByText("Toggle User 1"));
    expect(screen.getByTestId("checked-users").textContent).toBe("");
  });

  it("handleSelectAll toggles select all/deselect all", () => {
    fireEvent.click(screen.getByText("Select/Deselect All"));
    expect(screen.getByTestId("checked-users").textContent).toBe("1,2");

    fireEvent.click(screen.getByText("Select/Deselect All"));
    expect(screen.getByTestId("checked-users").textContent).toBe("");
  });

  it("handleDelete clears selection and returns remaining users", () => {
    fireEvent.click(screen.getByText("Toggle User 1"));
    fireEvent.click(screen.getByText("Delete Selected"));

    expect(screen.getByTestId("checked-users").textContent).toBe("");
    expect(screen.getByText("user2")).toBeInTheDocument(); 
  });

  it("handleCopy returns copied users with modified logins", () => {
    fireEvent.click(screen.getByText("Toggle User 1"));
    fireEvent.click(screen.getByText("Copy Selected"));

    expect(screen.getByText(/user1_copy/)).toBeInTheDocument();
  });
});
