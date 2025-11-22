package vn.iuhcm.airport.luggage;

import java.time.LocalDateTime;

public class Security {

    public String securityLogID; // Primary Key: SE00001
    public LocalDateTime timestamp; // DATETIME2
    public String screeningResult; // 'Clear','Flagged','Confiscated'
    public String ticketID; // Foreign Key to Ticket

    // Constructor rỗng (Jackson cần)
    public Security() {
    }

    // Constructor đầy đủ
    public Security(String securityLogID, LocalDateTime timestamp, String screeningResult, String ticketID) {
        this.securityLogID = securityLogID;
        this.timestamp = timestamp;
        this.screeningResult = screeningResult;
        this.ticketID = ticketID;
    }
}