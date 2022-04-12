import { initialFormState } from '../../../data/carData';
import { handleFormChange } from './handleFormChange';

describe('Given the handleFormChange function', () => {
    const setFormValue = jest.fn();
    let formValue;
    let targetName;
    let targetValue;
    let newState;
    describe('When calling it with brand as a target', () => {
        test('It should call setFormValue', () => {
            targetName = 'brand';
            targetValue = 'test';
            formValue = initialFormState;
            newState = {
                ...formValue,
                [targetName]: targetValue,
                enrollmentDate: '',
                fuel: '',
            };
            handleFormChange(setFormValue, formValue, targetName, targetValue);
            expect(setFormValue).toHaveBeenCalledWith(newState);
        });
    });
    describe('When calling it with enrollmentDate as a target', () => {
        test('It should call setFormValue', () => {
            targetName = 'enrollmentDate';
            targetValue = 'test';
            formValue = initialFormState;
            newState = {
                ...formValue,
                [targetName]: targetValue,
                fuel: '',
            };
            handleFormChange(setFormValue, formValue, targetName, targetValue);
            expect(setFormValue).toHaveBeenCalledWith(newState);
        });
    });
    describe('When calling it with brand as a target', () => {
        test('It should call setFormValue', () => {
            targetName = 'fuel';
            targetValue = 'test';
            formValue = initialFormState;
            newState = {
                ...formValue,
                [targetName]: targetValue,
            };
            handleFormChange(setFormValue, formValue, targetName, targetValue);
            expect(setFormValue).toHaveBeenCalledWith(newState);
        });
    });
});
