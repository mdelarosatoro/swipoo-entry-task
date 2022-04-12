import { render, screen } from '@testing-library/react';
import SelectBlock from './SelectBlock';

describe('Given the SelectBlock component', () => {
    describe('When called to render with a label, value, handler fn, options and name', () => {
        test('It should render', () => {
            const label = 'test';
            const value = 'test';
            const handleChange = jest.fn();
            const options = ['testOption1, testOption2'];
            const name = 'test';
            render(
                <SelectBlock
                    label={label}
                    value={value}
                    handleChange={handleChange}
                    options={options}
                    name={name}
                />
            );
            expect(screen.getByText(label)).toBeInTheDocument();
            options.forEach((option) => {
                expect(screen.getByText(option)).toBeInTheDocument();
            });
        });
    });
});
