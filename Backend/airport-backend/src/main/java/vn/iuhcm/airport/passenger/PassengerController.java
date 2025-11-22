package vn.iuhcm.airport.passenger;

import io.javalin.http.Context;
import java.util.List;

public class PassengerController {

    private static final PassengerDAO passengerDAO = new PassengerDAO();

    public static void getAll(Context ctx) {
        List<Passenger> passengers = passengerDAO.findAll();
        ctx.json(passengers);
    }

    public static void getById(Context ctx) {
        String id = ctx.pathParam("id");
        Passenger p = passengerDAO.findById(id);

        if (p == null) {
            ctx.status(404).result("Passenger not found");
        } else {
            ctx.json(p);
        }
    }

    public static void create(Context ctx) {
        Passenger body = ctx.bodyAsClass(Passenger.class);
        boolean ok = passengerDAO.insert(body);

        if (ok) ctx.status(201).json(body);
        else    ctx.status(500).result("Cannot insert passenger");
    }
}
