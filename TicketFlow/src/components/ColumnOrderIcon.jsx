export function ColumnOrderIcon({text, column, searchOptions, setSearchOptions}) {
    const order = searchOptions?.direction;
    const sortColumn = searchOptions?.sort;

    const isActiveColumn = sortColumn === column;
    const handleClick = () =>{
        setSearchOptions(prev => ({
            ...prev,
            direction: order === 'asc' ? 'desc' : 'asc',
            sort: column
        }));
    }

    return (
        <div onClick={handleClick} style={{cursor: "pointer"}}>
            {text}

            {isActiveColumn && (
                <i
                    style={{color: "green"}}
                    className={`mx-3 fa-solid fa-arrow-${
                        order === "asc" ? "up" : "down"
                    }`}
                />
            )}
        </div>
    );
}