package vn.iuhcm.airport.ticket;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TicketDAO {

    // 1) Lấy tất cả tickets
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
                        rs.getTimestamp("PurchaseDate").toLocalDateTime(), // DATETIME2 -> LocalDateTime
                        rs.getString("PassengerID"),
                        rs.getString("FlightID")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Tìm 1 ticket theo ID (vd: TI00001)
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

    // 3) Thêm ticket mới (auto generate TicketID = TI00001, TI00002,...)
    public Ticket insert(Ticket t) {
        try (Connection conn = Database.getConnection()) {

            // Tự sinh TicketID mới
            String nextId = generateNextTicketID(conn);
            t.ticketID = nextId;

            String sql = "INSERT INTO Ticket " +
                    "(TicketID, Seat, Class, PurchaseDate, PassengerID, FlightID) " +
                    "VALUES (?, ?, ?, ?, ?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, t.ticketID);
            stm.setString(2, t.seat);
            stm.setString(3, t.classType);
            stm.setTimestamp(4, Timestamp.valueOf(t.purchaseDate)); // LocalDateTime -> Timestamp
            stm.setString(5, t.passengerID);
            stm.setString(6, t.flightID);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new RuntimeException("Insert ticket failed, no rows affected.");
            }

            return t;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert ticket failed: " + e.getMessage());
        }
    }

    // Hàm private: Tạo TicketID mới từ MAX(TicketID)
    private String generateNextTicketID(Connection conn) throws SQLException {
        String sql = "SELECT MAX(TicketID) AS MaxID FROM Ticket";
        PreparedStatement stm = conn.prepareStatement(sql);
        ResultSet rs = stm.executeQuery();

        if (rs.next() && rs.getString("MaxID") != null) {
            String maxId = rs.getString("MaxID"); // TIxxxxx
            int num = Integer.parseInt(maxId.substring(2)); // lấy "xxxxx" -> num
            num += 1;
            // Dùng format 5 chữ số như PassengerID
            return String.format("TI%05d", num);
        }

        // nếu bảng chưa có dòng nào:
        return "TI00001";
    }
}