import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({ data: 'mocked data' }),
        })
    ) as jest.Mock;
});

afterEach(() => {
    jest.resetAllMocks();
});
describe('App Component', () => {
    test('renders the heading', () => {
        render(<App />);
        const headingElement = screen.getByText(/Git Pull Requests Table/i);
        expect(headingElement).toBeInTheDocument();
    });
});