import axios, { AxiosResponse } from 'axios';

const apiUrl = `https://api-sandbox.swipoo.com/itp/cars/?`;

export const getCars = (
    brand: string,
    enrollmentDate: string,
    fuel: string
): Promise<AxiosResponse> =>
    axios.get(
        `${apiUrl}brand=${brand}&enrollmentDate=${enrollmentDate}&fuel=${fuel}`
    );
