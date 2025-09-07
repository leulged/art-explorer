/* global vi, describe, it, expect */
import { render, screen } from "@testing-library/react";
import ArtworkPage from "../page";

vi.mock("@/lib/metApi", () => ({
  getArtworkById: vi.fn(async () => ({
    objectID: 1,
    title: "Detail Artwork",
    artistDisplayName: "Some Artist",
    objectDate: "1900",
    medium: "Oil",
    culture: "",
    department: "European Paintings",
    accessionNumber: "A1",
    primaryImage: "",
    primaryImageSmall: "",
    objectURL: "https://example.com",
  })),
}));

describe("Artwork detail page", () => {
  it("renders the artwork title and sections", async () => {
    const ui = await ArtworkPage({ params: Promise.resolve({ id: "1" }) });
    render(ui);
    expect(screen.getByText(/Detail Artwork/i)).toBeInTheDocument();
    expect(screen.getByText(/At The Met/i)).toBeInTheDocument();
  });
});
