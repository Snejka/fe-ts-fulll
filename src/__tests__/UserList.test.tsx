import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { User } from "../types/User";
import UserList from "../components/UserList";
import type { UserCardProps } from "../components/UserCard";

vi.mock("../components/UserCard", () => ({
  default: (props: UserCardProps) => {
    const { user, checked, onCheck } = props;
    return (
      <li data-testid="user-card">
        <p>{user.login}</p>
        <p>Checked: {String(checked)}</p>
        <button onClick={() => onCheck(user.id)}>Check</button>
      </li>
    );
  },
}));

const mockUsers: User[] = [
  {
    id: 1,
    login: "alice",
    node_id: "node1",
    avatar_url: "",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "User",
    site_admin: false,
    score: 1,
    user_view_type: "default",
  },
  {
    id: 2,
    login: "bob",
    node_id: "node2",
    avatar_url: "",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "User",
    site_admin: false,
    score: 1,
    user_view_type: "default",
  },
];

describe("UserList", () => {
  const mockOnCheck = vi.fn();

  beforeEach(() => {
    mockOnCheck.mockClear();
  });

  it("renders a UserCard for each user", () => {
    render(<UserList users={mockUsers} checkedUsers={[]} onCheck={mockOnCheck} />);
    const cards = screen.getAllByTestId("user-card");
    expect(cards).toHaveLength(mockUsers.length);
    expect(screen.getByText("alice")).toBeInTheDocument();
    expect(screen.getByText("bob")).toBeInTheDocument();
  });

  it("marks users as checked if their ID is in checkedUsers", () => {
    render(<UserList users={mockUsers} checkedUsers={[2]} onCheck={mockOnCheck} />);
    expect(screen.getByText("Checked: false")).toBeInTheDocument(); // alice
    expect(screen.getByText("Checked: true")).toBeInTheDocument();  // bob
  });

  it("calls onCheck with correct user ID when button clicked", () => {
    render(<UserList users={mockUsers} checkedUsers={[]} onCheck={mockOnCheck} />);
    const buttons = screen.getAllByRole("button", { name: "Check" });
    fireEvent.click(buttons[0]); // click on alice
    fireEvent.click(buttons[1]); // click on bob
    expect(mockOnCheck).toHaveBeenCalledWith(1);
    expect(mockOnCheck).toHaveBeenCalledWith(2);
    expect(mockOnCheck).toHaveBeenCalledTimes(2);
  });
});
