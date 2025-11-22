package vn.iuhcm.airport.ticket;

import java.time.LocalDateTime;

public class Ticket {

    public String ticketID; // Primary Key: TI00001
    public String seat;
    public String classType; // Use classType to avoid conflict with Java keyword 'class'
    public LocalDateTime purchaseDate;
    public String passengerID; // Foreign Key to Passenger
    public String flightID; // Foreign Key to Flight

    // Constructor rỗng (Jackson cần)
    public Ticket() {
    }

    // Constructor đầy đủ
    public Ticket(String ticketID, String seat, String classType,
            LocalDateTime purchaseDate, String passengerID, String flightID) {
        this.ticketID = ticketID;
        this.seat = seat;
        this.classType = classType;
        this.purchaseDate = purchaseDate;
        this.passengerID = passengerID;
        this.flightID = flightID;
    }
}