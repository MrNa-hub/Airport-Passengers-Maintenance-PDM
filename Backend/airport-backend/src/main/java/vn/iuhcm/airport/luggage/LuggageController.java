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

        if (ok) ctx.status(201).json(body);
        else    ctx.status(500).result("Cannot insert luggage");
    }
}
