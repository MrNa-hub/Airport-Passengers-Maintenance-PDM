package vn.iuhcm.airport.luggage;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;

public class LuggageDAO {

    // 1) Lấy tất cả luggage records
    public List<Luggage> findAll() {
        List<Luggage> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Luggage";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new Luggage(
                        rs.getString("LuggageID"),
                        rs.getBigDecimal("Weight"), // DECIMAL -> BigDecimal
                        rs.getString("Status"),
                        rs.getString("TicketID")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Tìm 1 luggage record theo ID (vd: LG00001)
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

    // 3) Thêm luggage mới (auto generate LuggageID = LG00001, LG00002,...)
    public Luggage insert(Luggage l) {
        try (Connection conn = Database.getConnection()) {

            // Tự sinh LuggageID mới
            String nextId = generateNextLuggageID(conn);
            l.luggageID = nextId;

            String sql = "INSERT INTO Luggage (LuggageID, Weight, Status, TicketID) VALUES (?, ?, ?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, l.luggageID);
            stm.setBigDecimal(2, l.weight);
            stm.setString(3, l.status);
            stm.setString(4, l.ticketID);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new RuntimeException("Insert luggage failed, no rows affected.");
            }

            return l;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert luggage failed: " + e.getMessage());
        }
    }

    // Hàm private: Tạo LuggageID mới từ MAX(LuggageID)
    private String generateNextLuggageID(Connection conn) throws SQLException {
        String sql = "SELECT MAX(LuggageID) AS MaxID FROM Luggage";
        PreparedStatement stm = conn.prepareStatement(sql);
        ResultSet rs = stm.executeQuery();

        if (rs.next() && rs.getString("MaxID") != null) {
            String maxId = rs.getString("MaxID"); // LGxxxxx
            int num = Integer.parseInt(maxId.substring(2));
            num += 1;
            return String.format("LG%05d", num);
        }

        // nếu bảng chưa có dòng nào:
        return "LG00001";
    }
}