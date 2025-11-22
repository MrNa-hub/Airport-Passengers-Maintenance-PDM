package vn.iuhcm.airport;

import io.javalin.Javalin;

import vn.iuhcm.airport.passenger.PassengerDAO;
import vn.iuhcm.airport.ticket.TicketDAO;
import vn.iuhcm.airport.luggage.LuggageDAO;
import vn.iuhcm.airport.flight.FlightDAO;
import vn.iuhcm.airport.employee.EmployeeDAO;

public class App {
    public static void main(String[] args) {

        Javalin app = Javalin.create();
        app.start(7070);

        // DAO objects
        PassengerDAO passengerDAO = new PassengerDAO();
        TicketDAO ticketDAO = new TicketDAO();
        LuggageDAO luggageDAO = new LuggageDAO();
        FlightDAO flightDAO = new FlightDAO();
        EmployeeDAO employeeDAO = new EmployeeDAO();

        // Test route
        app.get("/", ctx -> ctx.result("Airport Backend Running"));

        // PASSENGERS
        app.get("/passengers", ctx -> ctx.json(passengerDAO.findAll()));
        
        app.get("/passengers/:id", ctx -> {
            ctx.json(passengerDAO.findById(ctx.pathParam("id")));
        });

        app.post("/passengers", ctx -> {
            passengerDAO.insert(ctx.bodyAsClass(Passenger.class));
            ctx.status(201);
        });

        // TICKETS
        app.get("/tickets", ctx -> ctx.json(ticketDAO.findAll()));

        app.get("/tickets/:id", ctx -> {
            ctx.json(ticketDAO.findById(ctx.pathParam("id")));
        });

        app.post("/tickets", ctx -> {
            Ticket t = ctx.bodyAsClass(Ticket.class);
            ticketDAO.insert(t);
            ctx.status(201).json(t);
        });

        // LUGGAGE
        app.get("/luggages", ctx -> ctx.json(luggageDAO.findAll()));

        app.get("/luggages/:id", ctx -> {
            ctx.json(luggageDAO.findById(ctx.pathParam("id")));
        });

        app.post("/luggages", ctx -> {
            Luggage l = ctx.bodyAsClass(Luggage.class);
            luggageDAO.insert(l);
            ctx.status(201).json(l);
        });

        // FLIGHTS
        app.get("/flights", ctx -> ctx.json(flightDAO.findAll()));

        app.get("/flights/:id", ctx -> {
            ctx.json(flightDAO.findById(ctx.pathParam("id")));
        });

        app.post("/flights", ctx -> {
            Flight f = ctx.bodyAsClass(Flight.class);
            flightDAO.insert(f);
            ctx.status(201).json(f);
        });

        // EMPLOYEES
        app.get("/employees", ctx -> ctx.json(employeeDAO.findAll()));

        app.get("/employees/:id", ctx -> {
            ctx.json(employeeDAO.findById(ctx.pathParam("id")));
        });

        app.post("/employees", ctx -> {
            Employee e = ctx.bodyAsClass(Employee.class);
            employeeDAO.insert(e);
            ctx.status(201).json(e);
        });

        System.out.println("🚀 Server running at http://localhost:7070/");
    }
}
