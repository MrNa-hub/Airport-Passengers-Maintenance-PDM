// File: app/types/SecurityLog.ts

export interface SecurityLog {
  /** Primary Key: SE00001 */
  securityLogID: string;

  /** Foreign Key → Flight.FL00001 */
  flightID: string;

  /** Foreign Key → Employee.EMP001 */
  employeeID: string;

  /** Screening timestamp (ISO datetime string) */
  logTime: string;

  /** Security gate where the scan took place */
  gate: string | null;

  /** Optional notes from the security officer */
  note: string | null;

  /** List of restricted item IDs detected during screening */
  restrictedItemIDs?: string[];
}
