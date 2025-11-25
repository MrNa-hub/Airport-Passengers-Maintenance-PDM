package vn.iuhcm.airport.passenger;

import io.javalin.http.Context;
import java.util.List;

public class PassengerController {

    private static final PassengerDAO passengerDAO = new PassengerDAO();

    // GET /api/passengers
    public static void getAll(Context ctx) {
        List<Passenger> passengers = passengerDAO.findAll();
        ctx.json(passengers);
    }

    // GET /api/passengers/{id}
    public static void getPassenById(Context ctx) {
        String id = ctx.pathParam("id");

        Passenger p = passengerDAO.findById(id);

        if (p == null) {
            ctx.status(404).result("Passenger not found");
        } else {
            ctx.json(p);
        }
    }

    // POST /api/passengers
    public static void create(Context ctx) {
        Passenger body = ctx.bodyAsClass(Passenger.class);

        try {
            Passenger created = passengerDAO.insert(body);

            ctx.status(201).json(created);

        } catch (Exception e) {
            ctx.status(500).result("Cannot insert passenger: " + e.getMessage());
        }
    }
}
