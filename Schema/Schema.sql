USE AirportDB;
GO

/* ==========================================
   (TUỲ CHỌN) DROP TABLE KHI DEV
   Chỉ dùng lúc phát triển, chưa có data thật
========================================== */
IF OBJECT_ID('dbo.Assignee', 'U') IS NOT NULL DROP TABLE dbo.Assignee;
IF OBJECT_ID('dbo.CabinCrew', 'U') IS NOT NULL DROP TABLE dbo.CabinCrew;
IF OBJECT_ID('dbo.Pilot', 'U') IS NOT NULL DROP TABLE dbo.Pilot;
IF OBJECT_ID('dbo.GroundStaff', 'U') IS NOT NULL DROP TABLE dbo.GroundStaff;
IF OBJECT_ID('dbo.Employee_PhonNum', 'U') IS NOT NULL DROP TABLE dbo.Employee_PhonNum;
IF OBJECT_ID('dbo.Passenger_TravelHistory', 'U') IS NOT NULL DROP TABLE dbo.Passenger_TravelHistory;
IF OBJECT_ID('dbo.Passenger_PhonNum', 'U') IS NOT NULL DROP TABLE dbo.Passenger_PhonNum;
IF OBJECT_ID('dbo.Security_RestrictedItemsFound', 'U') IS NOT NULL DROP TABLE dbo.Security_RestrictedItemsFound;
IF OBJECT_ID('dbo.Security', 'U') IS NOT NULL DROP TABLE dbo.Security;
IF OBJECT_ID('dbo.Luggage', 'U') IS NOT NULL DROP TABLE dbo.Luggage;
IF OBJECT_ID('dbo.Boarding', 'U') IS NOT NULL DROP TABLE dbo.Boarding;
IF OBJECT_ID('dbo.Ticket', 'U') IS NOT NULL DROP TABLE dbo.Ticket;
IF OBJECT_ID('dbo.Flight', 'U') IS NOT NULL DROP TABLE dbo.Flight;
IF OBJECT_ID('dbo.Passenger', 'U') IS NOT NULL DROP TABLE dbo.Passenger;
IF OBJECT_ID('dbo.Employee', 'U') IS NOT NULL DROP TABLE dbo.Employee;
IF OBJECT_ID('dbo.Aircraft', 'U') IS NOT NULL DROP TABLE dbo.Aircraft;
GO

/* ==========================================
   1. AIRCRAFT
========================================== */
CREATE TABLE Aircraft (
    AircraftID      VARCHAR(10)  NOT NULL, -- AC001
    RegistrationNum VARCHAR(20)  NOT NULL, -- VN-A321
    Model           VARCHAR(100) NOT NULL, -- Airbus A321
    Capacity        INT          NOT NULL CHECK (Capacity >= 150 AND Capacity <= 400),
    Airline         VARCHAR(100) NOT NULL,
    CONSTRAINT PK_Aircraft PRIMARY KEY (AircraftID),
    CONSTRAINT UQ_Aircraft_Registration UNIQUE (RegistrationNum)
);
GO

/* Index gợi ý */
CREATE INDEX IX_Aircraft_Airline ON Aircraft(Airline);
CREATE INDEX IX_Aircraft_Model   ON Aircraft(Model);
GO

/* ==========================================
   2. EMPLOYEE  — REMOVED ROLE
========================================== */
CREATE TABLE Employee (
    EmployeeID VARCHAR(7)   NOT NULL,  -- EM00001
    FullName   NVARCHAR(100) NOT NULL,
    
    CONSTRAINT PK_Employee PRIMARY KEY (EmployeeID)
);
GO

CREATE INDEX IX_Employee_Name ON Employee(FullName);
GO


/* ==========================================
   3. PASSENGER
========================================== */
CREATE TABLE Passenger (
    PassengerID VARCHAR(7)  NOT NULL,  -- PA00001
    PassportID  VARCHAR(20) NOT NULL UNIQUE,  
    FirstName   NVARCHAR(50) NOT NULL,
    MiddleName  NVARCHAR(50) NULL,
    LastName    NVARCHAR(50) NOT NULL,
    Nation      VARCHAR(60) NULL,
    Email       VARCHAR(254) NULL,

    CONSTRAINT PK_Passenger PRIMARY KEY (PassengerID),

    CONSTRAINT CHK_Passenger_ID_Format
        CHECK (PassengerID LIKE 'PA[0-9][0-9][0-9][0-9][0-9]'),

    CONSTRAINT CHK_Passenger_Email
        CHECK (Email IS NULL OR Email LIKE '%@%')
);
GO

CREATE INDEX IX_Passenger_Name   ON Passenger(LastName, FirstName);
CREATE INDEX IX_Passenger_Nation ON Passenger(Nation);
GO

/* ==========================================
   4. FLIGHT  
========================================== */
CREATE TABLE Flight (
    FlightID      VARCHAR(10)  NOT NULL,   -- FL00001
    ArrivalTime   DATETIME2    NOT NULL,
    DepartureTime DATETIME2    NOT NULL,
    Destination   VARCHAR(100) NOT NULL,
    Status        VARCHAR(20)  NOT NULL,
    FlightNum     VARCHAR(10)  NOT NULL,
    AircraftID    VARCHAR(10)  NOT NULL,   -- FK -> Aircraft(AircraftID)

    CONSTRAINT PK_Flight PRIMARY KEY (FlightID),

    CONSTRAINT CHK_Flight_Status CHECK (
        Status IN ('On Time','Delayed','Cancelled',
                   'Boarding','Departed','Arrived')
    ),

    CONSTRAINT CHK_Flight_Time CHECK (ArrivalTime > DepartureTime),

    CONSTRAINT FK_Flight_Aircraft
        FOREIGN KEY (AircraftID) REFERENCES Aircraft(AircraftID)
);
GO

/* ==========================================
   5. TICKET  (NO FlightDate)
========================================== */
CREATE TABLE Ticket (
    TicketID     VARCHAR(7)   NOT NULL, -- TI00001
    Seat         VARCHAR(10)  NOT NULL,
    Class        VARCHAR(20)  NOT NULL
        CHECK (Class IN ('Economy','Business','First')),
    PurchaseDate DATETIME2    NOT NULL,

    PassengerID  VARCHAR(7)   NOT NULL, -- FK → Passenger
    FlightID     VARCHAR(10)  NOT NULL, -- FK → Flight

    CONSTRAINT PK_Ticket PRIMARY KEY (TicketID),

    CONSTRAINT FK_Ticket_Passenger
        FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID),

    CONSTRAINT FK_Ticket_Flight
        FOREIGN KEY (FlightID) REFERENCES Flight(FlightID)
);
GO

CREATE INDEX IX_Ticket_Passenger ON Ticket(PassengerID);
CREATE INDEX IX_Ticket_Flight    ON Ticket(FlightID);
CREATE INDEX IX_Ticket_Class     ON Ticket(Class);
GO

/* ==========================================
   6. BOARDING
========================================== */
CREATE TABLE Boarding (
    PassID       VARCHAR(36) NOT NULL, -- UUID
    FlightID     VARCHAR(10) NOT NULL,
    GateNum      VARCHAR(10) NOT NULL,
    BoardingTime DATETIME2   NOT NULL,
    Seat         VARCHAR(10) NOT NULL,
    Status       VARCHAR(20) NOT NULL
        CHECK (Status IN ('Boarded','Waiting','Gate-Closed','No-Show')),
    TicketID     VARCHAR(7)  NOT NULL UNIQUE,

    CONSTRAINT PK_Boarding PRIMARY KEY (PassID),

    CONSTRAINT FK_Boarding_Flight
        FOREIGN KEY (FlightID) REFERENCES Flight(FlightID),

    CONSTRAINT FK_Boarding_Ticket
        FOREIGN KEY (TicketID) REFERENCES Ticket(TicketID)
);
GO

CREATE INDEX IX_Boarding_Flight ON Boarding(FlightID);
CREATE INDEX IX_Boarding_Status ON Boarding(Status);
CREATE INDEX IX_Boarding_Time   ON Boarding(BoardingTime);
CREATE INDEX IX_Boarding_Seat 	ON Boarding(Seat);
GO

/* ==========================================
   7. LUGGAGE
========================================== */
CREATE TABLE Luggage (
    LuggageID VARCHAR(10)   NOT NULL, -- LG00001
    Weight    DECIMAL(5,2)  NOT NULL,
    Status    VARCHAR(20)   NOT NULL
        CHECK (Status IN ('Checked-In','Loaded','Unloaded','Missing')),
    TicketID  VARCHAR(7)    NOT NULL,

    CONSTRAINT PK_Luggage PRIMARY KEY (LuggageID),

    CONSTRAINT FK_Luggage_Ticket
        FOREIGN KEY (TicketID) REFERENCES Ticket(TicketID),

    CONSTRAINT CHK_Luggage_Weight CHECK (Weight >= 0)
);
GO

CREATE INDEX IX_Luggage_Ticket ON Luggage(TicketID);
CREATE INDEX IX_Luggage_Status ON Luggage(Status);
GO

/* ==========================================
   8. SECURITY
========================================== */
CREATE TABLE Security (
    SecurityLogID   VARCHAR(10)  NOT NULL, -- SE00001
    [Timestamp]     DATETIME2    NOT NULL,
    ScreeningResult VARCHAR(20)  NOT NULL
        CHECK (ScreeningResult IN ('Clear','Flagged','Confiscated')),
    TicketID        VARCHAR(7)   NOT NULL,

    CONSTRAINT PK_Security PRIMARY KEY (SecurityLogID),

    CONSTRAINT FK_Security_Ticket
        FOREIGN KEY (TicketID) REFERENCES Ticket(TicketID)
);
GO

CREATE INDEX IX_Security_Ticket ON Security(TicketID);
CREATE INDEX IX_Security_Result ON Security(ScreeningResult);
CREATE INDEX IX_Security_Time   ON Security([Timestamp]);
GO


/*==============================SUPPORTING TABLES====================================*/

/* ==========================================
   9. SECURITY_RESTRICTEDITEMSFOUND
========================================== */
CREATE TABLE Security_RestrictedItemsFound (
    SecurityLogID       VARCHAR(10)   NOT NULL,
    RestrictedItemFound NVARCHAR(100) NOT NULL,

    CONSTRAINT PK_Security_Restricted PRIMARY KEY (SecurityLogID, RestrictedItemFound),

    CONSTRAINT FK_Security_Restricted_Security
        FOREIGN KEY (SecurityLogID) REFERENCES Security(SecurityLogID)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_Security_Restricted_Log ON Security_RestrictedItemsFound(SecurityLogID);
GO

/* ==========================================
   10. PASSENGER_PHONNUM
========================================== */
CREATE TABLE Passenger_PhonNum (
    PassengerID VARCHAR(7)  NOT NULL,
    PhoneNum    VARCHAR(20) NOT NULL,

    CONSTRAINT PK_Passenger_Phone PRIMARY KEY (PassengerID, PhoneNum),

    CONSTRAINT FK_PassengerPhone_Passenger
        FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID)
        ON DELETE CASCADE,

    CONSTRAINT CHK_PassengerPhone_Format
        CHECK (PhoneNum LIKE '+%' OR PhoneNum LIKE '[0-9]%')
);
GO

CREATE INDEX IX_PassengerPhone_Passenger ON Passenger_PhonNum(PassengerID);
GO

/* ==========================================
   11. PASSENGER_TRAVELHISTORY
========================================== */
CREATE TABLE Passenger_TravelHistory (
    PassengerID   VARCHAR(7)    NOT NULL,
    TravelHistory NVARCHAR(255) NOT NULL,

    CONSTRAINT PK_Passenger_Travel PRIMARY KEY (PassengerID, TravelHistory),

    CONSTRAINT FK_PassengerTravel_Passenger
        FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_PassengerTravel_Passenger ON Passenger_TravelHistory(PassengerID);
GO

/* ==========================================
   12. EMPLOYEE_PHONNUM
========================================== */
CREATE TABLE Employee_PhonNum (
    EmployeeID VARCHAR(7)  NOT NULL,
    PhoneNum   VARCHAR(20) NOT NULL,

    CONSTRAINT PK_Employee_Phone PRIMARY KEY (EmployeeID, PhoneNum),

    CONSTRAINT FK_EmployeePhone_Employee
        FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
        ON DELETE CASCADE,

    CONSTRAINT CHK_EmployeePhone_Format
        CHECK (PhoneNum LIKE '+%' OR PhoneNum LIKE '[0-9]%')
);
GO

CREATE INDEX IX_EmployeePhone_Employee ON Employee_PhonNum(EmployeeID);
GO

/* ==========================================
   13. GROUNDSTAFF
========================================== */
CREATE TABLE GroundStaff (
    EmployeeID VARCHAR(7)    NOT NULL,
    Department NVARCHAR(100) NOT NULL,
    Position   NVARCHAR(100) NOT NULL,

    CONSTRAINT PK_GroundStaff PRIMARY KEY (EmployeeID),

    CONSTRAINT FK_GroundStaff_Employee
        FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_GroundStaff_Department ON GroundStaff(Department);
GO

/* ==========================================
   14. PILOT
========================================== */
CREATE TABLE Pilot (
    EmployeeID     VARCHAR(7)    NOT NULL,
    PilotLicenseNo VARCHAR(20)   NOT NULL,
    FlightHours    INT           NOT NULL CHECK (FlightHours >= 0),
    Rank           NVARCHAR(50)  NOT NULL,

    CONSTRAINT PK_Pilot PRIMARY KEY (EmployeeID),

    CONSTRAINT FK_Pilot_Employee
        FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
        ON DELETE CASCADE,

    CONSTRAINT UQ_Pilot_License UNIQUE (PilotLicenseNo)
);
GO

CREATE INDEX IX_Pilot_Rank ON Pilot(Rank);
GO

/* ==========================================
   15. CABINCREW
========================================== */
CREATE TABLE CabinCrew (
    EmployeeID        VARCHAR(7)    NOT NULL,
    CertificationArea NVARCHAR(100) NOT NULL,
    CrewRank          NVARCHAR(50)  NOT NULL,

    CONSTRAINT PK_CabinCrew PRIMARY KEY (EmployeeID),

    CONSTRAINT FK_CabinCrew_Employee
        FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_CabinCrew_CrewRank ON CabinCrew(CrewRank);
GO

/* ==========================================
   16. ASSIGNEE (EMPLOYEE ↔ FLIGHT)
========================================== */
CREATE TABLE Assignee (
    EmployeeID VARCHAR(7)   NOT NULL,
    FlightID   VARCHAR(10)  NOT NULL,

    CONSTRAINT PK_Assignee PRIMARY KEY (EmployeeID, FlightID),

    CONSTRAINT FK_Assignee_Employee
        FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
        ON DELETE CASCADE,

    CONSTRAINT FK_Assignee_Flight
        FOREIGN KEY (FlightID) REFERENCES Flight(FlightID)
        ON DELETE CASCADE
);
GO

CREATE INDEX IX_Assignee_Flight   ON Assignee(FlightID);
CREATE INDEX IX_Assignee_Employee ON Assignee(EmployeeID);
GO
