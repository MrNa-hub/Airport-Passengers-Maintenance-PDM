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
        // 1. Đọc body từ request
        Luggage body = ctx.bodyAsClass(Luggage.class);

        // 2. Gọi DAO insert, nhận về đối tượng đã insert (hoặc null nếu fail)
        Luggage created = luggageDAO.insert(body);

        // 3. Trả response
        if (created != null) {
            // Insert thành công
            ctx.status(201).json(created);
        } else {
            // Insert thất bại
            ctx.status(500).result("Cannot insert luggage");
        }
    }

    public static void getAllByTicketId(Context ctx) {
        String ticketId = ctx.pathParam("ticketId");
        List<Luggage> luggages = luggageDAO.findByTicketId(ticketId);

        if (luggages.isEmpty()) {
            ctx.status(200).json(luggages);
        } else {
            ctx.json(luggages);
        }
    }
}
