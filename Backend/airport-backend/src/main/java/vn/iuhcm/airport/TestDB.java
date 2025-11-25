package vn.iuhcm.airport;

import vn.iuhcm.airport.config.Database;
import java.sql.Connection;

public class TestDB {
    public static void main(String[] args) {
        try (Connection conn = Database.getConnection()) {
            System.out.println("Connected: " + (conn != null && !conn.isClosed()));
        } catch (Exception e) {
            System.out.println("Connected: false");
            e.printStackTrace();
        }
    }
}
