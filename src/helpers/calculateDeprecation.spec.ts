import { calculateDeprecation } from './calculateDeprecation';

describe('Given the calculateDeprecation helper', () => {
    describe('When called with an initialValue and initialDate', () => {
        test('It should return an array with valuation over time', () => {
            const initialValue = 30000;
            const initialDate = '2020-04-07T08:27:49.346';
            const expectedResult = [
                { year: 2020, value: 30000 },
                { year: 2021, value: 27000 },
                { year: 2022, value: 24300 },
            ];
            const result = calculateDeprecation(initialValue, initialDate);
            expect(result).toEqual(expectedResult);
        });
    });
    describe('When called with an initial date in the future', () => {
        test('It should return an array with the later year and the initialValue', () => {
            const initialValue = 30000;
            const initialDate = '2024-04-07T08:27:49.346';
            const result = calculateDeprecation(initialValue, initialDate);
            const expectedResult = [{ year: 2024, value: 30000 }];
            expect(result).toEqual(expectedResult);
        });
    });
    describe('When called with an initial date in the current year', () => {
        test('It should return an array with the later year and the initialValue', () => {
            const initialValue = 30000;
            const initialDate = '2022-04-07T08:27:49.346';
            const result = calculateDeprecation(initialValue, initialDate);
            const expectedResult = [{ year: 2022, value: 30000 }];
            expect(result).toEqual(expectedResult);
        });
    });
});
