/* eslint-disable no-nested-ternary */
import { ChangeEvent, useEffect, useState } from 'react';
import {
    BRANDS,
    emptyCarSchema,
    FUEL,
    initialFormState,
} from '../../data/carData';
import { calculateDeprecation } from '../../helpers/calculateDeprecation';
import { CarI, ValuationI } from '../../interfaces/cars.interfaces';
import { FormValueI } from '../../interfaces/form.interfaces';
import CarDetails from '../CarDetails/CarDetails';
import CarValuation from '../CarValuation/CarValuation';
import DateInput from '../Core/DateInput/DateInput';
import SelectBlock from '../Core/SelectBlock/SelectBlock';
import { fetchCars } from './functions/fetchCars';
import { handleFormChange } from './functions/handleFormChange';
import { renderDependingOnFetchCarsState } from './functions/renderDependingOnFetchCarsState';
import './SearchForm.scss';

function SearchForm() {
    const [formValue, setFormValue] = useState<FormValueI>(initialFormState);
    const [cars, setCars] = useState<CarI[]>([]);
    const [selectedCar, setSelectedCar] = useState<CarI>(emptyCarSchema);
    const [valuationOverTime, setValuationOverTime] = useState<ValuationI[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const checkAllFieldsAreFilled = () =>
        formValue.brand && formValue.enrollmentDate && formValue.fuel;

    useEffect(() => {
        if (checkAllFieldsAreFilled()) {
            setLoading(true);
            fetchCars(formValue, setLoading, setError, setCars);
        }
    }, [formValue]);

    const handleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;
        handleFormChange(setFormValue, formValue, target.name, target.value);
        setSelectedCar(emptyCarSchema);
        setValuationOverTime([]);
        setCars([]);
    };

    const handleSelect = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;
        const selected = cars.find(
            (item) => item.model === target.value
        ) as CarI;
        setSelectedCar(selected);
        setValuationOverTime(
            calculateDeprecation(
                Number(selected.value),
                formValue.enrollmentDate
            )
        );
    };

    return (
        <form className="form">
            <h1 className="form__title">Swipoo Entry Task</h1>
            <SelectBlock
                label="Marca"
                value={formValue.brand}
                handleChange={handleChange}
                options={BRANDS}
                name="brand"
            />
            {formValue.brand && (
                <DateInput
                    id="initial-enrollment-date"
                    label="Fecha de la Primera Matriculación"
                    name="enrollmentDate"
                    formValue={formValue}
                    handleChange={handleChange}
                />
            )}
            {formValue.brand && formValue.enrollmentDate && (
                <SelectBlock
                    label="Combustible"
                    value={formValue.fuel}
                    handleChange={handleChange}
                    options={FUEL}
                    name="fuel"
                />
            )}
            {checkAllFieldsAreFilled() &&
                renderDependingOnFetchCarsState(
                    loading,
                    cars,
                    selectedCar,
                    handleSelect,
                    error as Error
                )}
            {selectedCar.brand && <CarDetails car={selectedCar} />}
            {valuationOverTime.length > 0 && (
                <CarValuation valuationOverTime={valuationOverTime} />
            )}
        </form>
    );
}

export default SearchForm;
