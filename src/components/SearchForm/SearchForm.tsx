import React, { ChangeEvent, useEffect, useState } from 'react';
import { BRANDS, FUEL } from '../../data/carData';
import { CarI } from '../../interfaces/cars.interfaces';
import { getCars } from '../../services/apiRequest';

function SearchForm() {
    const [formValue, setFormValue] = useState({
        brand: '',
        enrollmentDate: '',
        fuel: '',
    });

    const [cars, setCars] = useState<CarI[]>([]);

    const handleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLSelectElement;
        setFormValue({ ...formValue, [target.name]: target.value });
    };

    useEffect(() => {
        if (
            formValue.brand !== '' &&
            formValue.enrollmentDate !== '' &&
            formValue.fuel !== ''
        ) {
            getCars(
                formValue.brand,
                formValue.enrollmentDate,
                formValue.fuel
            ).then((resp) => {
                console.log(resp.data);
                setCars(resp.data.cars);
            });
        }
    }, [formValue]);

    return (
        <form>
            <div>
                <label htmlFor="brand">Marca</label>
                <select
                    name="brand"
                    id="brand"
                    value={formValue.brand}
                    onChange={handleChange}
                >
                    <option disabled selected>
                        {' '}
                        -- select an option --{' '}
                    </option>
                    {BRANDS.map((brand) => (
                        <option value={brand}>{brand}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="initial-enrollment-date">
                    Fecha de la Primera Matriculación
                </label>
                <input
                    value={formValue.enrollmentDate}
                    type="date"
                    name="enrollmentDate"
                    id="initial-enrollment-date"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="fuel">Combustible</label>
                <select
                    name="fuel"
                    id="fuel"
                    value={formValue.fuel}
                    onChange={handleChange}
                >
                    <option disabled selected>
                        {' '}
                        -- select an option --{' '}
                    </option>
                    {FUEL.map((fuel) => (
                        <option value={fuel}>{fuel}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="model">Modelo</label>
                <select
                    name="model"
                    id="model"
                    // value={formValue.fuel}
                    // onChange={handleChange}
                >
                    <option disabled selected>
                        {' '}
                        -- select an option --{' '}
                    </option>
                    {cars.map((car) => (
                        <option value={car.model}>{car.model}</option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default SearchForm;
