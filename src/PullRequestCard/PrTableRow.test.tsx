import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PrTableRow from './PrTableRow';
import { getPrDetailsType } from '../types/types';

const mockSetSelectedLabel = jest.fn();

const mockPr: getPrDetailsType = {
    title: 'Test Pull Request',
    labels: [
        { name: 'bug', description: 'Bug fix', color: '#d73a4a' },
        { name: 'feature', description: 'New feature', color: '#a2eeef' },
    ],
    created_at: '2023-10-01T12:00:00Z',
    url: 'https://github.com/example/pull/1',
    id: '',
    number: 0,
    author: ''
};

jest.mock('../utils/dateFormat', () => ({
    pullDateFormat: jest.fn(() => '01-10-2023'), // Mocking the date format function to return a static date for testing
}));

jest.mock('../PRDetailSummaryModal/PRDetailsModal', () => {
    return ({ prUrl }: { prUrl: string }) => <div data-testid="pr-modal">PR Modal for {prUrl}</div>;
});

describe('PrTableRow', () => {
    it('renders the pull request title', () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);
        expect(screen.getByText('Test Pull Request')).toBeInTheDocument();
    });

    it('renders labels with correct styles and triggers setSelectedLabel on click', () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);
        const labelButtons = screen.getAllByRole('button');
        expect(labelButtons).toHaveLength(2);
        expect(labelButtons[0]).toHaveAttribute('aria-label', 'Filter by label bug');
        fireEvent.click(labelButtons[0]);
        expect(mockSetSelectedLabel).toHaveBeenCalledWith('bug');
    });

    it('renders the formatted creation date', () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);
        expect(screen.getByText('01-10-2023')).toBeInTheDocument();
    });

    it('renders the PR modal component with the correct URL', () => {
        render(<PrTableRow pr={mockPr} setSelectedLabel={mockSetSelectedLabel} />);
        expect(screen.getByTestId('pr-modal')).toHaveTextContent('PR Modal');
    });
});