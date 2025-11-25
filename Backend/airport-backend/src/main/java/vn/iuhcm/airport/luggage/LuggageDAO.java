package vn.iuhcm.airport.luggage;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;

public class LuggageDAO {

    // 1) Get all luggage
    public List<Luggage> findAll() {
        List<Luggage> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Luggage";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new Luggage(
                        rs.getString("LuggageID"),
                        rs.getBigDecimal("Weight"),
                        rs.getString("Status"),
                        rs.getString("TicketID")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Find luggage by ID
    public Luggage findById(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Luggage WHERE LuggageID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);
            ResultSet rs = stm.executeQuery();

            if (rs.next()) {
                return new Luggage(
                        rs.getString("LuggageID"),
                        rs.getBigDecimal("Weight"),
                        rs.getString("Status"),
                        rs.getString("TicketID"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // 3) Insert new luggage
    public Luggage insert(Luggage l) {
        try (Connection conn = Database.getConnection()) {
            String nextId = generateNextLuggageID(conn);
            l.luggageID = nextId;

            String sql = "INSERT INTO Luggage (LuggageID, Weight, Status, TicketID) VALUES (?, ?, ?, ?)";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, l.luggageID);
            stm.setBigDecimal(2, l.weight);
            stm.setString(3, l.status);
            stm.setString(4, l.ticketID);

            int affected = stm.executeUpdate();
            if (affected == 0)
                throw new RuntimeException("Insert luggage failed.");
            return l;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert luggage failed: " + e.getMessage());
        }
    }

    // 4) Update luggage (Weight, Status, TicketID)
    public boolean update(Luggage l) {
        try (Connection conn = Database.getConnection()) {
            String sql = "UPDATE Luggage SET Weight = ?, Status = ?, TicketID = ? WHERE LuggageID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setBigDecimal(1, l.weight);
            stm.setString(2, l.status);
            stm.setString(3, l.ticketID);
            stm.setString(4, l.luggageID);

            return stm.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 5) Delete luggage
    public boolean delete(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "DELETE FROM Luggage WHERE LuggageID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);

            return stm.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 6) Find luggage by TicketID
    public List<Luggage> findByTicketId(String ticketId) {
        List<Luggage> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Luggage WHERE TicketID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, ticketId);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new Luggage(
                        rs.getString("LuggageID"),
                        rs.getBigDecimal("Weight"),
                        rs.getString("Status"),
                        rs.getString("TicketID")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    private String generateNextLuggageID(Connection conn) throws SQLException {
        String sql = "SELECT MAX(LuggageID) AS MaxID FROM Luggage";
        PreparedStatement stm = conn.prepareStatement(sql);
        ResultSet rs = stm.executeQuery();
        if (rs.next() && rs.getString("MaxID") != null) {
            String maxId = rs.getString("MaxID");
            int num = Integer.parseInt(maxId.substring(2));
            return String.format("LG%05d", num + 1);
        }
        return "LG00001";
    }
}