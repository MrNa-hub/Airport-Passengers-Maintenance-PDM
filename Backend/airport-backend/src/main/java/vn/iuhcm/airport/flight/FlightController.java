package vn.iuhcm.airport.flight;

import io.javalin.http.Context;
import java.util.List;
import java.sql.SQLException;   // ✅ thêm import này

public class FlightController {

    private static final FlightDAO flightDAO = new FlightDAO();

    // GET /api/flights
    public static void getAll(Context ctx) {
        try {
            // lấy list flight từ DAO
            List<Flight> flights = flightDAO.findAll();
            // trả về JSON
            ctx.json(flights);
        } catch (SQLException e) {
            e.printStackTrace();
            ctx.status(500).result("Database error when loading flights");
        }
    }

    // GET /api/flights/{id}
    public static void getById(Context ctx) {
        String id = ctx.pathParam("id");

        try {
            Flight f = flightDAO.findById(id);

            if (f == null) {
                ctx.status(404).result("Flight not found");
            } else {
                ctx.json(f);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            ctx.status(500).result("Database error when loading flight");
        }
    }

    // POST /api/flights
    public static void create(Context ctx) {
        try {
            // đọc body JSON thành object Flight
            Flight body = ctx.bodyAsClass(Flight.class);

            // DAO.insert trả về int (số dòng thêm được)
            int rows = flightDAO.insert(body);

            if (rows > 0) {
                ctx.status(201).json(body);
            } else {
                ctx.status(500).result("Cannot insert flight");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            ctx.status(500).result("Database error when inserting flight");
        }
    }
}
