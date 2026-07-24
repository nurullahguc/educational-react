import { useEffect, useMemo, useState } from "react";
import { getTickets } from "../../api/ticketApi";
import { delay, handleHttpError } from "../../utils/general";
import { globalMoment } from "../../utils/general";
import { TicketStatusBadge } from "../../components/TicketStatusBadge";
import { TicketPriorityBadge } from "../../components/TicketPriorityBadge";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { ColumnOrderIcon } from "../../components/ColumnOrderIcon";

export function TicketsGrid() {
    const [tickets, setTickets] = useState([]);
    const [meta, setMeta] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [ticketId, setTicketId] = useState("");
    const [ticketSearch, setTicketSearch] = useState("");
    const [searchOptions, setSearchOptions] = useState({
        sort: null,
        direction: null,
        per_page: 10,
        search: '',
        status: '',
        priority: '',
        id: '',
    })

    const delayedSearchId = useMemo(
        () =>
            delay((value) => {
                setSearchOptions((prev) => ({
                    ...prev,
                    id: value,
                }));
            }, 650),
        []
    );
    const delayedSearch = useMemo(
        () =>
            delay((value) => {
                setSearchOptions((prev) => ({
                    ...prev,
                    search: value,
                }));
            }, 650),
        []
    );

    const loadTickets = async (showLoading = true) => {
        try {
            if (showLoading) {
                setIsLoading(true);
            }

            const response = await getTickets(searchOptions);

            setTickets(response.data.data)
            setMeta(response.data.meta)
        } catch (e) {
            handleHttpError(e);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchOptions]);

    return (
        <>

            <div className="row my-2">
                <div className="col-4">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        className="form-control form-control-sm"
                        value={searchOptions.status}
                        onChange={(e) => {
                            setSearchOptions(prev => ({
                                ...prev,
                                status: e.target.value
                            }))
                        }}
                    >
                        <option value="">All</option>
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
                <div className="col-4">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        id="priority"
                        className="form-control form-control-sm"
                        value={searchOptions.priority}
                        onChange={(e) => {
                            setSearchOptions(prev => ({
                                ...prev,
                                priority: e.target.value
                            }))
                        }}
                    >
                        <option value="">All</option>
                        <option value="critical">Critical</option>
                        <option value="high">High </option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div className="col-4">
                    <label htmlFor="ticketId">ID:</label>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        value={ticketId}
                        onChange={(e) => {
                            const value = e.target.value;

                            setTicketId(value);       // input anında güncellenir
                            delayedSearchId(value);     // API filtresi 500 ms sonra güncellenir
                        }}
                    />
                </div>
            </div>
            <div className="row my-2">
                <div className="col-md-4">
                    <div className="d-flex align-items-center gap-2">
                        <label htmlFor="pageSize" className="mb-0">
                            Show:
                        </label>

                        <select
                            id="pageSize"
                            className="form-select form-select-sm w-auto"
                            value={searchOptions.per_page}
                            onChange={(e) => {
                                setSearchOptions(prev => ({
                                    ...prev,
                                    per_page: Number(e.target.value)
                                }))
                            }}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex align-items-center justify-content-center">
                        <button
                            className="btn btn-primary"
                            onClick={() => loadTickets()}
                            disabled={isLoading}
                        >⚡ Refresh</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex align-items-center  justify-content-end">
                        <label className="mx-3" htmlFor="generalSerach">Search:</label>
                        <input
                            style={{ width: '180px' }}
                            type="text"
                            className="form-control form-control-sm"
                            value={ticketSearch}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTicketSearch(value);
                                delayedSearch(value);
                            }}
                        />
                    </div>
                </div>
            </div>
            {!isLoading ?
                (
                    <>
                        <table className="table table-pirmary table-striped table-bordered text-start">
                            <thead>
                                <tr>
                                    <th>
                                        <ColumnOrderIcon
                                            text="ID"
                                            column="id"
                                        />
                                    </th>
                                    <th>
                                        <ColumnOrderIcon text={'Title'} />
                                    </th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>Due Date</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => {
                                    return (
                                        <tr key={ticket.id}>
                                            <td>{ticket.id}</td>
                                            <td>{ticket.title}</td>
                                            <td>{ticket.description.substring(0, 10)}...</td>
                                            <td>
                                                <TicketStatusBadge status={ticket.status} />
                                            </td>
                                            <td>
                                                <TicketPriorityBadge priority={ticket.priority} />
                                            </td>
                                            <td>{globalMoment(ticket.due_date)}</td>
                                            <td>{globalMoment(ticket.created_at, "DD.MM.YYYY HH:mm")}</td>
                                            <td>
                                                <button className="btn btn-primary btn-sm">Detail</button>
                                                <button className="btn btn-secondary btn-sm mx-2">Edit</button>
                                                <button className="btn btn-danger btn-sm mx-2">Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <div className="row">
                            <div className="col-md-4 text-start">
                                <p>Showing <b>10</b> out of <b>150</b> records.</p>
                            </div>
                            <div className="col-md-8 d-flex align-items-center justify-content-end">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {meta.links?.map((link, index) => {
                                            if (index === 0) {
                                                return (
                                                    <li
                                                        key={index}
                                                        className={`page-item ${link.active ? 'active' : ''}`}
                                                    >
                                                        <a
                                                            className="page-link"
                                                            href="#"
                                                        >Previous</a>
                                                    </li>
                                                );
                                            } else {

                                                return (
                                                    <li key={index} className={`page-item ${link.active ? 'active' : ''}`}
                                                    >
                                                        <a
                                                            className="page-link"
                                                            href="#"
                                                        >{link.page}</a>
                                                    </li>
                                                );
                                            }
                                        })}
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>
                )
                : (
                    <>
                        <LoadingSpinner fullScreen={false} />
                    </>
                )}
        </>
    );
}