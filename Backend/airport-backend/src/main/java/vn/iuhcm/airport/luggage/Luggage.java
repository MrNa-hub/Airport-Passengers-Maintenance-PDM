package vn.iuhcm.airport.luggage;

import java.math.BigDecimal;

public class Luggage {

    public String luggageID; // Primary Key: LG00001
    public BigDecimal weight; // DECIMAL(5,2)
    public String status; // 'Checked-In','Loaded','Unloaded','Missing'
    public String ticketID; // Foreign Key to Ticket

    // Constructor rỗng (Jackson cần)
    public Luggage() {
    }

    // Constructor đầy đủ
    public Luggage(String luggageID, BigDecimal weight, String status, String ticketID) {
        this.luggageID = luggageID;
        this.weight = weight;
        this.status = status;
        this.ticketID = ticketID;
    }
}