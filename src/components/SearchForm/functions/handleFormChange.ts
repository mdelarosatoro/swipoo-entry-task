import { Dispatch, SetStateAction } from 'react';
import { FormValueI } from '../../../interfaces/form.interfaces';

export const handleFormChange = (
    setFormValue: Dispatch<SetStateAction<FormValueI>>,
    formValue: FormValueI,
    targetName: string,
    targetValue: string
) => {
    let newState;
    if (targetName === 'brand') {
        newState = {
            ...formValue,
            [targetName]: targetValue,
            enrollmentDate: '',
            fuel: '',
        };
        setFormValue(newState);
    } else if (targetName === 'enrollmentDate') {
        newState = {
            ...formValue,
            [targetName]: targetValue,
            fuel: '',
        };
        setFormValue(newState);
    } else {
        newState = {
            ...formValue,
            [targetName]: targetValue,
        };
        setFormValue(newState);
    }
};
