import { ChangeEventHandler } from 'react';
import { FormValueI } from '../../../interfaces/form.interfaces';
import './DateInput.scss';

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
        <div className="date-input">
            <label className="date-input__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="date-input__input"
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
