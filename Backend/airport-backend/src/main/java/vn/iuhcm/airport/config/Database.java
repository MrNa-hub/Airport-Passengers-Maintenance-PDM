package vn.iuhcm.airport.config;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {
    private static final String URL = "jdbc:sqlserver://localhost:1433;databaseName=AirportDB;encrypt=false";
    private static final String USER = "sa";
    private static final String PASS = "your_password"; // ĐỔI THÀNH MẬT KHẨU THẬT

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASS);
        } catch (Exception e) {
            throw new RuntimeException("DB connection failed: " + e.getMessage());
        }
    }
}
