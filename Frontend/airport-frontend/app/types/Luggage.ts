// File: app/types/Luggage.ts

export type LuggageStatus = 
  | 'Checked-In' 
  | 'Loaded' 
  | 'Unloaded' 
  | 'Missing';

export interface Luggage {
  /** Primary Key: LG00001 */
  luggageID: string;

  /** Weight (DECIMAL(5,2) in DB, mapped to number) */
  weight: number;

  /** Status must be one of the defined LuggageStatus types */
  status: LuggageStatus;

  /** Foreign Key to Ticket */
  ticketID: string;
}