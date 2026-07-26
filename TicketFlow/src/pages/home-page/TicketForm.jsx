import {useEffect, useState} from "react";
import {handleHttpError, ToastMessage} from "../../utils/general.jsx";
import {createTicket, getTicket, updateTicket} from "../../api/ticketApi.js";
import {useNavigate, useParams} from "react-router";
import {LoadingSpinner} from "../../components/LoadingSpinner.jsx";

export function TicketForm({mode}) {
    const {id: ticketId} = useParams();
    const formData = {
        title: '',
        description: '',
        status: '',
        priority: '',
    };
    const formTouchedInit = {
        title: false,
        description: false,
        status: false,
        priority: false,
    }
    const [form, setForm] = useState({...formData});
    const [formTouched, setFormTouched] = useState({...formTouchedInit});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const formValidation = {
        title: {
            status: !formTouched.title || form.title.trim() !== "",
            message: formTouched.title && form.title.trim() === "" ? "Enter your title!" : ""
        },
        description: {
            status: !formTouched.description || form.description.trim() !== "",
            message: formTouched.description && form.description.trim() === "" ? "Enter your description!" : ""
        },
        status: {
            status: !formTouched.status || form.status !== "",
            message: formTouched.status && form.status === "" ? "Select a status!" : ""
        },
        priority: {
            status: !formTouched.priority || form.priority !== "",
            message: formTouched.priority && form.priority === "" ? "Select a priority!" : ""
        }
    }

    const handleFormChange = (e) => {
        const {name, value} = e.target;

        setForm(previousForm => ({
            ...previousForm,
            [name]: value,
        }))
        setFormTouched(previousTouched => ({
            ...previousTouched,
            [name]: true,
        }))
    }

    const handleSubmit = async event => {
        event.preventDefault();

        setFormTouched({
            title: true,
            description: true,
            status: true,
            priority: true
        });

        if (!form.title.trim() || !form.description.trim() || !form.status || !form.priority) {
            return;
        }

        if (isLoading) return;

        try {
            setIsLoading(true);
            if (mode === 'create'){
                await createTicket(form);
                ToastMessage('success', 'Ticket created successfully.');
            }
            else {
                await updateTicket(ticketId, form);
                ToastMessage('success', 'Ticket updated successfully.');
            }
            //setForm({...formData});
            navigate('/');
        } catch (e) {
            handleHttpError(e);
        } finally {
            setIsLoading(false);
        }
    }

    const getTicketDetail = async () => {
        if (mode === 'edit' && ticketId) {
            try {
                setIsLoading(true);
                const response = await getTicket(ticketId);
                const ticketData = response.data.data;
                setForm({
                    title: ticketData.title ?? '',
                    description: ticketData.description ?? '',
                    status: ticketData.status ?? '',
                    priority: ticketData.priority ?? '',
                });
            } catch (e) {
                handleHttpError(e);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getTicketDetail();
    }, []);
    return (
        <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                    {isLoading ? (
                        <LoadingSpinner fullScreen={false} />
                    ) : (
                        <div className="row">
                            <div className="col-md-12 my-2">
                                <label htmlFor="ticketTitle">Title:</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm ${formValidation.title.status ? '' : 'is-invalid'}`}
                                    value={form.title}
                                    name="title"
                                    onChange={handleFormChange}
                                    onBlur={handleFormChange}
                                />
                                <div className="invalid-feedback">
                                    {formValidation.title.message}
                                </div>
                            </div>
                            <div className="col-md-12 my-2">
                                <label htmlFor="ticketDescription">Description:</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm ${formValidation.description.status ? '' : 'is-invalid'}`}
                                    value={form.description}
                                    name="description"
                                    onChange={handleFormChange}
                                    onBlur={handleFormChange}
                                />
                                <div className="invalid-feedback">
                                    {formValidation.description.message}
                                </div>
                            </div>
                            <div className="col-md-6 my-2">
                                <label htmlFor="ticketStatus">Status:</label>
                                <select
                                    className={`form-control form-control-sm ${formValidation.status.status ? '' : 'is-invalid'}`}
                                    name="status"
                                    id="ticketStatus"
                                    value={form.status}
                                    onChange={handleFormChange}
                                    onBlur={handleFormChange}
                                >
                                    <option value="">Select</option>
                                    <option value="open">Open</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                                <div className="invalid-feedback">
                                    {formValidation.status.message}
                                </div>
                            </div>
                            <div className="col-md-6 my-2">
                                <label htmlFor="ticketPriority">Priority:</label>
                                <select
                                    className={`form-control form-control-sm ${formValidation.priority.status ? '' : 'is-invalid'}`}
                                    name="priority"
                                    id="ticketPriority"
                                    value={form.priority}
                                    onChange={handleFormChange}
                                    onBlur={handleFormChange}
                                >
                                    <option value="">Select</option>
                                    <option value="critical">Critical</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                                <div className="invalid-feedback">
                                    {formValidation.priority.message}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary my-5">Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}