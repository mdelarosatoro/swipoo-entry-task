import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Given the Error component', () => {
    describe('When called to render with an error message', () => {
        test('It renders the message', () => {
            const errorMsg = 'TestError';
            render(<Error message={errorMsg} />);
            expect(screen.getByText(errorMsg)).toBeInTheDocument();
        });
    });
});
