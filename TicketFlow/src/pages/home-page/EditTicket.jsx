import {Header} from "../../components/Header";
import {TicketForm} from "./TicketForm.jsx";

export function EditTicket() {

    return (
        <>
            <Header/>
            <div className="container">
                <div className=" mt-5">
                    <h1 className="text-center">Edit the Ticket</h1>
                    <TicketForm mode="edit"/>
                </div>
            </div>
        </>
    );
}