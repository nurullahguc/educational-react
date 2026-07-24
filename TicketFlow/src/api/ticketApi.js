import http from "./http";

export const getTickets = async (options) => {
    return await http.get("/api/tickets", {
        params: {
            sort: options?.sort ?? null,
            direction: options?.direction ?? null,
            per_page: options?.per_page ?? null,
            search: options?.search ?? null,
            status: options?.status ?? null,
            priority: options?.priority ?? null,
            id: options?.id ?? null,
        }
    });
}

export const createTicket = async (ticket) => {
    await http.post("/api/tickets", ticket);
}

export const getTicket = async (ticketId) => {
    const resposne = await http.get(`/api/tickets/${ticketId}`);

    return resposne.data.data;
}

export const updateTicket = async (ticketId, ticket) => {
    await http.put(`/api/tickets/${ticketId}`, ticket);
}

export const deleteTicket = async (ticketId) => {
    await http.delete(`/api/tickets/${ticketId}`);
}