package vn.iuhcm.airport.passenger;

public class PassengerPhoneNum {

    public String passengerID;
    public String phoneNum;

    // Constructor rỗng (Jackson cần)
    public PassengerPhoneNum() {
    }

    // Constructor đầy đủ
    public PassengerPhoneNum(String passengerID, String phoneNum) {
        this.passengerID = passengerID;
        this.phoneNum = phoneNum;
    }
}