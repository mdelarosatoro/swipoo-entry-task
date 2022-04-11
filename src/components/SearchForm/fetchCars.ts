import { Dispatch, SetStateAction } from 'react';
import { CarI } from '../../interfaces/cars.interfaces';
import { FormValueI } from '../../interfaces/form.interfaces';
import { getCars } from '../../services/apiRequest';

export const fetchCars = async (
    formValue: FormValueI,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error | null>>,
    setCars: Dispatch<SetStateAction<CarI[]>>
) => {
    try {
        const resp = await getCars(
            formValue.brand,
            formValue.enrollmentDate,
            formValue.fuel
        );
        setLoading(false);
        setError(null);
        setCars(resp.data.cars);
    } catch (e) {
        const fetchError = new Error('Error while fetching');
        setError(fetchError);
        setLoading(false);
    }
};
