package vn.iuhcm.airport.flight;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class FlightDAO {

    private Flight mapRow(ResultSet rs) throws SQLException {
        String id = rs.getString("FlightID");
        String num = rs.getString("FlightNum");
        Timestamp depTs = rs.getTimestamp("DepartureTime");
        Timestamp arrTs = rs.getTimestamp("ArrivalTime");
        LocalDateTime dep = depTs != null ? depTs.toLocalDateTime() : null;
        LocalDateTime arr = arrTs != null ? arrTs.toLocalDateTime() : null;
        String dest = rs.getString("Destination");
        String origin = rs.getString("Origin");
        String status = rs.getString("Status");
        String aircraftID = rs.getString("AircraftID");

        return new Flight(id, num, dep, arr, dest, origin, status, aircraftID);
    }

    public List<Flight> findAll() throws SQLException {
        String sql = "SELECT * FROM Flight";
        List<Flight> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(mapRow(rs));
            }
        }
        return list;
    }

    public Flight findById(String flightID) throws SQLException {
        String sql = "SELECT * FROM Flight WHERE FlightID = ?";
        Flight result = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, flightID);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    result = mapRow(rs);
                }
            }
        }
        return result;
    }

    public int insert(Flight obj) throws SQLException {
        String sql = """
                INSERT INTO Flight (
                    FlightID, FlightNum, DepartureTime, ArrivalTime,
                    Destination, Origin, Status, AircraftID
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getFlightID());
            ps.setString(2, obj.getFlightNum());
            ps.setTimestamp(3, Timestamp.valueOf(obj.getDepartureTime()));
            ps.setTimestamp(4, Timestamp.valueOf(obj.getArrivalTime()));
            ps.setString(5, obj.getDestination());
            ps.setString(6, obj.getOrigin());
            ps.setString(7, obj.getStatus());
            ps.setString(8, obj.getAircraftID());

            return ps.executeUpdate();
        }
    }

    public int update(Flight obj) throws SQLException {
        String sql = """
                UPDATE Flight
                SET FlightNum = ?, DepartureTime = ?, ArrivalTime = ?,
                    Destination = ?, Origin = ?, Status = ?, AircraftID = ?
                WHERE FlightID = ?
                """;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getFlightNum());
            ps.setTimestamp(2, Timestamp.valueOf(obj.getDepartureTime()));
            ps.setTimestamp(3, Timestamp.valueOf(obj.getArrivalTime()));
            ps.setString(4, obj.getDestination());
            ps.setString(5, obj.getOrigin());
            ps.setString(6, obj.getStatus());
            ps.setString(7, obj.getAircraftID());
            ps.setString(8, obj.getFlightID());

            return ps.executeUpdate();
        }
    }

    public int delete(String flightID) throws SQLException {
        String sql = "DELETE FROM Flight WHERE FlightID = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, flightID);
            return ps.executeUpdate();
        }
    }
}
