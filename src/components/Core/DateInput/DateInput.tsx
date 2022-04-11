import { ChangeEventHandler } from 'react';
import { FormValueI } from '../../../interfaces/form.interfaces';

function DateInput({
    id,
    label,
    name,
    formValue,
    handleChange,
}: {
    id: string;
    label: string;
    name: string;
    formValue: FormValueI;
    handleChange: ChangeEventHandler;
}) {
    return (
        <div className="form__input-container">
            <label className="form__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="form__input"
                value={formValue.enrollmentDate}
                type="date"
                name={name}
                id={id}
                onChange={handleChange}
            />
        </div>
    );
}
export default DateInput;
