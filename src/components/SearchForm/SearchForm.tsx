/* eslint-disable no-nested-ternary */
import { ChangeEvent, useEffect, useState } from 'react';
import { BRANDS, emptyCarSchema, FUEL } from '../../data/carData';
import { calculateDeprecation } from '../../helpers/calculateDeprecation';
import { CarI, ValuationI } from '../../interfaces/cars.interfaces';
import { FormValueI } from '../../interfaces/form.interfaces';
import CarDetails from '../CarDetails/CarDetails';
import CarValuation from '../CarValuation/CarValuation';
import SelectBlock from '../Core/SelectBlock/SelectBlock';
import { fetchCars } from './fetchCars';
import { handleFormChange } from './handleFormChange';
import { renderDependingOnFetchCarsState } from './renderDependingOnFetchCarsState';
import './SearchForm.scss';

function SearchForm() {
    const [formValue, setFormValue] = useState<FormValueI>({
        brand: '',
        enrollmentDate: '',
        fuel: '',
    });
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
                <div className="form__input-container">
                    <label
                        className="form__label"
                        htmlFor="initial-enrollment-date"
                    >
                        Fecha de la Primera Matriculación
                    </label>
                    <input
                        className="form__input"
                        value={formValue.enrollmentDate}
                        type="date"
                        name="enrollmentDate"
                        id="initial-enrollment-date"
                        onChange={handleChange}
                    />
                </div>
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
