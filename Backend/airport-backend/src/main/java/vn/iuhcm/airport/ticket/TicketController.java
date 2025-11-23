package vn.iuhcm.airport.ticket;

import io.javalin.http.Context;
import java.util.List;

public class TicketController {

    private static final TicketDAO ticketDAO = new TicketDAO();

    public static void getAll(Context ctx) {
        List<Ticket> list = ticketDAO.findAll();
        ctx.json(list);
    }

    public static void getById(Context ctx) {
        String id = ctx.pathParam("id");
        Ticket t = ticketDAO.findById(id);

        if (t == null) {
            ctx.status(404).result("Ticket not found");
        } else {
            ctx.json(t);
        }
    }

    public static void create(Context ctx) {
        // 1. Đọc JSON body và map sang object Ticket
        Ticket body = ctx.bodyAsClass(Ticket.class);

        // 2. Gọi DAO, nhận về Ticket đã insert (hoặc null nếu fail)
        Ticket created = ticketDAO.insert(body);

        // 3. Nếu insert thành công → created != null
        if (created != null) {
            ctx.status(201).json(created);
        } else {
            ctx.status(500).result("Cannot insert ticket");
        }
    }

}
