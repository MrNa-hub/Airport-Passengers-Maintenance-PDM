// File: app/types/Passenger.ts

export interface Passenger {
  /** Primary Key: PA00001 */
  passengerID: string;

  /** Unique passport identifier */
  passportID: string;

  /** First name */
  firstName: string;

  /** Middle name (optional) */
  middleName: string | null;

  /** Last name */
  lastName: string;

  /** Nationality */
  nation: string | null;

  /** Email address */
  email: string | null;
}

