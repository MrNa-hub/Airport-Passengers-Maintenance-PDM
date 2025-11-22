package vn.iuhcm.airport.passenger;

public class PassengerTravelHistory {

    public String passengerID;
    public String travelHistory;

    // Constructor rỗng (Jackson cần)
    public PassengerTravelHistory() {
    }

    // Constructor đầy đủ
    public PassengerTravelHistory(String passengerID, String travelHistory) {
        this.passengerID = passengerID;
        this.travelHistory = travelHistory;
    }
}