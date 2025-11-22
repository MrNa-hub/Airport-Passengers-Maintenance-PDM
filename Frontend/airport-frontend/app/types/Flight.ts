// File: app/types/Flight.ts

export type FlightStatus = 
  | 'On Time' 
  | 'Delayed' 
  | 'Cancelled'
  | 'Boarding'
  | 'Departed'
  | 'Arrived';

export interface Flight {
  /** Primary Key: FL00001 */
  flightID: string;

  /** Flight number (e.g., VN228) */
  flightNum: string;

  /** DATETIME2 in ISO string format */
  departureTime: string;

  /** DATETIME2 in ISO string format */
  arrivalTime: string;

  /** Destination airport/city */
  destination: string;

  /** Origin airport/city */
  origin: string;

  /** Status must be one of the defined FlightStatus types */
  status: FlightStatus;

  /** Foreign Key to Aircraft */
  aircraftID: string;
}