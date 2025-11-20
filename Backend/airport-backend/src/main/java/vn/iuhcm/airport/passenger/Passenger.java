package vn.iuhcm.airport.passenger;

public class Passenger {

    public String passengerID;   // PA00001
    public String passportID;
    public String firstName;
    public String middleName;
    public String lastName;
    public String nation;
    public String email;

    // Constructor rỗng (Jackson cần)
    public Passenger() {}

    // Constructor đầy đủ
    public Passenger(String passengerID, String passportID, String firstName,
                     String middleName, String lastName, String nation, String email) {
        this.passengerID = passengerID;
        this.passportID = passportID;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.nation = nation;
        this.email = email;
    }

    // Optional: Getter cho Fullname
    public String getFullname() {
        if (middleName == null || middleName.isBlank()) {
            return firstName + " " + lastName;
        }
        return firstName + " " + middleName + " " + lastName;
    }
}
