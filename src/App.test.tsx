import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BRANDS } from './data/carData';

test('renders learn react link', () => {
    render(<App />);
    const title = screen.getByText(/Swipoo Entry Task/i);
    expect(title).toBeInTheDocument();
    waitFor(() => {
        BRANDS.forEach((brand) => {
            expect(brand).toBeInTheDocument();
        });
    });
});
