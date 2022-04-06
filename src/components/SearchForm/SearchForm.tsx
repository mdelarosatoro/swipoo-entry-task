import React from 'react';
import { BRANDS, FUEL } from '../../data/car-data';

function SearchForm() {
    return (
        <form>
            <div>
                <label htmlFor="brand">Marca</label>
                <select name="brand" id="brand">
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
                    type="date"
                    name="initial-enrollment-date"
                    id="initial-enrollment-date"
                />
            </div>
            <div>
                <label htmlFor="fuel">Combustible</label>
                <select name="fuel" id="fuel">
                    {FUEL.map((fuel) => (
                        <option value={fuel}>{fuel}</option>
                    ))}
                </select>
            </div>
        </form>
    );
}

export default SearchForm;
