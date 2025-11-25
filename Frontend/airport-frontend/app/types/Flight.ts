// File: app/types/Flight.ts

export type FlightStatus = 
  | 'On Time' 
  | 'Delayed' 
  | 'Cancelled'
  | 'Boarding'
  | 'Departed'
  | 'Arrived';

export interface Flight {
   flightID: string;
  flightNum: string;
  departureTime: string;
  arrivalTime: string;
  destination: string;
  origin: string;
  status: string;
  aircraftID: string;
}