export function LoadingSpinner({ message = "Loading...", fullScreen = true }) {
    const wrapperClass = fullScreen
        ? "d-flex flex-column justify-content-center align-items-center vh-100"
        : "d-flex flex-column justify-content-center align-items-center py-5";

    return (
        <div className={wrapperClass}>
            <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
            >
                <span className="visually-hidden">{message}</span>
            </div>
            {message && (
                <p className="mt-3 text-secondary fw-medium">{message}</p>
            )}
        </div>
    );
}
