import { ValuationI } from '../interfaces/cars.interfaces';

export const calculateDeprecation = (
    initialValue: number,
    initialDate: string
) => {
    const initialYear = new Date(`${initialDate}Z`).getFullYear();
    const currentYear = new Date().getFullYear();
    let valuation = initialValue;
    const valuationOverTime: ValuationI[] = [];
    valuationOverTime.push({
        year: initialYear,
        value: valuation,
    });
    // eslint-disable-next-line no-plusplus
    for (let i = initialYear + 1; i <= currentYear; i++) {
        valuation *= 0.9;
        const valuationObject = {
            year: i,
            value: Math.round(valuation),
        };
        valuationOverTime.push(valuationObject);
    }
    return valuationOverTime;
};
