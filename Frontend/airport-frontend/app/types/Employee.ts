// src/types/employee.ts
export type Employee = {
  employeeID: string;
  fullName : string;
  role: 'PILOT' | 'CABIN_CREW' | 'GROUND_STAFF';
};

// src/types/employee-phone-num.ts
export type EmployeePhoneNum = {
  employeeID: string;
  phoneNum: string;
};

// src/types/pilot.ts
export type Pilot = {
  employeeID: string; // FK sang employees
  pilotLicenseNo: string;
  flightHours: Int16Array;
  rank: string;
};

// src/types/cabin-crew.ts
export type CabinCrew = {
  employeeID: string;
  certificationArea: string;
  crewRank: string;
};

// src/types/ground-staff.ts
export type GroundStaff = {
  employeeID: string;
  department: string;
  position: string;
};

// src/types/assignee.ts
export type Assignee = {
  flightID: string;
  employeeID: string;
};
