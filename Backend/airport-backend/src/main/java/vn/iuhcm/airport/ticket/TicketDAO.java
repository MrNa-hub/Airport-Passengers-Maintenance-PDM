package vn.iuhcm.airport.ticket;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TicketDAO {

    // 1) Get all tickets
    public List<Ticket> findAll() {
        List<Ticket> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Ticket";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new Ticket(
                        rs.getString("TicketID"),
                        rs.getString("Seat"),
                        rs.getString("Class"),
                        rs.getTimestamp("PurchaseDate").toLocalDateTime(),
                        rs.getString("PassengerID"),
                        rs.getString("FlightID")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Find ticket by ID
    public Ticket findById(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Ticket WHERE TicketID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);
            ResultSet rs = stm.executeQuery();

            if (rs.next()) {
                return new Ticket(
                        rs.getString("TicketID"),
                        rs.getString("Seat"),
                        rs.getString("Class"),
                        rs.getTimestamp("PurchaseDate").toLocalDateTime(),
                        rs.getString("PassengerID"),
                        rs.getString("FlightID"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // 3) Insert new ticket
    public Ticket insert(Ticket t) {
        try (Connection conn = Database.getConnection()) {
            String nextId = generateNextTicketID(conn);
            t.ticketID = nextId;

            String sql = "INSERT INTO Ticket (TicketID, Seat, Class, PurchaseDate, PassengerID, FlightID) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, t.ticketID);
            stm.setString(2, t.seat);
            stm.setString(3, t.classType);
            stm.setTimestamp(4, Timestamp.valueOf(t.purchaseDate));
            stm.setString(5, t.passengerID);
            stm.setString(6, t.flightID);

            int affected = stm.executeUpdate();
            if (affected == 0)
                throw new RuntimeException("Insert ticket failed.");
            return t;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert ticket failed: " + e.getMessage());
        }
    }

    // 4) Update existing ticket
    public boolean update(Ticket t) {
        try (Connection conn = Database.getConnection()) {
            String sql = "UPDATE Ticket SET Seat = ?, Class = ?, PurchaseDate = ?, PassengerID = ?, FlightID = ? WHERE TicketID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, t.seat);
            stm.setString(2, t.classType);
            stm.setTimestamp(3, Timestamp.valueOf(t.purchaseDate));
            stm.setString(4, t.passengerID);
            stm.setString(5, t.flightID);
            stm.setString(6, t.ticketID);

            return stm.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 5) Delete ticket
    public boolean delete(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "DELETE FROM Ticket WHERE TicketID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            return stm.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private String generateNextTicketID(Connection conn) throws SQLException {
        String sql = "SELECT MAX(TicketID) AS MaxID FROM Ticket";
        PreparedStatement stm = conn.prepareStatement(sql);
        ResultSet rs = stm.executeQuery();
        if (rs.next() && rs.getString("MaxID") != null) {
            String maxId = rs.getString("MaxID");
            int num = Integer.parseInt(maxId.substring(2));
            return String.format("TI%05d", num + 1);
        }
        return "TI00001";
    }
}