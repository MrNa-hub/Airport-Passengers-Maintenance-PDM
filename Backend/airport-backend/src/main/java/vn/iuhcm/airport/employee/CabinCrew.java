package vn.iuhcm.airport.employee;

public class CabinCrew {
    private String employeeID;         // PK, FK -> Employee
    private String certificationArea;
    private String crewRank;

    public CabinCrew() {
    }

    public CabinCrew(String employeeID, String certificationArea, String crewRank) {
        this.employeeID = employeeID;
        this.certificationArea = certificationArea;
        this.crewRank = crewRank;
    }

    public String getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }

    public String getCertificationArea() {
        return certificationArea;
    }

    public void setCertificationArea(String certificationArea) {
        this.certificationArea = certificationArea;
    }

    public String getCrewRank() {
        return crewRank;
    }

    public void setCrewRank(String crewRank) {
        this.crewRank = crewRank;
    }

    @Override
    public String toString() {
        return "CabinCrew{" +
                "employeeID='" + employeeID + '\'' +
                ", certificationArea='" + certificationArea + '\'' +
                ", crewRank='" + crewRank + '\'' +
                '}';
    }
}
