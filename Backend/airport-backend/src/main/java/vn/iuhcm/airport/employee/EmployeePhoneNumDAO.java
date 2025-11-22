package vn.iuhcm.airport.employee;

import vn.iuhcm.airport.config.Database;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EmployeePhoneNumDAO {

    public List<EmployeePhoneNum> findAll() throws SQLException {
        String sql = "SELECT EmployeeID, PhoneNum FROM Employee_PhonNum";
        List<EmployeePhoneNum> list = new ArrayList<>();

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                String id = rs.getString("EmployeeID");
                String phone = rs.getString("PhoneNum");
                list.add(new EmployeePhoneNum(id, phone));
            }
        }
        return list;
    }

    // PK là (EmployeeID, PhoneNum) – ở đây mình tìm theo cả 2
    public EmployeePhoneNum findById(String employeeID, String phoneNum) throws SQLException {
        String sql = "SELECT EmployeeID, PhoneNum FROM Employee_PhonNum " +
                     "WHERE EmployeeID = ? AND PhoneNum = ?";
        EmployeePhoneNum result = null;

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            ps.setString(2, phoneNum);

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String id = rs.getString("EmployeeID");
                    String phone = rs.getString("PhoneNum");
                    result = new EmployeePhoneNum(id, phone);
                }
            }
        }
        return result;
    }

    public int insert(EmployeePhoneNum obj) throws SQLException {
        String sql = "INSERT INTO Employee_PhonNum (EmployeeID, PhoneNum) VALUES (?, ?)";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, obj.getEmployeeID());
            ps.setString(2, obj.getPhoneNum());
            return ps.executeUpdate();
        }
    }

    public int delete(String employeeID, String phoneNum) throws SQLException {
        String sql = "DELETE FROM Employee_PhonNum WHERE EmployeeID = ? AND PhoneNum = ?";

        try (Connection conn = Database.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, employeeID);
            ps.setString(2, phoneNum);
            return ps.executeUpdate();
        }
    }
}
