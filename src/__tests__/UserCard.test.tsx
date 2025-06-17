import { describe, it, vi, beforeEach, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import type { User } from "../types/User";

let UserCard: typeof import("../components/UserCard").default;

const user: User = {
  id: 1,
  login: "testuser",
  node_id: "node123",
  avatar_url: "https://example.com/avatar.jpg",
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
};

describe("UserCard", () => {
  const mockOnCheck = vi.fn();

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders user information", async () => {
    vi.doMock("../hooks/useEditMode", () => ({
      useEditMode: () => ({ isEditMode: true }),
    }));
    UserCard = (await import("../components/UserCard")).default;

    render(<UserCard user={user} checked={false} onCheck={mockOnCheck} />);
    expect(screen.getByText("ID: 1")).toBeInTheDocument();
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByAltText("testuser")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view profile/i })).toBeInTheDocument();
  });

  it("renders checkbox in edit mode and reflects checked state", async () => {
    vi.doMock("../hooks/useEditMode", () => ({
      useEditMode: () => ({ isEditMode: true }),
    }));
    UserCard = (await import("../components/UserCard")).default;

    render(<UserCard user={user} checked={true} onCheck={mockOnCheck} />);
    const checkbox = screen.getByLabelText("Select user testuser") as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.checked).toBe(true);
  });

  it("calls onCheck when checkbox is toggled", async () => {
    vi.doMock("../hooks/useEditMode", () => ({
      useEditMode: () => ({ isEditMode: true }),
    }));
    UserCard = (await import("../components/UserCard")).default;

    render(<UserCard user={user} checked={false} onCheck={mockOnCheck} />);
    const checkbox = screen.getByLabelText("Select user testuser");
    fireEvent.click(checkbox);
    expect(mockOnCheck).toHaveBeenCalledWith(user.id);
  });

  it("logs user on button click", async () => {
    vi.doMock("../hooks/useEditMode", () => ({
      useEditMode: () => ({ isEditMode: true }),
    }));
    UserCard = (await import("../components/UserCard")).default;

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<UserCard user={user} checked={false} onCheck={mockOnCheck} />);
    fireEvent.click(screen.getByRole("button", { name: /view profile/i }));
    expect(logSpy).toHaveBeenCalledWith(user);
    logSpy.mockRestore();
  });

  it("does not render checkbox if not in edit mode", async () => {
    vi.doMock("../hooks/useEditMode", () => ({
      useEditMode: () => ({ isEditMode: false }),
    }));
    UserCard = (await import("../components/UserCard")).default;

    render(<UserCard user={user} checked={false} onCheck={mockOnCheck} />);
    expect(screen.queryByLabelText("Select user testuser")).not.toBeInTheDocument();
  });
});
