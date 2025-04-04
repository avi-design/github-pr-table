import { render, screen, fireEvent } from "@testing-library/react";
import PrTableRow from "./PrTableRow";
import { pullDateFormat } from "../utils/dateFormat";

jest.mock("../utils/dateFormat", () => ({
    pullDateFormat: jest.fn(),
}));

describe("PrTableRow Component", () => {
    const mockSetSelectedLabel = jest.fn();
    const mockPr = {
        id: "1",
        url: "https://github.com/example/pull/1",
        title: "Fix bug in component",
        number: 123,
        created_at: "2023-01-01T00:00:00Z",
        author: "JohnDoe",
        labels: [
            {
                name: "bug",
                description: "Indicates a bug in the code",
                color: "#d73a4a",
            },
            {
                name: "enhancement",
                description: "Indicates a new feature",
                color: "#a2eeef",
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        pullDateFormat("Jan 1, 2023");
    });

    it("renders the pull request title", () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);
        expect(screen.getByText(mockPr.title)).toBeInTheDocument();
    });

    it("renders the labels with correct styles and calls setSelectedLabel on click", () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);

        mockPr.labels.forEach((label) => {
            const labelButton = screen.getByRole("button", { name: `Filter by label ${label.name}` });
            expect(labelButton).toBeInTheDocument();

            fireEvent.click(labelButton);
            expect(mockSetSelectedLabel).toHaveBeenCalledWith(label.name);
        });
    });

    it("renders the formatted creation date", () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);
        expect(screen.getByText("Jan 1, 2023")).toBeInTheDocument();
        expect(pullDateFormat).toHaveBeenCalledWith(mockPr.created_at);
    });

    it("renders the PRModalComponent with the correct URL", () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);
        const modalTrigger = screen.getByRole("button", { name: /details/i });
        expect(modalTrigger).toBeInTheDocument();
    });
});