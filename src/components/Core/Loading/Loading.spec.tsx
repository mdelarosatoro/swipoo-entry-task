import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Given the Loading component', () => {
    describe('When called to render', () => {
        test('It renders properly', () => {
            render(<Loading />);
            expect(screen.getByTestId('loading')).toBeInTheDocument();
        });
    });
});
