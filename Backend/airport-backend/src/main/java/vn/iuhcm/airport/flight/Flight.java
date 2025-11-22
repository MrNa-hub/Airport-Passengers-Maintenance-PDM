package vn.iuhcm.airport.flight;

import java.time.LocalDateTime;

public class Flight {
    private String flightID;      // FL00001
    private String flightNum;     // VN123
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private String destination;
    private String origin;
    private String status;
    private String aircraftID;    // FK -> Aircraft

    public Flight() {
    }

    public Flight(String flightID, String flightNum,
                  LocalDateTime departureTime, LocalDateTime arrivalTime,
                  String destination, String origin,
                  String status, String aircraftID) {
        this.flightID = flightID;
        this.flightNum = flightNum;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.destination = destination;
        this.origin = origin;
        this.status = status;
        this.aircraftID = aircraftID;
    }

    public String getFlightID() {
        return flightID;
    }

    public void setFlightID(String flightID) {
        this.flightID = flightID;
    }

    public String getFlightNum() {
        return flightNum;
    }

    public void setFlightNum(String flightNum) {
        this.flightNum = flightNum;
    }

    public LocalDateTime getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        this.departureTime = departureTime;
    }

    public LocalDateTime getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAircraftID() {
        return aircraftID;
    }

    public void setAircraftID(String aircraftID) {
        this.aircraftID = aircraftID;
    }

    @Override
    public String toString() {
        return "Flight{" +
                "flightID='" + flightID + '\'' +
                ", flightNum='" + flightNum + '\'' +
                ", departureTime=" + departureTime +
                ", arrivalTime=" + arrivalTime +
                ", destination='" + destination + '\'' +
                ", origin='" + origin + '\'' +
                ", status='" + status + '\'' +
                ", aircraftID='" + aircraftID + '\'' +
                '}';
    }
}
