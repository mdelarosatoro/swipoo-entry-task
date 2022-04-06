import React from 'react';
import { CarI } from '../../interfaces/cars.interfaces';

function CarDetails({ car }: { car: CarI }) {
    return <div>{car.brand}</div>;
}

export default CarDetails;
