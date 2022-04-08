import { render, screen, waitFor } from '@testing-library/react';
import CarValuation from './CarValuation';

describe('Given the CarValuation component', () => {
    describe('When called to render with an array of valuations', () => {
        test('It should render the valuations on the document', () => {
            const arrayOfValuations = [
                { year: 2020, value: 30000 },
                { year: 2021, value: 27000 },
                { year: 2022, value: 24300 },
            ];
            render(<CarValuation valuationOverTime={arrayOfValuations} />);

            waitFor(() => {
                expect(
                    screen.getByText(/Valoración Venal/)
                ).toBeInTheDocument();
                expect(arrayOfValuations[0].year).toBeInTheDocument();
                expect(arrayOfValuations[0].value).toBeInTheDocument();
                expect(arrayOfValuations[1].year).toBeInTheDocument();
                expect(arrayOfValuations[1].value).toBeInTheDocument();
                expect(arrayOfValuations[2].year).toBeInTheDocument();
                expect(arrayOfValuations[2].value).toBeInTheDocument();
            });
        });
    });
});
