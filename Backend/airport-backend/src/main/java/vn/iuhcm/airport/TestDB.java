package vn.iuhcm.airport;

import vn.iuhcm.airport.config.Database;
import java.sql.Connection;

public class TestDB {
    public static void main(String[] args) {
        try {
            Connection conn = Database.getConnection();
            if (conn != null && !conn.isClosed()) {
                System.out.println("Connected: true");
                conn.close();
            } else {
                System.out.println("Connected: false");
            }
        } catch (Exception e) {
            System.out.println("Connected: false");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

