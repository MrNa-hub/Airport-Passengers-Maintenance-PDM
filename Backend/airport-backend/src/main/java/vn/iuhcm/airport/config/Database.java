package vn.iuhcm.airport.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {

private static final String URL =
    "jdbc:sqlserver://LAPTOP-OF-POLAR:1435;"
  + "databaseName=AirportDB;"
  + "encrypt=false;trustServerCertificate=true;";

    private static final String USER = "airport_app";
    private static final String PASS = "Aa123456!";


    static {
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Cannot load SQLServer JDBC Driver", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASS);
    }
}
