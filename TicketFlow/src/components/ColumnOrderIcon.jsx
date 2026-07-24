export function ColumnOrderIcon({ text, order = null }) {
    let icon = null;
    if (order !== null) {
        icon = (<i className={`fa-solid fa-arrow-${order === 'asc' ? 'up' : 'down'}`}></i>);
    }
    return (
        <>
            {text} {icon}
        </>
    );
}