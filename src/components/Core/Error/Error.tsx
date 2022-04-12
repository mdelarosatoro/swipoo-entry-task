import './Error.scss';

function Error({ message }: { message: string }) {
    return (
        <div className="error">
            <p className="error__message">{message}</p>
        </div>
    );
}

export default Error;
