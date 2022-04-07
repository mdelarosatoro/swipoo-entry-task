import axios from 'axios';
import { emptyCarSchema } from '../data/carData';
import { getCars } from './apiRequest';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Given the getCars service', () => {
    describe('When called with no error', () => {
        beforeEach(() => {
            mockedAxios.get.mockResolvedValue([emptyCarSchema]);
        });

        test('It should call axios', async () => {
            const mockBrand = 'TestBrand';
            const mockEnrollmentDate = 'TestDate';
            const mockFuel = 'Test';
            const expectedUrl =
                'https://api-sandbox.swipoo.com/itp/cars/?brand=TestBrand&enrollmentDate=TestDate&fuel=Test';

            const result = await getCars(
                mockBrand,
                mockEnrollmentDate,
                mockFuel
            );
            expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl);
            expect(result).toEqual([emptyCarSchema]);
        });
    });
    describe('When called with error', () => {
        const errorString = 'Error while fetching';
        beforeEach(() => {
            mockedAxios.get.mockRejectedValue(new Error(errorString));
        });
        test('It should call axios', async () => {
            const mockBrand = 'TestBrand';
            const mockEnrollmentDate = 'TestDate';
            const mockFuel = 'Test';

            try {
                await getCars(mockBrand, mockEnrollmentDate, mockFuel);
            } catch (error) {
                if (error instanceof Error) {
                    expect(error.message).toBe(errorString);
                }
            }
        });
    });
});
