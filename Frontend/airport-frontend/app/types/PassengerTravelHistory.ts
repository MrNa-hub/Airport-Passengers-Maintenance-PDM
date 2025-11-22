// File: app/types/PassengerTravelHistory.ts

export interface PassengerTravelHistory {
  /** Foreign Key to Passenger */
  passengerID: string;

  /** Travel history description (composite key with passengerID) */
  travelHistory: string;
}

