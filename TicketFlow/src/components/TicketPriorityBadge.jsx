export function TicketPriorityBadge({ priority }) {
    const priorityClassSelector = (priority) => {
        switch (priority) {
            case 'critical':
                return 'bg-danger'
            case 'high':
                return 'bg-warning'
            case 'medium':
                return 'bg-primary'
            case 'low':
                return 'bg-secondary'

            default:
                return 'bg-dark'

        }
    }
    return (
        <>
            <span
                className={`badge rounded-pill ${priorityClassSelector(priority)}`}
            >{priority}</span>
        </>
    );
}