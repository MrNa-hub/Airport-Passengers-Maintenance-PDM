// File: app/types/PassengerPhoneNum.ts

export interface PassengerPhoneNum {
  /** Foreign Key to Passenger */
  passengerID: string;

  /** Phone number (composite key with passengerID) */
  phoneNum: string;
}

