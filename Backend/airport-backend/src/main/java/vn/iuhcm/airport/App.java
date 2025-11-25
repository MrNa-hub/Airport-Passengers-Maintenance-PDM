package vn.iuhcm.airport;

import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import vn.iuhcm.airport.passenger.Passenger;
import vn.iuhcm.airport.passenger.PassengerDAO;

import java.util.List;

public class App {

    public static void main(String[] args) {

        // Tạo Javalin app + bật CORS cho frontend
        Javalin app = Javalin.create(config -> {
            config.plugins.enableCors(cors -> {
                cors.add(it -> {
                    // cho phép mọi origin; nếu muốn chặt hơn thì chỉ cho http://localhost:3000
                    it.anyHost();
                });
            });
        });

        PassengerDAO passengerDAO = new PassengerDAO();

        // ===================== PASSENGER API =====================

        // GET /api/passengers  --> trả về toàn bộ passengers
        app.get("/api/passengers", ctx -> {
            try {
                List<Passenger> passengers = passengerDAO.findAll();
                ctx.json(passengers);
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching passengers: " + e.getMessage());
            }
        });

        // GET /api/passengers/:id  --> tìm 1 passenger
        app.get("/api/passengers/{id}", ctx -> {
            String id = ctx.pathParam("id");
            try {
                Passenger p = passengerDAO.findById(id);
                if (p == null) {
                    ctx.status(HttpStatus.NOT_FOUND);
                    ctx.result("Passenger not found");
                } else {
                    ctx.json(p);
                }
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching passenger: " + e.getMessage());
            }
        });

        // POST /api/passengers  --> thêm passenger mới
        app.post("/api/passengers", ctx -> {
            try {
                // yêu cầu Passenger có constructor rỗng + getter/setter hoặc field public
                Passenger input = ctx.bodyAsClass(Passenger.class);
                Passenger created = passengerDAO.insert(input);
                ctx.status(HttpStatus.CREATED);
                ctx.json(created);
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.BAD_REQUEST);
                ctx.result("Error creating passenger: " + e.getMessage());
            }
        });

        // PUT /api/passengers/:id  --> update passenger
        app.put("/api/passengers/{id}", ctx -> {
            String id = ctx.pathParam("id");
            try {
                Passenger input = ctx.bodyAsClass(Passenger.class);
                // đảm bảo ID khớp path
                input.passengerID = id;

                boolean ok = passengerDAO.update(input);
                if (ok) {
                    ctx.status(HttpStatus.NO_CONTENT);
                } else {
                    ctx.status(HttpStatus.NOT_FOUND);
                    ctx.result("Passenger not found");
                }
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.BAD_REQUEST);
                ctx.result("Error updating passenger: " + e.getMessage());
            }
        });

        // DELETE /api/passengers/:id  --> xóa passenger
        app.delete("/api/passengers/{id}", ctx -> {
            String id = ctx.pathParam("id");
            try {
                boolean deleted = passengerDAO.delete(id);
                if (deleted) {
                    ctx.status(HttpStatus.NO_CONTENT);
                } else {
                    ctx.status(HttpStatus.NOT_FOUND);
                    ctx.result("Passenger not found");
                }
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error deleting passenger: " + e.getMessage());
            }
        });
        // ⭐ Quan trọng: chạy server Javalin
        app.start(7070);
    }
}
     