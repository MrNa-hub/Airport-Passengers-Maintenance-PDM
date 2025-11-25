package vn.iuhcm.airport.luggage;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SecurityDAO {

    public List<Security> findAll() {
        List<Security> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Security";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();
            while (rs.next()) {
                list.add(new Security(
                        rs.getString("SecurityLogID"),
                        rs.getTimestamp("Timestamp").toLocalDateTime(),
                        rs.getString("ScreeningResult"),
                        rs.getString("TicketID")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public Security findById(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Security WHERE SecurityLogID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);
            ResultSet rs = stm.executeQuery();
            if (rs.next()) {
                return new Security(
                        rs.getString("SecurityLogID"),
                        rs.getTimestamp("Timestamp").toLocalDateTime(),
                        rs.getString("ScreeningResult"),
                        rs.getString("TicketID"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public Security insert(Security s) {
        try (Connection conn = Database.getConnection()) {
            String nextId = generateNextSecurityLogID(conn);
            s.securityLogID = nextId;
            String sql = "INSERT INTO Security (SecurityLogID, Timestamp, ScreeningResult, TicketID) VALUES (?, ?, ?, ?)";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, s.securityLogID);
            stm.setTimestamp(2, Timestamp.valueOf(s.timestamp));
            stm.setString(3, s.screeningResult);
            stm.setString(4, s.ticketID);
            stm.executeUpdate();
            return s;
        } catch (Exception e) {
            throw new RuntimeException("Insert failed: " + e.getMessage());
        }
    }

    // --- MISSING METHODS ADDED BELOW ---

    public boolean update(Security s) {
        try (Connection conn = Database.getConnection()) {
            String sql = "UPDATE Security SET Timestamp = ?, ScreeningResult = ?, TicketID = ? WHERE SecurityLogID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setTimestamp(1, Timestamp.valueOf(s.timestamp));
            stm.setString(2, s.screeningResult);
            stm.setString(3, s.ticketID);
            stm.setString(4, s.securityLogID);
            return stm.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean delete(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "DELETE FROM Security WHERE SecurityLogID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);
            return stm.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private String generateNextSecurityLogID(Connection conn) throws SQLException {
        String sql = "SELECT MAX(SecurityLogID) AS MaxID FROM Security";
        PreparedStatement stm = conn.prepareStatement(sql);
        ResultSet rs = stm.executeQuery();
        if (rs.next() && rs.getString("MaxID") != null) {
            String maxId = rs.getString("MaxID");
            int num = Integer.parseInt(maxId.substring(2));
            return String.format("SE%05d", num + 1);
        }
        return "SE00001";
    }
}