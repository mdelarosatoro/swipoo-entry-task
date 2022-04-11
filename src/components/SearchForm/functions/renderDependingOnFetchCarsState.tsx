import { ChangeEventHandler } from 'react';
import { CarI } from '../../../interfaces/cars.interfaces';
import SelectBlock from '../../Core/SelectBlock/SelectBlock';
import Loading from '../../Loading/Loading';
import DisplayError from '../../Error/Error';

export const renderDependingOnFetchCarsState = (
    loading: boolean,
    cars: CarI[],
    selectedCar: CarI,
    handleSelect: ChangeEventHandler,
    error: Error | null
) => {
    if (loading) {
        return <Loading />;
    }
    if (cars.length) {
        return (
            <SelectBlock
                label="Modelo"
                value={selectedCar.model}
                handleChange={handleSelect}
                options={cars.map((car) => car.model)}
                name="model"
            />
        );
    }
    if (!cars.length && !error) {
        return <DisplayError message="No se encontró ningún modelo." />;
    }
    return <DisplayError message={error?.message as string} />;
};
