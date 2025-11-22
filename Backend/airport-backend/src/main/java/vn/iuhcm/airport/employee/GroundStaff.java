package vn.iuhcm.airport.employee;

public class GroundStaff {
    private String employeeID;      // FK -> Employee
    private String department;
    private String position;

    public GroundStaff() {
    }

    public GroundStaff(String employeeID, String department, String position) {
        this.employeeID = employeeID;
        this.department = department;
        this.position = position;
    }

    public String getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    @Override
    public String toString() {
        return "GroundStaff{" +
                "employeeID='" + employeeID + '\'' +
                ", department='" + department + '\'' +
                ", position='" + position + '\'' +
                '}';
    }
}
