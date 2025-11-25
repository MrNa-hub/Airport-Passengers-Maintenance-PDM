package vn.iuhcm.airport;

import io.javalin.Javalin;
import io.javalin.http.HttpStatus;
import vn.iuhcm.airport.luggage.Luggage;
import vn.iuhcm.airport.passenger.*;
import vn.iuhcm.airport.ticket.Boarding;
import vn.iuhcm.airport.ticket.BoardingDAO;
import vn.iuhcm.airport.ticket.Ticket;
import vn.iuhcm.airport.ticket.TicketDAO;
import vn.iuhcm.airport.luggage.SecurityRestrictedItemsFoundDAO;

import java.util.List;

public class App {

    public static void main(String[] args) {

        // Create Javalin app + enable CORS for frontend
        Javalin app = Javalin.create(config -> {
            config.plugins.enableCors(cors -> {
                cors.add(it -> {
                    it.anyHost();
                });
            });
        });

        // Initialize DAOs
        PassengerDAO passengerDAO = new PassengerDAO();
        PassengerPhoneNumDAO passengerPhoneNumDAO = new PassengerPhoneNumDAO();
        PassengerTravelHistoryDAO passengerTravelHistoryDAO = new PassengerTravelHistoryDAO();
        BoardingDAO boardingDAO = new BoardingDAO();

        // ===================== PASSENGER API =====================

        // GET /api/passengers
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

        // GET /api/passengers/:id
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

        // POST /api/passengers
        app.post("/api/passengers", ctx -> {
            try {
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

        // PUT /api/passengers/:id
        app.put("/api/passengers/{id}", ctx -> {
            String id = ctx.pathParam("id");
            try {
                Passenger input = ctx.bodyAsClass(Passenger.class);
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

        // DELETE /api/passengers/:id
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

        // ===================== PASSENGER PHONE NUMBER API =====================

        // GET /api/passenger-phone-nums
        app.get("/api/passenger-phone-nums", ctx -> {
            try {
                List<PassengerPhoneNum> list = passengerPhoneNumDAO.findAll();
                ctx.json(list);
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching phone numbers: " + e.getMessage());
            }
        });

        // GET /api/passenger-phone-nums/:passengerId
        // Note: Returns a LIST because one passenger can have multiple phones
        app.get("/api/passenger-phone-nums/{passengerId}", ctx -> {
            String id = ctx.pathParam("passengerId");
            try {
                List<PassengerPhoneNum> list = passengerPhoneNumDAO.findByPassengerId(id);
                ctx.json(list);
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching phone numbers for passenger: " + e.getMessage());
            }
        });

        // ===================== PASSENGER TRAVEL HISTORY API =====================

        // GET /api/passenger-travel-histories
        app.get("/api/passenger-travel-histories", ctx -> {
            try {
                List<PassengerTravelHistory> list = passengerTravelHistoryDAO.findAll();
                ctx.json(list);
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching travel histories: " + e.getMessage());
            }
        });

        // GET /api/passenger-travel-histories/:passengerId
        // Note: Returns a LIST
        app.get("/api/passenger-travel-histories/{passengerId}", ctx -> {
            String id = ctx.pathParam("passengerId");
            try {
                List<PassengerTravelHistory> list = passengerTravelHistoryDAO.findByPassengerId(id);
                ctx.json(list);
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching history for passenger: " + e.getMessage());
            }
        });

        // ===================== BOARDING API =====================

        // GET /api/boardings
        app.get("/api/boardings", ctx -> {
            try {
                List<Boarding> list = boardingDAO.findAll();
                ctx.json(list);
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching boarding records: " + e.getMessage());
            }
        });

        // GET /api/boardings/:id (By PassID/BoardingID)
        app.get("/api/boardings/{id}", ctx -> {
            String id = ctx.pathParam("id");
            try {
                Boarding b = boardingDAO.findById(id);
                if (b == null) {
                    ctx.status(HttpStatus.NOT_FOUND);
                    ctx.result("Boarding record not found");
                } else {
                    ctx.json(b);
                }
            } catch (Exception e) {
                e.printStackTrace();
                ctx.status(HttpStatus.INTERNAL_SERVER_ERROR);
                ctx.result("Error fetching boarding record: " + e.getMessage());
            }
        });

        // ===================== TICKET API =====================

        // PUT /api/tickets/:id
        app.put("/api/tickets/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Ticket input = ctx.bodyAsClass(Ticket.class);
            input.ticketID = id;
            if (ticketDAO.update(input)) {
                ctx.status(HttpStatus.NO_CONTENT);
            } else {
                ctx.status(HttpStatus.NOT_FOUND);
            }
        });

        // DELETE /api/tickets/:id
        app.delete("/api/tickets/{id}", ctx -> {
            String id = ctx.pathParam("id");
            if (ticketDAO.delete(id)) {
                ctx.status(HttpStatus.NO_CONTENT);
            } else {
                ctx.status(HttpStatus.NOT_FOUND);
            }
        });

        // ===================== LUGGAGE API =====================

        // PUT /api/luggage/:id
        app.put("/api/luggage/{id}", ctx -> {
            String id = ctx.pathParam("id");
            Luggage input = ctx.bodyAsClass(Luggage.class);
            input.luggageID = id;
            if (luggageDAO.update(input)) {
                ctx.status(HttpStatus.NO_CONTENT);
            } else {
                ctx.status(HttpStatus.NOT_FOUND);
            }
        });

        // DELETE /api/luggage/:id
        app.delete("/api/luggage/{id}", ctx -> {
            String id = ctx.pathParam("id");
            if (luggageDAO.delete(id)) {
                ctx.status(HttpStatus.NO_CONTENT);
            } else {
                ctx.status(HttpStatus.NOT_FOUND);
            }
        });

        // Run Javalin server
        app.start(7070);
    }
}