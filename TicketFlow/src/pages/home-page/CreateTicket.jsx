import { Header } from "../../components/Header";
export function CreateTicket() {
    return (
        <>
            <Header />

            <div className="container">
                <div className=" mt-5">
                    <h1 className="text-center">Create a Ticket</h1>

                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-8">
                            <form>
                                <div className="row">
                                    <div className="col-md-12 my-2">
                                        <label htmlFor="ticketTitle">Title:</label>
                                        <input type="text" className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <label htmlFor="ticketDescription">Description:</label>
                                        <input type="text" className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label htmlFor="ticketStatus">Description:</label>
                                        <select
                                            className="form-control form-control-sm"
                                            name="ticketStatus"
                                            id="ticketStatus">
                                            <option value="">Select</option>
                                            <option value="open">Open</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <label htmlFor="ticketPiriority">Description:</label>
                                        <select
                                            className="form-control form-control-sm"
                                            name="ticketPiriority"
                                            id="ticketStatus">
                                            <option value="">Select</option>
                                            <option value="critical">Critical</option>
                                            <option value="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <button
                                        type="submit"
                                        className="btn btn-primary my-5">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}