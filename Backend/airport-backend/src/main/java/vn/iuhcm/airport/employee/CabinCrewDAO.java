package vn.iuhcm.airport.employee;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CabinCrewDAO {

    public List<CabinCrew> findAll() throws SQLException {
        String sql = "SELECT EmployeeID, CertificationArea, CrewRank FROM CabinCrew";
        List<CabinCrew> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String id = rs.getString("EmployeeID");
                String cert = rs.getString("CertificationArea");
                String rank = rs.getString("CrewRank");
                list.add(new CabinCrew(id, cert, rank));
            }
        }
        return list;
    }

    public CabinCrew findById(String employeeID) throws SQLException {
        String sql = "SELECT EmployeeID, CertificationArea, CrewRank " +
                     "FROM CabinCrew WHERE EmployeeID = ?";
        CabinCrew result = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String id = rs.getString("EmployeeID");
                    String cert = rs.getString("CertificationArea");
                    String rank = rs.getString("CrewRank");
                    result = new CabinCrew(id, cert, rank);
                }
            }
        }
        return result;
    }

    public int insert(CabinCrew obj) throws SQLException {
        String sql = "INSERT INTO CabinCrew (EmployeeID, CertificationArea, CrewRank) " +
                     "VALUES (?, ?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getEmployeeID());
            ps.setString(2, obj.getCertificationArea());
            ps.setString(3, obj.getCrewRank());
            return ps.executeUpdate();
        }
    }

    public int update(CabinCrew obj) throws SQLException {
        String sql = "UPDATE CabinCrew SET CertificationArea = ?, CrewRank = ? " +
                     "WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getCertificationArea());
            ps.setString(2, obj.getCrewRank());
            ps.setString(3, obj.getEmployeeID());
            return ps.executeUpdate();
        }
    }

    public int delete(String employeeID) throws SQLException {
        String sql = "DELETE FROM CabinCrew WHERE EmployeeID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            return ps.executeUpdate();
        }
    }
}
