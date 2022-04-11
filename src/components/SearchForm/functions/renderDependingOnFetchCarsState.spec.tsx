import { render, screen } from '@testing-library/react';
import { CarI } from '../../../interfaces/cars.interfaces';
import { mockCar } from '../../../mocks/cars.mocks';
import { renderDependingOnFetchCarsState } from './renderDependingOnFetchCarsState';

describe('Given the renderDependingOnFetchCarsState function', () => {
    let loading;
    const cars = [mockCar];
    const selectedCar = mockCar;
    const handleSelect = jest.fn();
    const error = new Error('Error');
    describe('When called to render with loading as true', () => {
        test('It should render the Loading component', () => {
            loading = true;
            render(
                renderDependingOnFetchCarsState(
                    loading,
                    cars,
                    selectedCar,
                    handleSelect,
                    null
                )
            );
            expect(screen.getByTestId(/loading/)).toBeInTheDocument();
        });
    });
    describe('When called to render with loading as true', () => {
        test('It should render the Loading component', () => {
            loading = false;
            render(
                renderDependingOnFetchCarsState(
                    loading,
                    cars,
                    selectedCar,
                    handleSelect,
                    null
                )
            );
            expect(screen.getByText(/Modelo/)).toBeInTheDocument();
            expect(screen.getByText(/TestModel/)).toBeInTheDocument();
        });
    });
    describe('When called to render with loading as true', () => {
        test('It should render the Loading component', () => {
            loading = false;
            const emptyCarsArray = [] as CarI[];
            const expectedText = 'No se encontró ningún modelo.';
            render(
                renderDependingOnFetchCarsState(
                    loading,
                    emptyCarsArray,
                    selectedCar,
                    handleSelect,
                    null
                )
            );
            expect(screen.getByText(expectedText)).toBeInTheDocument();
        });
    });
    describe('When called to render with loading as true', () => {
        test('It should render the Loading component', () => {
            loading = false;
            const emptyCarsArray = [] as CarI[];
            render(
                renderDependingOnFetchCarsState(
                    loading,
                    emptyCarsArray,
                    selectedCar,
                    handleSelect,
                    error
                )
            );
            expect(screen.getByText('Error')).toBeInTheDocument();
        });
    });
});
