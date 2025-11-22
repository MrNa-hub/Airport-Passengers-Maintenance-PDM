package vn.iuhcm.airport.employee;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class GroundStaffDAO {

    public List<GroundStaff> findAll() throws SQLException {
        String sql = "SELECT EmployeeID, Department, Position FROM GroundStaff";
        List<GroundStaff> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String id = rs.getString("EmployeeID");
                String dept = rs.getString("Department");
                String pos = rs.getString("Position");
                list.add(new GroundStaff(id, dept, pos));
            }
        }
        return list;
    }

    public GroundStaff findById(String employeeID) throws SQLException {
        String sql = "SELECT EmployeeID, Department, Position FROM GroundStaff WHERE EmployeeID = ?";
        GroundStaff result = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String id = rs.getString("EmployeeID");
                    String dept = rs.getString("Department");
                    String pos = rs.getString("Position");
                    result = new GroundStaff(id, dept, pos);
                }
            }
        }
        return result;
    }

    public int insert(GroundStaff obj) throws SQLException {
        String sql = "INSERT INTO GroundStaff (EmployeeID, Department, Position) VALUES (?, ?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getEmployeeID());
            ps.setString(2, obj.getDepartment());
            ps.setString(3, obj.getPosition());
            return ps.executeUpdate();
        }
    }

    public int update(GroundStaff obj) throws SQLException {
        String sql = "UPDATE GroundStaff SET Department = ?, Position = ? WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getDepartment());
            ps.setString(2, obj.getPosition());
            ps.setString(3, obj.getEmployeeID());
            return ps.executeUpdate();
        }
    }

    public int delete(String employeeID) throws SQLException {
        String sql = "DELETE FROM GroundStaff WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            return ps.executeUpdate();
        }
    }
}
