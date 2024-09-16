import fetchSuggestion from "./fetchSuggestion";
import formatTodosForAI from "./formatTodosForAI";

// Mock das dependências
jest.mock("./formatTodosForAI");
global.fetch = jest.fn();

describe("fetchSuggestion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a summary AI", async () => {
    // Arrange
    const mockBoard = { columns: new Map() };
    const mockTodos = [{ id: "1", title: "Task 1", status: "todo" }];
    const mockResponse = { content: "Summary" };

    (formatTodosForAI as jest.Mock).mockReturnValue(mockTodos);
    (global.fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    // Act
    const result = await fetchSuggestion(mockBoard);

    // Assert
    expect(formatTodosForAI).toHaveBeenCalledWith(mockBoard);
    expect(global.fetch).toHaveBeenCalledWith("api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos: mockTodos }),
    });
    expect(result).toBe("Summary");
  });
});
