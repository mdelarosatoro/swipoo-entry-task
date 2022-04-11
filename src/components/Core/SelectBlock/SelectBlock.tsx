import { ChangeEventHandler } from 'react';

function SelectBlock({
    label,
    value,
    handleChange,
    options,
    name,
}: {
    label: string;
    value: string;
    handleChange: ChangeEventHandler;
    options: string[];
    name: string;
}) {
    return (
        <div className="form__input-container">
            <label className="form__label" htmlFor={name}>
                {label}
            </label>
            <select
                className="form__input"
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {' '}
                    -- select an option --{' '}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectBlock;
