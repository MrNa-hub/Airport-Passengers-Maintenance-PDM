package vn.iuhcm.airport.employee;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PilotDAO {

    public List<Pilot> findAll() throws SQLException {
        String sql = "SELECT EmployeeID, PilotLicenseNo, FlightHours, Rank FROM Pilot";
        List<Pilot> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String id = rs.getString("EmployeeID");
                String lic = rs.getString("PilotLicenseNo");
                int hours = rs.getInt("FlightHours");
                String rank = rs.getString("Rank");
                list.add(new Pilot(id, lic, hours, rank));
            }
        }
        return list;
    }

    public Pilot findById(String employeeID) throws SQLException {
        String sql = "SELECT EmployeeID, PilotLicenseNo, FlightHours, Rank " +
                     "FROM Pilot WHERE EmployeeID = ?";
        Pilot result = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String id = rs.getString("EmployeeID");
                    String lic = rs.getString("PilotLicenseNo");
                    int hours = rs.getInt("FlightHours");
                    String rank = rs.getString("Rank");
                    result = new Pilot(id, lic, hours, rank);
                }
            }
        }
        return result;
    }

    public int insert(Pilot obj) throws SQLException {
        String sql = "INSERT INTO Pilot (EmployeeID, PilotLicenseNo, FlightHours, Rank) " +
                     "VALUES (?, ?, ?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getEmployeeID());
            ps.setString(2, obj.getPilotLicenseNo());
            ps.setInt(3, obj.getFlightHours());
            ps.setString(4, obj.getRank());
            return ps.executeUpdate();
        }
    }

    public int update(Pilot obj) throws SQLException {
        String sql = "UPDATE Pilot SET PilotLicenseNo = ?, FlightHours = ?, Rank = ? " +
                     "WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getPilotLicenseNo());
            ps.setInt(2, obj.getFlightHours());
            ps.setString(3, obj.getRank());
            ps.setString(4, obj.getEmployeeID());
            return ps.executeUpdate();
        }
    }

    public int delete(String employeeID) throws SQLException {
        String sql = "DELETE FROM Pilot WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            return ps.executeUpdate();
        }
    }
}
