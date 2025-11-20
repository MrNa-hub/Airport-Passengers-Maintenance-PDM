package vn.iuhcm.airport.config;

import java.sql.Connection;
import java.sql.DriverManager;

public class Database {
    private static final String URL = "jdbc:sqlserver://localhost\\SQLEXPRESS;databaseName=airport_app;encrypt=false;trustServerCertificate=true";
    private static final String USER = "airport_app";
    private static final String PASS = "PDM_Sem125!";

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASS);
        } catch (Exception e) {
            throw new RuntimeException("DB connection failed: " + e.getMessage());
        }
    }
}
