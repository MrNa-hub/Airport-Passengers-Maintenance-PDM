package vn.iuhcm.airport.passenger;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PassengerDAO {

    // 1) Lấy tất cả passenger
    public List<Passenger> findAll() {
        List<Passenger> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Passenger";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new Passenger(
                        rs.getString("PassengerID"),
                        rs.getString("PassportID"),
                        rs.getString("FirstName"),
                        rs.getString("MiddleName"),
                        rs.getString("LastName"),
                        rs.getString("Nation"),
                        rs.getString("Email")
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Tìm 1 passenger theo ID (vd: PA00001)
    public Passenger findById(String id) {
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Passenger WHERE PassengerID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, id);
            ResultSet rs = stm.executeQuery();

            if (rs.next()) {
                return new Passenger(
                        rs.getString("PassengerID"),
                        rs.getString("PassportID"),
                        rs.getString("FirstName"),
                        rs.getString("MiddleName"),
                        rs.getString("LastName"),
                        rs.getString("Nation"),
                        rs.getString("Email")
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null; // không tìm thấy
    }

    // 3) Thêm passenger mới (auto generate PassengerID = PA00001, PA00002,...)
    public Passenger insert(Passenger p) {
        try (Connection conn = Database.getConnection()) {

            // Tự sinh PassengerID mới
            String nextId = generateNextPassengerID(conn);
            p.passengerID = nextId;

            String sql = "INSERT INTO Passenger " +
                    "(PassengerID, PassportID, FirstName, MiddleName, LastName, Nation, Email) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, p.passengerID);
            stm.setString(2, p.passportID);
            stm.setString(3, p.firstName);
            stm.setString(4, p.middleName);
            stm.setString(5, p.lastName);
            stm.setString(6, p.nation);
            stm.setString(7, p.email);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new RuntimeException("Insert passenger failed, no rows affected.");
            }

            return p;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert passenger failed: " + e.getMessage());
        }
    }

    // 4) Hàm private: Tạo PassengerID mới từ MAX(PassengerID)
    private String generateNextPassengerID(Connection conn) throws SQLException {
        String sql = "SELECT MAX(PassengerID) AS MaxID FROM Passenger";
        PreparedStatement stm = conn.prepareStatement(sql);
        ResultSet rs = stm.executeQuery();

        if (rs.next() && rs.getString("MaxID") != null) {
            String maxId = rs.getString("MaxID"); // PA00052
            int num = Integer.parseInt(maxId.substring(2)); // lấy "00052" -> 52
            num += 1;
            return String.format("PA%05d", num);  // PA00053
        }

        // nếu bảng chưa có dòng nào:
        return "PA00001";
    }
}
