// File: app/types/Aircraft.ts

export interface Aircraft {
  /** Primary Key: AC00001 */
  aircraftID: string;

  /** Unique registration number of the aircraft (e.g., VN-A123) */
  registrationNum: string;

  /** Aircraft model (e.g., Airbus A321, Boeing 787) */
  model: string;

  /** Seating capacity (150–400 seats depending on model) */
  capacity: number;

  /** Airline operating the aircraft */
  airline: string;
}
