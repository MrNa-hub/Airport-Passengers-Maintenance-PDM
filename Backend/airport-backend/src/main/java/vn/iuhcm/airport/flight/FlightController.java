package vn.iuhcm.airport.flight;

import io.javalin.http.Context;
import java.util.List;

public class FlightController {

    private static final FlightDAO flightDAO = new FlightDAO();

    public static void getAll(Context ctx) {
        ctx.json(flightDAO.findAll());
    }

    public static void getById(Context ctx) {
        String id = ctx.pathParam("id");
        Flight f = flightDAO.findById(id);

        if (f == null) {
            ctx.status(404).result("Flight not found");
        } else {
            ctx.json(f);
        }
    }

    public static void create(Context ctx) {
        Flight body = ctx.bodyAsClass(Flight.class);
        boolean ok = flightDAO.insert(body);

        if (ok) ctx.status(201).json(body);
        else    ctx.status(500).result("Cannot insert flight");
    }
}
