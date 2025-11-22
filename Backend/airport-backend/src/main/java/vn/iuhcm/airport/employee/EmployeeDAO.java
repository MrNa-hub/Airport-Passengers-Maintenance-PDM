package vn.iuhcm.airport.employee;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class EmployeeDAO {

    public List<Employee> findAll() throws SQLException {
        String sql = "SELECT EmployeeID, FullName FROM Employee";
        List<Employee> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String id = rs.getString("EmployeeID");
                String name = rs.getString("FullName");
                list.add(new Employee(id, name));
            }
        }
        return list;
    }

    public Employee findById(String employeeID) throws SQLException {
        String sql = "SELECT EmployeeID, FullName FROM Employee WHERE EmployeeID = ?";
        Employee employee = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String id = rs.getString("EmployeeID");
                    String name = rs.getString("FullName");
                    employee = new Employee(id, name);
                }
            }
        }
        return employee;
    }

    public int insert(Employee employee) throws SQLException {
        String sql = "INSERT INTO Employee (EmployeeID, FullName) VALUES (?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employee.getEmployeeID());
            ps.setString(2, employee.getFullName());
            return ps.executeUpdate();
        }
    }

    public int update(Employee employee) throws SQLException {
        String sql = "UPDATE Employee SET FullName = ? WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employee.getFullName());
            ps.setString(2, employee.getEmployeeID());
            return ps.executeUpdate();
        }
    }

    public int delete(String employeeID) throws SQLException {
        String sql = "DELETE FROM Employee WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            return ps.executeUpdate();
        }
    }
}
