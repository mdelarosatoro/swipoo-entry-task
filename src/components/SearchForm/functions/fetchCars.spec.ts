import { AxiosResponse } from 'axios';
import { initialFormState } from '../../../data/carData';
import { getCars } from '../../../services/apiRequest';
import { fetchCars } from './fetchCars';

jest.mock('../../../services/apiRequest');

const mockGetCars = getCars as jest.MockedFunction<typeof getCars>;

describe('Given the fetchCars function', () => {
    const setLoading = jest.fn();
    const setError = jest.fn();
    const setCars = jest.fn();
    const resp = { data: { cars: [] } };
    describe('When the fetch is successful', () => {
        beforeEach(() => {
            mockGetCars.mockResolvedValue(resp as AxiosResponse);
        });
        test('It should call setLoading, setError and setCars', async () => {
            await fetchCars(initialFormState, setLoading, setError, setCars);
            expect(mockGetCars).toHaveBeenCalled();
            expect(setLoading).toHaveBeenCalledWith(false);
            expect(setError).toHaveBeenCalledWith(null);
            expect(setCars).toHaveBeenCalledWith(resp.data.cars);
        });
    });
    describe('When the fetch is not successful', () => {
        beforeEach(() => {
            mockGetCars.mockRejectedValue(new Error('Error'));
        });
        test('It should call setLoading, setError and setCars', async () => {
            await fetchCars(initialFormState, setLoading, setError, setCars);
            expect(setError).toHaveBeenCalled();
            expect(setLoading).toHaveBeenCalledWith(false);
        });
    });
});
