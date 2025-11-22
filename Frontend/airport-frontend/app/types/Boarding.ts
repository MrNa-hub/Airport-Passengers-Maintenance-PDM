// File: app/types/Boarding.ts

export type BoardingStatus = 
  | 'Boarded' 
  | 'Waiting' 
  | 'Gate-Closed' 
  | 'No-Show';

export interface Boarding {
  /** Primary Key: UUID string (VARCHAR(36)) */
  passID: string;

  /** Foreign Key to Flight */
  flightID: string;

  /** Gate number */
  gateNum: string;

  /** DATETIME2 in ISO string format */
  boardingTime: string;

  /** Seat number (VARCHAR(10)) */
  seat: string;

  /** Status must be one of the defined BoardingStatus types */
  status: BoardingStatus;

  /** Unique Foreign Key to Ticket */
  ticketID: string;
}