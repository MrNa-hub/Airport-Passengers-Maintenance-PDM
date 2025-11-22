package vn.iuhcm.airport.passenger;

import vn.iuhcm.airport.config.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.sql.SQLException;

public class PassengerTravelHistoryDAO {

    // 1) Lấy tất cả travel history
    public List<PassengerTravelHistory> findAll() {
        List<PassengerTravelHistory> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Passenger_TravelHistory";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new PassengerTravelHistory(
                        rs.getString("PassengerID"),
                        rs.getString("TravelHistory")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Tìm tất cả travel history của 1 passenger (theo ID)
    public List<PassengerTravelHistory> findByPassengerId(String passengerId) {
        List<PassengerTravelHistory> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Passenger_TravelHistory WHERE PassengerID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, passengerId);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new PassengerTravelHistory(
                        rs.getString("PassengerID"),
                        rs.getString("TravelHistory")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list; // Có thể trả về List rỗng nếu không tìm thấy
    }

    // 3) Thêm travel history mới
    public PassengerTravelHistory insert(PassengerTravelHistory p) {
        try (Connection conn = Database.getConnection()) {
            String sql = "INSERT INTO Passenger_TravelHistory (PassengerID, TravelHistory) VALUES (?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, p.passengerID);
            stm.setString(2, p.travelHistory);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new SQLException("Insert passenger travel history failed, no rows affected.");
            }

            return p;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert passenger travel history failed: " + e.getMessage());
        }
    }

    // 4) Xóa travel history
    public boolean delete(String passengerID, String travelHistory) {
        try (Connection conn = Database.getConnection()) {
            String sql = "DELETE FROM Passenger_TravelHistory WHERE PassengerID = ? AND TravelHistory = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, passengerID);
            stm.setString(2, travelHistory);

            int affected = stm.executeUpdate();
            return affected > 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Delete passenger travel history failed: " + e.getMessage());
        }
    }
}