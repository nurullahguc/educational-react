export function TicketStatusBadge({ status }) {
    const statusClassSelector = (status) => {
        switch (status) {
            case 'open':
                return 'bg-primary'
            case 'in_progress':
                return 'bg-info'
            case 'resolved':
                return 'bg-success'
            case 'closed':
                return 'bg-dark'

            default:
                return 'bg-dark'

        }
    }
    return (
        <>
            <span
                className={`badge rounded-pill ${statusClassSelector(status)}`}
            >{status}</span>
        </>
    );
}