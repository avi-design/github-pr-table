import React from "react"; // Add this line
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PRModalComponent from "./PRDetailsModal";
import { getPRSummary } from "../service/getPrDetails";
import { formatLastUpdatedTime } from "../utils/dateFormat";

jest.mock("../service/getPrDetails");
jest.mock("../utils/dateFormat");

describe("PRModalComponent", () => {
    const mockGetPRSummary = getPRSummary as jest.Mock;
    const mockFormatLastUpdatedTime = formatLastUpdatedTime as jest.Mock;

    const mockPrUrl = "https://api.github.com/repos/user/repo/pulls/1";
    const mockModalDetails = {
        title: "Mock PR Title",
        body: "Mock PR Body",
        updated_at: "2023-01-01T12:00:00Z",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the button to show PR details", () => {
        render(<PRModalComponent prUrl={mockPrUrl} />);
        const button = screen.getByText("Pull Request Details");
        expect(button).toBeInTheDocument();
    });

    it("fetches and displays PR details when the button is clicked", async () => {
        mockGetPRSummary.mockResolvedValue(mockModalDetails);
        mockFormatLastUpdatedTime.mockReturnValue("January 1, 2023, 12:00 PM");

        render(<PRModalComponent prUrl={mockPrUrl} />);
        const button = screen.getByText("Pull Request Details");

        fireEvent.click(button);

        await waitFor(() => {
            expect(mockGetPRSummary).toHaveBeenCalledWith(mockPrUrl);
        });
    });

    it("closes the modal when the close button is clicked", async () => {
        mockGetPRSummary.mockResolvedValue(mockModalDetails);
        mockFormatLastUpdatedTime.mockReturnValue("January 1, 2023, 12:00 PM");

        render(<PRModalComponent prUrl={mockPrUrl} />);
        const button = screen.getByText("Pull Request Details");

        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(mockModalDetails.title)).toBeInTheDocument();
        });

        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText(mockModalDetails.title)).not.toBeInTheDocument();
        });
    });

    it("handles errors when fetching PR details fails", async () => {
        mockGetPRSummary.mockRejectedValue(new Error("Failed to fetch PR details"));

        render(<PRModalComponent prUrl={mockPrUrl} />);
        const button = screen.getByText("Pull Request Details");

        fireEvent.click(button);

        await waitFor(() => {
            expect(mockGetPRSummary).toHaveBeenCalledWith(mockPrUrl);
        });
    });

    it("does not display the modal initially", () => {
        render(<PRModalComponent prUrl={mockPrUrl} />);
        expect(screen.queryByText(mockModalDetails.title)).not.toBeInTheDocument();
    });

    it("displays an error in the console when fetching PR details fails", async () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        mockGetPRSummary.mockRejectedValue(new Error("Failed to fetch PR details"));

        render(<PRModalComponent prUrl={mockPrUrl} />);
        const button = screen.getByText("Pull Request Details");

        fireEvent.click(button);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Failed to fetch PR details"));
        });

        consoleErrorSpy.mockRestore();
    });
});