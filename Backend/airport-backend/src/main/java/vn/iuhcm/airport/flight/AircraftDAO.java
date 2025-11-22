package vn.iuhcm.airport.flight;

import vn.iuhcm.airport.config.Database;


import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AircraftDAO {

    public List<Aircraft> findAll() throws SQLException {
        String sql = "SELECT AircraftID, RegistrationNum, Model, Capacity, Airline FROM Aircraft";
        List<Aircraft> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String id = rs.getString("AircraftID");
                String reg = rs.getString("RegistrationNum");
                String model = rs.getString("Model");
                int capacity = rs.getInt("Capacity");
                String airline = rs.getString("Airline");
                list.add(new Aircraft(id, reg, model, capacity, airline));
            }
        }
        return list;
    }

    public Aircraft findById(String aircraftID) throws SQLException {
        String sql = "SELECT AircraftID, RegistrationNum, Model, Capacity, Airline " +
                     "FROM Aircraft WHERE AircraftID = ?";
        Aircraft result = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, aircraftID);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String id = rs.getString("AircraftID");
                    String reg = rs.getString("RegistrationNum");
                    String model = rs.getString("Model");
                    int capacity = rs.getInt("Capacity");
                    String airline = rs.getString("Airline");
                    result = new Aircraft(id, reg, model, capacity, airline);
                }
            }
        }
        return result;
    }

    public int insert(Aircraft obj) throws SQLException {
        String sql = "INSERT INTO Aircraft (AircraftID, RegistrationNum, Model, Capacity, Airline) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getAircraftID());
            ps.setString(2, obj.getRegistrationNum());
            ps.setString(3, obj.getModel());
            ps.setInt(4, obj.getCapacity());
            ps.setString(5, obj.getAirline());
            return ps.executeUpdate();
        }
    }

    public int update(Aircraft obj) throws SQLException {
        String sql = "UPDATE Aircraft " +
                     "SET RegistrationNum = ?, Model = ?, Capacity = ?, Airline = ? " +
                     "WHERE AircraftID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getRegistrationNum());
            ps.setString(2, obj.getModel());
            ps.setInt(3, obj.getCapacity());
            ps.setString(4, obj.getAirline());
            ps.setString(5, obj.getAircraftID());
            return ps.executeUpdate();
        }
    }

    public int delete(String aircraftID) throws SQLException {
        String sql = "DELETE FROM Aircraft WHERE AircraftID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, aircraftID);
            return ps.executeUpdate();
        }
    }
}
