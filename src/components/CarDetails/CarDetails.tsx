import React from 'react';
import { CarI } from '../../interfaces/cars.interfaces';
import './CarDetails.scss';

function CarDetails({ car }: { car: CarI }) {
    return (
        <div className="details">
            <div className="details__title-container">
                <p className="details__title">Datos del vehículo</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">Marca</p>
                <p className="details__cell">{car.brand}</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">Modelo</p>
                <p className="details__cell">{car.model}</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">Cilindrada</p>
                <p className="details__cell">{car.cc}</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">Cilindros</p>
                <p className="details__cell">{car.cylinders}</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">
                    Combustible
                </p>
                <p className="details__cell">{car.fuel}</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">
                    Potencia (kW)
                </p>
                <p className="details__cell">{car.kw}</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">
                    Potencia fiscal
                </p>
                <p className="details__cell">{car.cvf}</p>
            </div>
            <div className="details__row">
                <p className="details__cell details__cell--field">
                    Potencia (CV)
                </p>
                <p className="details__cell">{car.cv}</p>
            </div>
        </div>
    );
}

export default CarDetails;
