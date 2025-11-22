package vn.iuhcm.airport.luggage;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class SecurityDAO {

    // 1) Lấy tất cả security logs
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

    // 2) Tìm 1 security log theo ID (vd: SE00001)
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

    // 3) Thêm security log mới (auto generate SecurityLogID = SE00001, SE00002,...)
    public Security insert(Security s) {
        try (Connection conn = Database.getConnection()) {

            // Tự sinh SecurityLogID mới
            String nextId = generateNextSecurityLogID(conn);
            s.securityLogID = nextId;

            String sql = "INSERT INTO Security (SecurityLogID, Timestamp, ScreeningResult, TicketID) VALUES (?, ?, ?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, s.securityLogID);
            stm.setTimestamp(2, Timestamp.valueOf(s.timestamp)); // LocalDateTime -> Timestamp
            stm.setString(3, s.screeningResult);
            stm.setString(4, s.ticketID);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new RuntimeException("Insert security log failed, no rows affected.");
            }

            return s;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert security log failed: " + e.getMessage());
        }
    }

    // Hàm private: Tạo SecurityLogID mới từ MAX(SecurityLogID)
    private String generateNextSecurityLogID(Connection conn) throws SQLException {
        String sql = "SELECT MAX(SecurityLogID) AS MaxID FROM Security";
        PreparedStatement stm = conn.prepareStatement(sql);
        ResultSet rs = stm.executeQuery();

        if (rs.next() && rs.getString("MaxID") != null) {
            String maxId = rs.getString("MaxID"); // SExxxxx
            int num = Integer.parseInt(maxId.substring(2));
            num += 1;
            return String.format("SE%05d", num);
        }

        // nếu bảng chưa có dòng nào:
        return "SE00001";
    }
}