package vn.iuhcm.airport.employee;

public class EmployeePhoneNum {
    private String employeeID;
    private String phoneNum;

    public EmployeePhoneNum() {
    }

    public EmployeePhoneNum(String employeeID, String phoneNum) {
        this.employeeID = employeeID;
        this.phoneNum = phoneNum;
    }

    public String getEmployeeID() {
        return employeeID;
    }

    public void setEmployeeID(String employeeID) {
        this.employeeID = employeeID;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    @Override
    public String toString() {
        return "EmployeePhoneNum{" +
                "employeeID='" + employeeID + '\'' +
                ", phoneNum='" + phoneNum + '\'' +
                '}';
    }
}
