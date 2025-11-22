package vn.iuhcm.airport.ticket;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BoardingDAO {

    // 1) Lấy tất cả boarding records
    public List<Boarding> findAll() {
        List<Boarding> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Boarding";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new Boarding(
                        rs.getString("PassID"),
                        rs.getString("FlightID"),
                        rs.getString("GateNum"),
                        rs.getTimestamp("BoardingTime").toLocalDateTime(), // DATETIME2 -> LocalDateTime
                        rs.getString("Seat"),
                        rs.getString("Status"),
                        rs.getString("TicketID")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Tìm 1 boarding record theo PassID (là UUID)
    public Boarding findById(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Boarding WHERE PassID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);
            ResultSet rs = stm.executeQuery();

            if (rs.next()) {
                return new Boarding(
                        rs.getString("PassID"),
                        rs.getString("FlightID"),
                        rs.getString("GateNum"),
                        rs.getTimestamp("BoardingTime").toLocalDateTime(),
                        rs.getString("Seat"),
                        rs.getString("Status"),
                        rs.getString("TicketID"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    // 3) Thêm boarding record mới
    public Boarding insert(Boarding b) {
        try (Connection conn = Database.getConnection()) {

            // PassID là UUID (VARCHAR(36)), nếu chưa có thì tự sinh
            if (b.passID == null || b.passID.trim().isEmpty()) {
                b.passID = UUID.randomUUID().toString();
            }

            String sql = "INSERT INTO Boarding " +
                    "(PassID, FlightID, GateNum, BoardingTime, Seat, Status, TicketID) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, b.passID);
            stm.setString(2, b.flightID);
            stm.setString(3, b.gateNum);
            stm.setTimestamp(4, Timestamp.valueOf(b.boardingTime)); // LocalDateTime -> Timestamp
            stm.setString(5, b.seat);
            stm.setString(6, b.status);
            stm.setString(7, b.ticketID);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new RuntimeException("Insert boarding record failed, no rows affected.");
            }

            return b;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert boarding record failed: " + e.getMessage());
        }
    }
}