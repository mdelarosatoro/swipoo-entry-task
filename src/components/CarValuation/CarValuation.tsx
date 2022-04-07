import { ValuationI } from '../../interfaces/cars.interfaces';
import './CarValuation.scss';

function CarValuation({
    valuationOverTime,
}: {
    valuationOverTime: ValuationI[];
}) {
    return (
        <div className="valuation">
            <div className="valuation__title-container">
                <p className="valuation__title">Valoración Venal</p>
            </div>
            {valuationOverTime.map((item) => (
                <div key={item.year} className="valuation__row">
                    <p className="valuation__cell valuation__cell--field">
                        {item.year}
                    </p>
                    <p className="valuation__cell">
                        €{item.value.toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default CarValuation;
