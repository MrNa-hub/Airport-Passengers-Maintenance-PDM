// File: app/types/Ticket.ts

export type TicketClass = 'Economy' | 'Business' | 'First';

export interface Ticket {
  /** Primary Key: TI00001 */
  ticketID: string;

  /** Seat number (e.g., 12A) */
  seat: string;

  /** Class of travel */
  classType: TicketClass;

  /** DATETIME2 in ISO string format */
  purchaseDate: string;

  /** Foreign Key to Passenger */
  passengerID: string;

  /** Foreign Key to Flight */
  flightID: string;
}