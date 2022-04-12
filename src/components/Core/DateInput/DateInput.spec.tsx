import { render, screen } from '@testing-library/react';
import { initialFormState } from '../../../data/carData';
import DateInput from './DateInput';

describe('Given the DateInput component', () => {
    describe('When called to render with and id, label, name, formValue and handler fn', () => {
        test('It should render', () => {
            const id = 'test';
            const label = 'test';
            const name = 'test';
            const handleChange = jest.fn();
            render(
                <DateInput
                    id={id}
                    label={label}
                    name={name}
                    formValue={initialFormState}
                    handleChange={handleChange}
                />
            );

            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });
});
