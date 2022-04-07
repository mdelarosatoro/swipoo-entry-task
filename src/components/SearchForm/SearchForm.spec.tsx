import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosResponse } from 'axios';
import { BRANDS, FUEL } from '../../data/carData';
import { mockCar } from '../../mocks/cars.mocks';
import { getCars } from '../../services/apiRequest';
import SearchForm from './SearchForm';

jest.mock('../../services/apiRequest');
const getCarsMock = getCars as jest.MockedFunction<typeof getCars>;

describe('Given the SearchForm component', () => {
    const datePickerLabel = 'Fecha de la Primera Matriculación';
    beforeEach(() => {
        getCarsMock.mockResolvedValue({
            data: { cars: [mockCar] },
        } as AxiosResponse) as jest.Mock;
    });
    describe('When called to render', () => {
        test('It should render all the brands', async () => {
            await render(<SearchForm />);
            waitFor(() => {
                BRANDS.forEach((brand) => {
                    expect(brand).toBeInTheDocument();
                });
            });
        });
    });
    describe('When selecting a brand', () => {
        test('It should render the date picker', async () => {
            await render(<SearchForm />);
            userEvent.selectOptions(screen.getByLabelText('Marca'), ['Abarth']);
            waitFor(() => {
                expect(screen.getByText(datePickerLabel)).toBeInTheDocument();
            });
        });
    });
    describe('When picking a date', () => {
        test('It should render the fuel picker', async () => {
            await render(<SearchForm />);
            userEvent.selectOptions(screen.getByLabelText('Marca'), ['Abarth']);
            fireEvent.change(screen.getByLabelText(datePickerLabel), {
                target: { value: '2020-02-05' },
            });
            waitFor(() => {
                FUEL.forEach((fuel) => {
                    expect(fuel).toBeInTheDocument();
                });
            });
        });
    });
    describe('When picking all fields', () => {
        test('It should show loading div', async () => {
            await render(<SearchForm />);
            userEvent.selectOptions(screen.getByLabelText('Marca'), ['Abarth']);
            fireEvent.change(screen.getByLabelText(datePickerLabel), {
                target: { value: '2020-02-05' },
            });
            userEvent.selectOptions(screen.getByLabelText('Combustible'), [
                'G',
            ]);
            waitFor(() => {
                expect(screen.getByText(/Loading/)).toBeInTheDocument();
            });
        });
    });
    describe('When picking all fields and awaiting api response', () => {
        test('It should call the api and show the testmodel', async () => {
            await render(<SearchForm />);
            userEvent.selectOptions(screen.getByLabelText('Marca'), ['Abarth']);
            fireEvent.change(screen.getByLabelText(datePickerLabel), {
                target: { value: '2020-02-05' },
            });
            await userEvent.selectOptions(
                screen.getByLabelText('Combustible'),
                ['G']
            );
            waitFor(() => {
                expect(getCars).toHaveBeenCalled();
                expect(mockCar.model).toBeInTheDocument();
            });
        });
    });
    describe('When picking all fields and api response throws', () => {
        beforeEach(() => {
            getCarsMock.mockRejectedValue(
                new Error('Error while fetching') as unknown as AxiosResponse
            ) as jest.Mock;
        });
        test('It should display error message', async () => {
            await render(<SearchForm />);
            await userEvent.selectOptions(screen.getByLabelText('Marca'), [
                'Abarth',
            ]);
            await fireEvent.change(screen.getByLabelText(datePickerLabel), {
                target: { value: '2020-02-05' },
            });
            await userEvent.selectOptions(
                screen.getByLabelText('Combustible'),
                ['G']
            );
        });
    });
    describe('When selecting a car model', () => {
        test('It should render CarDetails and CarValuation', async () => {
            await render(<SearchForm />);
            const yearsArray = [2020, 2021, 2022];
            const valueArray = [15000, 13500, 12150];
            userEvent.selectOptions(screen.getByLabelText('Marca'), ['Abarth']);
            fireEvent.change(screen.getByLabelText(datePickerLabel), {
                target: { value: '2020-04-07' },
            });
            await userEvent.selectOptions(
                screen.getByLabelText('Combustible'),
                ['G']
            );
            await userEvent.selectOptions(screen.getByLabelText('Modelo'), [
                mockCar.model,
            ]);
            waitFor(() => {
                Object.entries(mockCar).forEach((property) => {
                    expect(property[1]).toBeInTheDocument();
                });
                yearsArray.forEach((year) => {
                    expect(year).toBeInTheDocument();
                });
                valueArray.forEach((value) => {
                    expect(value).toBeInTheDocument();
                });
            });
        });
    });
});
