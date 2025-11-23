package vn.iuhcm.airport.config;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {
    // change the URL (localhost\\SQLEXPRESS) to do the database connection
    private static final String URL = "jdbc:sqlserver://localhost\\SQLEXPRESS;databaseName=AirportDB;encrypt=false;trustServerCertificate=true";
    private static final String USER = "Airport";
    private static final String PASS = "123456789";

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASS);
        } catch (Exception e) {
            throw new RuntimeException("DB connection failed: " + e.getMessage());
        }
    }
}
