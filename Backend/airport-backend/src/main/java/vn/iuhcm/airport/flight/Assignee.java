package vn.iuhcm.airport.flight;

public class Assignee {
    private String employeeID;  // PK part, FK -> Employee
    private String flightID;    // PK part, FK -> Flight

    public Assignee() {
    }

    public Assignee(String employeeID, String flightID) {
        this.employeeID = employeeID;
        this.flightID = flightID;
    }

    public String getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }

    public String getFlightID() {
        return flightID;
    }

    public void setFlightID(String flightID) {
        this.flightID = flightID;
    }

    @Override
    public String toString() {
        return "Assignee{" +
                "employeeID='" + employeeID + '\'' +
                ", flightID='" + flightID + '\'' +
                '}';
    }
}
