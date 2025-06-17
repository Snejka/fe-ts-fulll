import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useUsers } from "../hooks/useUsers";

// Mock fetch before tests
const mockFetch = vi.fn();

vi.stubGlobal("fetch", mockFetch);

function HookWrapper({ query }: { query: string }) {
  const { users, loading, error } = useUsers(query);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.login}</div>
      ))}
    </div>
  );
}

describe("useUsers", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // <-- Enable fake timers before each test
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        items: [{ id: 1, login: "testuser" }],
      }),
    });
  });

  afterEach(() => {
    vi.useRealTimers(); // <-- Restore real timers after each test
  });

    it("initially has no users and no loading when query is empty", () => {
        render(<HookWrapper query="" />);
        
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        expect(screen.queryByText("testuser")).not.toBeInTheDocument();
    });

    it.skip("does not start fetching before debounce delay", () => {
        render(<HookWrapper query="test" />);
        
        act(() => {
            vi.advanceTimersByTime(300);
        });
        //Something is not good here ! TODO: fix this
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    it.skip("shows loading indicator after debounce delay", async () => {
        render(<HookWrapper query="test" />);
        
        await act(async () => {
            vi.advanceTimersByTime(500);
            await Promise.resolve();
        });
        //Something is not good here ! TODO: fix this
        expect(screen.queryByText("Loading...")).toBeInTheDocument();
    });

    it("displays users and hides loading after fetch completes", async () => {
        render(<HookWrapper query="test" />);
        
        // Pass debounce delay to trigger fetch
        await act(async () => {
            vi.advanceTimersByTime(500);
            await Promise.resolve();
        });

        // After fetch completes, loading should be hidden and user displayed
        //Something is not good here ! TODO: fix this
        await act(async () => {
            await Promise.resolve();
        });

        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        expect(screen.getByText("testuser")).toBeInTheDocument();
    });

    it("calls fetch with correct URL", async () => {
        render(<HookWrapper query="test" />);
        
        await act(async () => {
            vi.advanceTimersByTime(500);
            await Promise.resolve();
        });
        
        await act(async () => {
            await Promise.resolve();
        });
        
        expect(globalThis.fetch).toHaveBeenCalledWith(
            expect.stringContaining("https://api.github.com/search/users?q=test"),
            expect.any(Object)
        );
    });

});
    