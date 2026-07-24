import { Header } from "../../components/Header";
import { getTickets } from "../../api/ticketApi";
import { TicketsGrid } from "./TicketsGrid";

export function HomePage() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="text-center mt-5">
                    <h1>Tickets</h1>
                    <p className="lead">Welcome to the Home Page! We'll be listening your tickets soon!</p>
                </div>
            </div>

            <div className="container">
                <TicketsGrid />
            </div>
        </>
    );
}