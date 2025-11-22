package vn.iuhcm.airport.employee;

public class Employee {
    private String employeeID;  // EM00001
    private String fullName;
    

    public Employee() {
    }

    public Employee(String employeeID, String fullName) {
        this.employeeID = employeeID;
        this.fullName = fullName;
    }

    public String getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeID='" + employeeID + '\'' +
                ", fullName='" + fullName + '\'' +
                '}';
    }
}
