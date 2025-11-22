package vn.iuhcm.airport.flight;

public class Aircraft {
    private String aircraftID;       // AC001
    private String registrationNum;  // VN-A321
    private String model;            // Airbus A321
    private int capacity;
    private String airline;

    public Aircraft() {
    }

    public Aircraft(String aircraftID, String registrationNum, String model,
                    int capacity, String airline) {
        this.aircraftID = aircraftID;
        this.registrationNum = registrationNum;
        this.model = model;
        this.capacity = capacity;
        this.airline = airline;
    }

    public String getAircraftID() {
        return aircraftID;
    }

    public void setAircraftID(String aircraftID) {
        this.aircraftID = aircraftID;
    }

    public String getRegistrationNum() {
        return registrationNum;
    }

    public void setRegistrationNum(String registrationNum) {
        this.registrationNum = registrationNum;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    @Override
    public String toString() {
        return "Aircraft{" +
                "aircraftID='" + aircraftID + '\'' +
                ", registrationNum='" + registrationNum + '\'' +
                ", model='" + model + '\'' +
                ", capacity=" + capacity +
                ", airline='" + airline + '\'' +
                '}';
    }
}
