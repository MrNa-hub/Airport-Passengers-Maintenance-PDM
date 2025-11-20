package vn.iuhcm.airport;

import io.javalin.Javalin;
import vn.iuhcm.airport.passenger.PassengerDAO;
import com.fasterxml.jackson.databind.ObjectMapper;

public class App {
    public static void main(String[] args) {

        // Khởi tạo Javalin (chưa bật CORS để tránh lỗi)
        Javalin app = Javalin.create();

        // Khởi tạo DAO và ObjectMapper
        PassengerDAO dao = new PassengerDAO();
        ObjectMapper mapper = new ObjectMapper();

        // Route test server
        app.get("/", ctx -> ctx.result("Airport Backend Running"));

        // API lấy toàn bộ passenger
        app.get("/passengers", ctx -> {
            ctx.json(dao.findAll());
        });

        // Chạy server trên port 7070
        app.start(7070);
        System.out.println("🚀 Server running at http://localhost:7070/");
    }
}
