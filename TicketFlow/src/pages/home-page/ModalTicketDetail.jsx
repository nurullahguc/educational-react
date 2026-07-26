import { useImperativeHandle, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { getTicket } from "../../api/ticketApi";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { handleHttpError, globalMoment } from "../../utils/general";
import { TicketPriorityBadge } from "../../components/TicketPriorityBadge"
import { TicketStatusBadge } from "../../components/TicketStatusBadge"

export function ModalTicketDetail({ ref }) {
    const el = useRef(null);
    const [ticketData, setTicketData] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const handleModalOpen = async (id) => {
        setIsLoading(true);
        modal().show();

        try {
            const response = await getTicket(id);
            setTicketData(response.data.data)
            // console.log("data:",response.data.data);
        } catch (e) {
            handleHttpError(e);
        } finally {
            setIsLoading(false);
        }
    }

    const modal = () =>
        Modal.getOrCreateInstance(el.current, { backdrop: "static", keyboard: false });

    useImperativeHandle(ref, () => ({
        openModal: (payload) => {
            handleModalOpen(payload);
        },
        closeModal: () => modal().hide(),
    }), []);

    return (
        <div ref={el} className="modal fade" tabIndex={-1}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ticket Detail</h5>
                        <button type="button" className="btn-close" onClick={() => modal().hide()} />
                    </div>
                    <div className="modal-body">
                        {isLoading
                            ? <LoadingSpinner fullScreen={false} />
                            : <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="" className="mx-3">ID: </label>
                                        <b>{ticketData?.id}</b>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className="mx-3">Title: </label>
                                        <b>{ticketData?.title}</b>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className="mx-3">Due Date: </label>
                                        <b>{globalMoment(ticketData?.due_date)}</b>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className="mx-3">Created At: </label>
                                        <b>{globalMoment(ticketData?.created_at, 'DD.MM.YYYY HH:mm')}</b>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className="mx-3">Status: </label>
                                        <b><TicketStatusBadge status={ticketData?.status} /></b>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="" className="mx-3">Priority: </label>
                                        <b><TicketPriorityBadge priority={ticketData?.priority} /></b>
                                    </div>

                                    <div className="col-md-12">
                                        <label htmlFor="" className="mx-3">Description: </label>
                                        <b>{ticketData?.description}</b>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => modal().hide()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}