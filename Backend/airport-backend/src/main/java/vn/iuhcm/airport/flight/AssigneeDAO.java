package vn.iuhcm.airport.flight;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AssigneeDAO {

    public List<Assignee> findAll() throws SQLException {
        String sql = "SELECT EmployeeID, FlightID FROM Assignee";
        List<Assignee> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String emp = rs.getString("EmployeeID");
                String flight = rs.getString("FlightID");
                list.add(new Assignee(emp, flight));
            }
        }
        return list;
    }

    // findById cho PK kép (EmployeeID, FlightID)
    public Assignee findById(String employeeID, String flightID) throws SQLException {
        String sql = "SELECT EmployeeID, FlightID FROM Assignee " +
                     "WHERE EmployeeID = ? AND FlightID = ?";
        Assignee result = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            ps.setString(2, flightID);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String emp = rs.getString("EmployeeID");
                    String fl = rs.getString("FlightID");
                    result = new Assignee(emp, fl);
                }
            }
        }
        return result;
    }

    public int insert(Assignee obj) throws SQLException {
        String sql = "INSERT INTO Assignee (EmployeeID, FlightID) VALUES (?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getEmployeeID());
            ps.setString(2, obj.getFlightID());
            return ps.executeUpdate();
        }
    }

    public int delete(String employeeID, String flightID) throws SQLException {
        String sql = "DELETE FROM Assignee WHERE EmployeeID = ? AND FlightID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            ps.setString(2, flightID);
            return ps.executeUpdate();
        }
    }

    // Ví dụ tiện: lấy tất cả Assignee theo FlightID
    public List<Assignee> findByFlight(String flightID) throws SQLException {
        String sql = "SELECT EmployeeID, FlightID FROM Assignee WHERE FlightID = ?";
        List<Assignee> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, flightID);

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    String emp = rs.getString("EmployeeID");
                    String fl = rs.getString("FlightID");
                    list.add(new Assignee(emp, fl));
                }
            }
        }
        return list;
    }
}
