package vn.iuhcm.airport.passenger;

import vn.iuhcm.airport.config.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.sql.SQLException;

public class PassengerPhoneNumDAO {

    // 1) Lấy tất cả phone numbers
    public List<PassengerPhoneNum> findAll() {
        List<PassengerPhoneNum> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Passenger_PhonNum";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new PassengerPhoneNum(
                        rs.getString("PassengerID"),
                        rs.getString("PhoneNum")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Tìm tất cả phone numbers của 1 passenger (theo ID)
    public List<PassengerPhoneNum> findByPassengerId(String passengerId) {
        List<PassengerPhoneNum> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Passenger_PhonNum WHERE PassengerID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, passengerId);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new PassengerPhoneNum(
                        rs.getString("PassengerID"),
                        rs.getString("PhoneNum")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list; // Có thể trả về List rỗng nếu không tìm thấy
    }

    // 3) Thêm phone number mới
    public PassengerPhoneNum insert(PassengerPhoneNum p) {
        try (Connection conn = Database.getConnection()) {
            String sql = "INSERT INTO Passenger_PhonNum (PassengerID, PhoneNum) VALUES (?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, p.passengerID);
            stm.setString(2, p.phoneNum);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new SQLException("Insert passenger phone number failed, no rows affected.");
            }

            return p;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert passenger phone number failed: " + e.getMessage());
        }
    }

    // 4) Xóa phone number
    public boolean delete(String passengerID, String phoneNum) {
        try (Connection conn = Database.getConnection()) {
            String sql = "DELETE FROM Passenger_PhonNum WHERE PassengerID = ? AND PhoneNum = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, passengerID);
            stm.setString(2, phoneNum);

            int affected = stm.executeUpdate();
            return affected > 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Delete passenger phone number failed: " + e.getMessage());
        }
    }
}