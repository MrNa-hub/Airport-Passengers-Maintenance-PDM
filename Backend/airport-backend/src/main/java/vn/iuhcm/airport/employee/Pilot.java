package vn.iuhcm.airport.employee;

public class Pilot {
    private String employeeID;       // PK, FK -> Employee
    private String pilotLicenseNo;
    private int flightHours;
    private String rank;

    public Pilot() {
    }

    public Pilot(String employeeID, String pilotLicenseNo, int flightHours, String rank) {
        this.employeeID = employeeID;
        this.pilotLicenseNo = pilotLicenseNo;
        this.flightHours = flightHours;
        this.rank = rank;
    }

    public String getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }

    public String getPilotLicenseNo() {
        return pilotLicenseNo;
    }

    public void setPilotLicenseNo(String pilotLicenseNo) {
        this.pilotLicenseNo = pilotLicenseNo;
    }

    public int getFlightHours() {
        return flightHours;
    }

    public void setFlightHours(int flightHours) {
        this.flightHours = flightHours;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    @Override
    public String toString() {
        return "Pilot{" +
                "employeeID='" + employeeID + '\'' +
                ", pilotLicenseNo='" + pilotLicenseNo + '\'' +
                ", flightHours=" + flightHours +
                ", rank='" + rank + '\'' +
                '}';
    }
}
