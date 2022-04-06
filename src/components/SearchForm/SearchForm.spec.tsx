import { render } from '@testing-library/react';
import SearchForm from './SearchForm';

describe('Given the SearchForm component', () => {
    describe('When called to render', () => {
        test('It should render', () => {
            render(<SearchForm />);
        });
    });
});
