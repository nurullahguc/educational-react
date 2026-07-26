import {useEffect, useMemo, useRef, useState} from "react";
import {deleteTicket, getTickets} from "../../api/ticketApi";
import {delay, handleHttpError, ToastMessage} from "../../utils/general";
import {globalMoment} from "../../utils/general";
import {TicketStatusBadge} from "../../components/TicketStatusBadge";
import {TicketPriorityBadge} from "../../components/TicketPriorityBadge";
import {LoadingSpinner} from "../../components/LoadingSpinner";
import {ColumnOrderIcon} from "../../components/ColumnOrderIcon";
import {ModalTicketDetail} from "./ModalTicketDetail";
import {Link, useNavigate} from "react-router";
import Swal from "sweetalert2";

export function TicketsGrid() {
    const navigate = useNavigate();
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
        page: 1,
    })
    const modalTicketDetailRef = useRef(null);

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
    const getTicketDetail = (id) => {
        modalTicketDetailRef.current?.openModal(id);
    }

    const handleDelete = async (ticketId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                setIsLoading(true);
                await deleteTicket(ticketId);
                ToastMessage("success", "Ticket deleted successfully.");
                await loadTickets()
            } catch (e) {
                handleHttpError(e);
            } finally {
                setIsLoading(false);
            }
        }
    }

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
                <div className="col-md-12 d-flex justify-content-end align-itmes-center">
                    <Link to="create-ticket" className="btn btn-primary">
                        <i style={{color: 'white'}} className="fa-solid fa-plus mx-2"></i> Create Ticket
                    </Link>
                </div>
            </div>
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
                        <option value="high">High</option>
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
                        >⚡ Refresh
                        </button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="d-flex align-items-center  justify-content-end">
                        <label className="mx-3" htmlFor="generalSerach">Search:</label>
                        <input
                            style={{width: '180px'}}
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
                                    <ColumnOrderIcon text={'Title'}/>
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
                            {tickets.length === 0 ? (
                                <>
                                    <tr>
                                        <td
                                            colSpan={21}
                                            className="text-center text-danger"
                                        >Data not found..
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                <>
                                    {tickets.map((ticket) => {
                                        return (
                                            <tr key={ticket.id}>
                                                <td>{ticket.id}</td>
                                                <td>{ticket.title}</td>
                                                <td>{ticket.description.substring(0, 10)}...</td>
                                                <td>
                                                    <TicketStatusBadge status={ticket.status}/>
                                                </td>
                                                <td>
                                                    <TicketPriorityBadge priority={ticket.priority}/>
                                                </td>
                                                <td>{globalMoment(ticket.due_date)}</td>
                                                <td>{globalMoment(ticket.created_at, "DD.MM.YYYY HH:mm")}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => getTicketDetail(ticket.id)}
                                                    >Detail
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            navigate(`/edit-ticket/${ticket.id}`);
                                                        }}
                                                        className="btn btn-secondary btn-sm mx-2"
                                                    >Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm mx-2"
                                                        onClick={async () => {
                                                            await handleDelete(ticket.id);
                                                        }}
                                                    >Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}

                            </tbody>
                        </table>

                        <div className="row">
                            <div className="col-md-4 text-start">
                                <p>
                                    Showing <b>{meta.from}</b> to <b>{meta.to}</b>
                                    out of <b>{meta.total}</b> records.
                                </p>
                            </div>
                            <div className="col-md-8 d-flex align-items-center justify-content-end">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {meta.links?.map((link, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={`page-item ${link.active ? 'active' : ''}`}
                                                    onClick={() => {
                                                        setSearchOptions(prev => ({
                                                            ...prev,
                                                            page: link.page,
                                                        }))
                                                    }}
                                                >
                                                    <a
                                                        className="page-link"
                                                        disabled={true}
                                                        href="#"
                                                        dangerouslySetInnerHTML={{__html: link.label}}
                                                    ></a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </>
                )
                : (
                    <>
                        <LoadingSpinner fullScreen={false}/>
                    </>
                )}

            <ModalTicketDetail ref={modalTicketDetailRef}/>
        </>
    );
}