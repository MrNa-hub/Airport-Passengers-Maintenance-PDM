// src/types/pilot.ts
export type Pilot = {
  employeeID: string; // FK sang employees
  pilotLicenseNo: string;
  flightHours: Int16Array;
  rank: string;
};