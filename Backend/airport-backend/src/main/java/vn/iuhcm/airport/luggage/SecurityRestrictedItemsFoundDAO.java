package vn.iuhcm.airport.luggage;

import vn.iuhcm.airport.config.Database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SecurityRestrictedItemsFoundDAO {

    // 1) Lấy tất cả records
    public List<SecurityRestrictedItemsFound> findAll() {
        List<SecurityRestrictedItemsFound> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Security_RestrictedItemsFound";
            PreparedStatement stm = conn.prepareStatement(sql);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new SecurityRestrictedItemsFound(
                        rs.getString("SecurityLogID"),
                        rs.getString("RestrictedItemFound")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 2) Tìm tất cả items restricted items for a SecurityLogID
    public List<SecurityRestrictedItemsFound> findBySecurityLogId(String securityLogId) {
        List<SecurityRestrictedItemsFound> list = new ArrayList<>();
        try (Connection conn = Database.getConnection()) {
            String sql = "SELECT * FROM Security_RestrictedItemsFound WHERE SecurityLogID = ?";
            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, securityLogId);
            ResultSet rs = stm.executeQuery();

            while (rs.next()) {
                list.add(new SecurityRestrictedItemsFound(
                        rs.getString("SecurityLogID"),
                        rs.getString("RestrictedItemFound")));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // 3) Thêm restricted item mới
    public SecurityRestrictedItemsFound insert(SecurityRestrictedItemsFound s) {
        try (Connection conn = Database.getConnection()) {

            String sql = "INSERT INTO Security_RestrictedItemsFound " +
                    "(SecurityLogID, RestrictedItemFound) " +
                    "VALUES (?, ?)";

            PreparedStatement stm = conn.prepareStatement(sql);
            stm.setString(1, s.securityLogID);
            stm.setString(2, s.restrictedItemFound);

            int affected = stm.executeUpdate();
            if (affected == 0) {
                throw new SQLException("Insert restricted item failed, no rows affected.");
            }

            return s;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Insert restricted item failed: " + e.getMessage());
        }
    }
}