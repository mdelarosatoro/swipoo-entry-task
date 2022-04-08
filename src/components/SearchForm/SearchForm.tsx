/* eslint-disable no-nested-ternary */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BRANDS, emptyCarSchema, FUEL } from '../../data/carData';
import { calculateDeprecation } from '../../helpers/calculateDeprecation';
import { CarI, ValuationI } from '../../interfaces/cars.interfaces';
import { getCars } from '../../services/apiRequest';
import CarDetails from '../CarDetails/CarDetails';
import CarValuation from '../CarValuation/CarValuation';
import DisplayError from '../Error/Error';
import Loading from '../Loading/Loading';
import './SearchForm.scss';

function SearchForm() {
    const [formValue, setFormValue] = useState({
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

    const handleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;
        setFormValue({ ...formValue, [target.name]: target.value });
        setSelectedCar(emptyCarSchema);
        setValuationOverTime([]);
    };

    useEffect(() => {
        if (
            formValue.brand !== '' &&
            formValue.enrollmentDate !== '' &&
            formValue.fuel !== ''
        ) {
            setLoading(true);
            getCars(formValue.brand, formValue.enrollmentDate, formValue.fuel)
                .then((resp) => {
                    setLoading(false);
                    setError(null);
                    setCars(resp.data.cars);
                })
                .catch(() => {
                    const fetchError = new Error('Error while fetching');
                    setError(fetchError);
                    setLoading(false);
                });
        }
    }, [formValue]);

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

    const checkFetchState = () => {
        if (loading) {
            return <Loading />;
        }
        if (cars.length > 0) {
            return (
                <div className="form__input-container">
                    <label className="form__label" htmlFor="model">
                        Modelo
                    </label>
                    <select
                        className="form__input"
                        name="model"
                        id="model"
                        value={selectedCar.model}
                        onChange={handleSelect}
                    >
                        <option disabled value="">
                            {' '}
                            -- select an option --{' '}
                        </option>
                        {cars.map((car: CarI) => (
                            <option key={car.model} value={car.model}>
                                {car.model}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }
        if (cars.length === 0 && !error) {
            return <DisplayError message="No se encontró ningún modelo." />;
        }
        return <DisplayError message={error?.message as string} />;
    };

    return (
        <form className="form">
            <h1 className="form__title">Swipoo Entry Task</h1>
            <div className="form__input-container">
                <label className="form__label" htmlFor="brand">
                    Marca
                </label>
                <select
                    className="form__input"
                    name="brand"
                    id="brand"
                    value={formValue.brand}
                    onChange={handleChange}
                >
                    <option disabled value="">
                        {' '}
                        -- select an option --{' '}
                    </option>
                    {BRANDS.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
            </div>
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
                <div className="form__input-container">
                    <label className="form__label" htmlFor="fuel">
                        Combustible
                    </label>
                    <select
                        className="form__input"
                        name="fuel"
                        id="fuel"
                        value={formValue.fuel}
                        onChange={handleChange}
                    >
                        <option disabled value="">
                            {' '}
                            -- select an option --{' '}
                        </option>
                        {FUEL.map((fuel) => (
                            <option key={fuel} value={fuel}>
                                {fuel}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {formValue.brand &&
                formValue.enrollmentDate &&
                formValue.fuel &&
                checkFetchState()}
            {selectedCar.brand && <CarDetails car={selectedCar} />}
            {valuationOverTime.length > 0 && (
                <CarValuation valuationOverTime={valuationOverTime} />
            )}
        </form>
    );
}

export default SearchForm;
