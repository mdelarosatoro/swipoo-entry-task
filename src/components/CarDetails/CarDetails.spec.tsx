import { render, waitFor } from '@testing-library/react';
import { mockCar } from '../../mocks/cars.mocks';
import CarDetails from './CarDetails';

describe('Given the CarDetails component', () => {
    describe('When called to render with a car as a prop', () => {
        test('It should render the car data', () => {
            render(<CarDetails car={mockCar} />);
            waitFor(() => {
                expect(mockCar.brand).toBeInTheDocument();
                expect(mockCar.model).toBeInTheDocument();
                expect(mockCar.period).toBeInTheDocument();
                expect(mockCar.cc).toBeInTheDocument();
                expect(mockCar.cylinders).toBeInTheDocument();
                expect(mockCar.fuel).toBeInTheDocument();
                expect(mockCar.kw).toBeInTheDocument();
                expect(mockCar.cvf).toBeInTheDocument();
                expect(mockCar.cv).toBeInTheDocument();
                expect(mockCar.value).toBeInTheDocument();
            });
        });
    });
});
