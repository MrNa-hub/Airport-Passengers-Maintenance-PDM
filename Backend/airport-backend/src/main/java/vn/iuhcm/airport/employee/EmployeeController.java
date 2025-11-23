package vn.iuhcm.airport.employee;

import io.javalin.http.Context;
import java.sql.SQLException;

public class EmployeeController {

    private static final EmployeeDAO employeeDAO = new EmployeeDAO();

    public static void getAll(Context ctx) {
        try {
            ctx.json(employeeDAO.findAll());
        } catch (SQLException e) {
            e.printStackTrace();
            ctx.status(500).result("Database error when loading employees");
        }
    }

    public static void getById(Context ctx) {
        String id = ctx.pathParam("id");

        try {
            Employee e = employeeDAO.findById(id);

            if (e == null) {
                ctx.status(404).result("Employee not found");
            } else {
                ctx.json(e);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            ctx.status(500).result("Database error when loading employee");
        }
    }

    public static void create(Context ctx) {
        Employee body = ctx.bodyAsClass(Employee.class);

        try {
            int rows = employeeDAO.insert(body);

            if (rows > 0) {
                ctx.status(201).json(body);
            } else {
                ctx.status(500).result("Cannot insert employee");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            ctx.status(500).result("Database error when inserting employee");
        }
    }

}
