import { render, screen } from "@testing-library/react";
import Home, { metadata } from "../page";

vi.mock("@/lib/metApi", () => ({
  getFeaturedArtworks: vi.fn(async () => [
    {
      objectID: 1,
      title: "Test Artwork",
      artistDisplayName: "Test Artist",
      objectDate: "1900",
      medium: "Oil",
      culture: "",
      department: "",
      accessionNumber: "",
      primaryImage: "",
      primaryImageSmall: "",
      objectURL: "",
    },
  ]),
}));

describe("Home page", () => {
  it("renders heading and a grid item", async () => {
    const ui = await Home();
    render(ui);
    expect(screen.getByText(/Art Explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Artwork/i)).toBeInTheDocument();
  });

  it("exports metadata", () => {
    expect(metadata.title).toBeDefined();
  });
});
