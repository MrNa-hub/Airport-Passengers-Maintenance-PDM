package vn.iuhcm.airport.employee;

import io.javalin.http.Context;
import java.util.List;

public class EmployeeController {

    private static final EmployeeDAO employeeDAO = new EmployeeDAO();

    public static void getAll(Context ctx) {
        ctx.json(employeeDAO.findAll());
    }

    public static void getById(Context ctx) {
        String id = ctx.pathParam("id");
        Employee e = employeeDAO.findById(id);

        if (e == null) {
            ctx.status(404).result("Employee not found");
        } else {
            ctx.json(e);
        }
    }

    public static void create(Context ctx) {
        Employee body = ctx.bodyAsClass(Employee.class);
        boolean ok = employeeDAO.insert(body);

        if (ok) ctx.status(201).json(body);
        else    ctx.status(500).result("Cannot insert employee");
    }
}
