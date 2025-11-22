package vn.iuhcm.airport;

import io.javalin.Javalin;
import java.util.List;
import vn.iuhcm.airport.passenger.Passenger;
import vn.iuhcm.airport.passenger.PassengerDAO;
import vn.iuhcm.airport.passenger.PassengerPhoneNum;
import vn.iuhcm.airport.passenger.PassengerPhoneNumDAO;
import vn.iuhcm.airport.passenger.PassengerTravelHistory;
import vn.iuhcm.airport.passenger.PassengerTravelHistoryDAO;
import vn.iuhcm.airport.ticket.Ticket;
import vn.iuhcm.airport.ticket.TicketDAO;
import vn.iuhcm.airport.luggage.Luggage;
import vn.iuhcm.airport.luggage.LuggageController;
import vn.iuhcm.airport.luggage.LuggageDAO;
import vn.iuhcm.airport.flight.Flight;
import vn.iuhcm.airport.flight.FlightDAO;
import vn.iuhcm.airport.employee.Employee;
import vn.iuhcm.airport.employee.EmployeeDAO;

public class App {
    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {
            config.plugins.enableCors(cors -> {
                cors.addRule(corsConfig -> {
                    corsConfig.anyHost();
                    corsConfig.allowCredentials = true;
                });
            });
        });
        app.start(7070);

        // DAO objects
        PassengerDAO passengerDAO = new PassengerDAO();
        PassengerPhoneNumDAO passengerPhoneNumDAO = new PassengerPhoneNumDAO();
        PassengerTravelHistoryDAO passengerTravelHistoryDAO = new PassengerTravelHistoryDAO();
        TicketDAO ticketDAO = new TicketDAO();
        LuggageDAO luggageDAO = new LuggageDAO();
        FlightDAO flightDAO = new FlightDAO();
        EmployeeDAO employeeDAO = new EmployeeDAO();

        // Test route
        app.get("/", ctx -> ctx.result("Airport Backend Running"));

        // PASSENGERS
        app.get("/api/passengers", ctx -> ctx.json(passengerDAO.findAll()));

        app.get("/api/passengers/:id", ctx -> {
            Passenger p = passengerDAO.findById(ctx.pathParam("id"));
            if (p == null) {
                ctx.status(404).result("Passenger not found");
            } else {
                ctx.json(p);
            }
        });

        app.post("/api/passengers", ctx -> {
            try {
                Passenger p = ctx.bodyAsClass(Passenger.class);
                passengerDAO.insert(p);
                ctx.status(201).json(p);
            } catch (Exception e) {
                ctx.status(500).result("Cannot insert passenger: " + e.getMessage());
            }
        });

        app.put("/api/passengers/:id", ctx -> {
            try {
                Passenger p = ctx.bodyAsClass(Passenger.class);
                p.passengerID = ctx.pathParam("id");
                boolean ok = passengerDAO.update(p);
                if (ok) {
                    ctx.json(passengerDAO.findById(p.passengerID));
                } else {
                    ctx.status(404).result("Passenger not found");
                }
            } catch (Exception e) {
                ctx.status(500).result("Cannot update passenger: " + e.getMessage());
            }
        });

        app.delete("/api/passengers/:id", ctx -> {
            try {
                String id = ctx.pathParam("id");
                boolean ok = passengerDAO.delete(id);
                if (ok) {
                    ctx.status(204);
                } else {
                    ctx.status(404).result("Passenger not found");
                }
            } catch (Exception e) {
                ctx.status(500).result("Cannot delete passenger: " + e.getMessage());
            }
        });

        // PASSENGER PHONE NUMBERS
        app.get("/api/passenger-phone-nums", ctx -> {
            String passengerId = ctx.queryParam("passengerId");
            if (passengerId != null && !passengerId.isEmpty()) {
                ctx.json(passengerPhoneNumDAO.findByPassengerId(passengerId));
            } else {
                ctx.json(passengerPhoneNumDAO.findAll());
            }
        });

        app.post("/api/passenger-phone-nums", ctx -> {
            try {
                PassengerPhoneNum p = ctx.bodyAsClass(PassengerPhoneNum.class);
                passengerPhoneNumDAO.insert(p);
                ctx.status(201).json(p);
            } catch (Exception e) {
                ctx.status(500).result("Cannot insert passenger phone number: " + e.getMessage());
            }
        });

        app.delete("/api/passenger-phone-nums/:passengerId/:phoneNum", ctx -> {
            try {
                String passengerId = ctx.pathParam("passengerId");
                String phoneNum = ctx.pathParam("phoneNum");
                // Decode URL-encoded phone number
                phoneNum = java.net.URLDecoder.decode(phoneNum, "UTF-8");
                boolean ok = passengerPhoneNumDAO.delete(passengerId, phoneNum);
                if (ok) {
                    ctx.status(204);
                } else {
                    ctx.status(404).result("Passenger phone number not found");
                }
            } catch (Exception e) {
                ctx.status(500).result("Cannot delete passenger phone number: " + e.getMessage());
            }
        });

        // PASSENGER TRAVEL HISTORIES
        app.get("/api/passenger-travel-histories", ctx -> {
            String passengerId = ctx.queryParam("passengerId");
            if (passengerId != null && !passengerId.isEmpty()) {
                ctx.json(passengerTravelHistoryDAO.findByPassengerId(passengerId));
            } else {
                ctx.json(passengerTravelHistoryDAO.findAll());
            }
        });

        app.post("/api/passenger-travel-histories", ctx -> {
            try {
                PassengerTravelHistory t = ctx.bodyAsClass(PassengerTravelHistory.class);
                passengerTravelHistoryDAO.insert(t);
                ctx.status(201).json(t);
            } catch (Exception e) {
                ctx.status(500).result("Cannot insert passenger travel history: " + e.getMessage());
            }
        });

        app.delete("/api/passenger-travel-histories/:passengerId/:travelHistory", ctx -> {
            try {
                String passengerId = ctx.pathParam("passengerId");
                String travelHistory = ctx.pathParam("travelHistory");
                // Decode URL-encoded travel history
                travelHistory = java.net.URLDecoder.decode(travelHistory, "UTF-8");
                boolean ok = passengerTravelHistoryDAO.delete(passengerId, travelHistory);
                if (ok) {
                    ctx.status(204);
                } else {
                    ctx.status(404).result("Passenger travel history not found");
                }
            } catch (Exception e) {
                ctx.status(500).result("Cannot delete passenger travel history: " + e.getMessage());
            }
        });

        // PASSENGER TICKETS (nested route)
        app.get("/api/passengers/:id/tickets", ctx -> {
            String passengerId = ctx.pathParam("id");
            // Filter tickets by passengerId
            List<Ticket> allTickets = ticketDAO.findAll();
            List<Ticket> passengerTickets = allTickets.stream()
                .filter(t -> t.passengerID.equals(passengerId))
                .collect(java.util.stream.Collectors.toList());
            ctx.json(passengerTickets);
        });

        // TICKETS
        app.get("/api/tickets", ctx -> ctx.json(ticketDAO.findAll()));

        app.get("/api/tickets/:id", ctx -> {
            Ticket t = ticketDAO.findById(ctx.pathParam("id"));
            if (t == null) {
                ctx.status(404).result("Ticket not found");
            } else {
                ctx.json(t);
            }
        });

        app.post("/api/tickets", ctx -> {
            try {
                Ticket t = ctx.bodyAsClass(Ticket.class);
                ticketDAO.insert(t);
                ctx.status(201).json(t);
            } catch (Exception e) {
                ctx.status(500).result("Cannot insert ticket: " + e.getMessage());
            }
        });

        // LUGGAGE
        app.get("/api/luggages", ctx -> ctx.json(luggageDAO.findAll()));

        app.get("/api/luggages/:id", ctx -> {
            ctx.json(luggageDAO.findById(ctx.pathParam("id")));
        });

        // LUGGAGE: New Nested Route
        app.get("/api/tickets/:ticketId/luggages", LuggageController::getAllByTicketId);

        app.post("/api/luggages", ctx -> {
            Luggage l = ctx.bodyAsClass(Luggage.class);
            luggageDAO.insert(l);
            ctx.status(201).json(l);
        });

        // FLIGHTS
        app.get("/api/flights", ctx -> ctx.json(flightDAO.findAll()));

        app.get("/api/flights/:id", ctx -> {
            ctx.json(flightDAO.findById(ctx.pathParam("id")));
        });

        app.post("/api/flights", ctx -> {
            Flight f = ctx.bodyAsClass(Flight.class);
            flightDAO.insert(f);
            ctx.status(201).json(f);
        });

        // EMPLOYEES
        app.get("/api/employees", ctx -> ctx.json(employeeDAO.findAll()));

        app.get("/api/employees/:id", ctx -> {
            ctx.json(employeeDAO.findById(ctx.pathParam("id")));
        });

        app.post("/api/employees", ctx -> {
            Employee e = ctx.bodyAsClass(Employee.class);
            employeeDAO.insert(e);
            ctx.status(201).json(e);
        });

        System.out.println("🚀 Server running at http://localhost:7070/");
    }
}
