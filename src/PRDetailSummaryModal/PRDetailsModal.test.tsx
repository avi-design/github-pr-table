
import { render, screen } from '@testing-library/react';
import PRDetails from './PRDetailsModal';

test('renders PRDetails component', () => {
	render(<PRDetails prUrl={''} />);
	const linkElement = screen.getByText(/PR Details/i);
	expect(linkElement).toBeInTheDocument();
});