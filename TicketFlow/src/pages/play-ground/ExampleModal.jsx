import { useImperativeHandle, useRef, useState } from "react";
import { Modal } from "bootstrap";

export function ExampleModal({ ref }) {
    const el = useRef(null);
    const [data] = useState(null);

    const handleModalOpen = (payload) => {
        console.log(payload);
        modal().show();
    }

    const modal = () =>
        Modal.getOrCreateInstance(el.current, { backdrop: "static", keyboard: false });

    useImperativeHandle(ref, () => ({
        openModal: (payload) => {
            handleModalOpen(payload);
        },
        closeModal: () => modal().hide(),
    }), [handleModalOpen]);

    return (
        <div ref={el} className="modal fade" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ticket Detail</h5>
                        <button type="button" className="btn-close" onClick={() => modal().hide()} />
                    </div>
                    <div className="modal-body">
                        <p>{data?.name} {data?.surname}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => modal().hide()}>Close</button>
                        <button className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}