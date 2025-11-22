package vn.iuhcm.airport.ticket;

import java.time.LocalDateTime;

public class Boarding {

    public String passID; // Primary Key: UUID (VARCHAR(36))
    public String flightID;
    public String gateNum;
    public LocalDateTime boardingTime;
    public String seat;
    public String status; // 'Boarded','Waiting','Gate-Closed','No-Show'
    public String ticketID; // Unique Foreign Key to Ticket

    // Constructor rỗng (Jackson cần)
    public Boarding() {
    }

    // Constructor đầy đủ
    public Boarding(String passID, String flightID, String gateNum,
            LocalDateTime boardingTime, String seat, String status, String ticketID) {
        this.passID = passID;
        this.flightID = flightID;
        this.gateNum = gateNum;
        this.boardingTime = boardingTime;
        this.seat = seat;
        this.status = status;
        this.ticketID = ticketID;
    }
}