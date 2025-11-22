package vn.iuhcm.airport.luggage;

import io.javalin.http.Context;
import java.util.List;

public class LuggageController {

    private static final LuggageDAO luggageDAO = new LuggageDAO();

    public static void getAll(Context ctx) {
        ctx.json(luggageDAO.findAll());
    }

    public static void getById(Context ctx) {
        String id = ctx.pathParam("id");
        Luggage l = luggageDAO.findById(id);

        if (l == null) {
            ctx.status(404).result("Luggage not found");
        } else {
            ctx.json(l);
        }
    }

    public static void create(Context ctx) {
        Luggage body = ctx.bodyAsClass(Luggage.class);
        boolean ok = luggageDAO.insert(body);

        if (ok)
            ctx.status(201).json(body);
        else
            ctx.status(500).result("Cannot insert luggage");
    }

    // tem
    /**
     * Lấy tất cả luggage records theo Ticket ID
     * Route: /tickets/:ticketId/luggages
     */
    public static void getAllByTicketId(Context ctx) {
        String ticketId = ctx.pathParam("ticketId");
        List<Luggage> luggages = luggageDAO.findByTicketId(ticketId);

        if (luggages.isEmpty()) {
            // Return 404 or an empty array depending on preference. Empty array is standard
            // for listings.
            ctx.status(200).json(luggages);
        } else {
            ctx.json(luggages);
        }
    }
    // tem
}
