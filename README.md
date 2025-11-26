# Airport Passengers Maintenance System

A comprehensive database management system for airport passenger operations, developed as part of the **Principles of Database Management** course at International University - Vietnam National University HCMC.

## 👥 Team Members

| Name | Student ID | Role | Responsibility | Contribution |
|------|------------|------|----------------|--------------|
| Tran Quoc Bao | ITITWE20033 | Team Leader | Data Prep, Backend Setup, Frontend Lead | 20% |
| Tran Ngoc Bao Tran | ITCSIU24089 | Team Member | Data Preparation, Database Config | 20% |
| Phan Quoc Anh | ITDSIU21001 | Team Member | Passenger DAO, Passenger List, Tickets Module | 20% |
| Nguyen Phuoc Duoc | ITCSIU23005 | Team Member | Passenger DAO, ERD & Relational Schema | 20% |
| Tran Nguyen Nam Anh | ITITIU20161 | Team Member | REST API, ERD & Relational Schema | 20% |

## 📋 Project Overview

This project implements a full-stack application for managing airport passenger data, including:

- **Passenger Management**: Track passenger information, travel history, and contact details
- **Flight Management**: Manage flights, aircraft, and scheduling
- **Ticket Management**: Handle ticket bookings, seat assignments, and boarding passes
- **Luggage Tracking**: Monitor luggage and security screening
- **Employee Management**: Manage pilots, cabin crew, and ground staff

## 🛠️ Tech Stack

### Backend
- **Java** with Javalin framework
- **Microsoft SQL Server** database
- RESTful API architecture

### Frontend
- **Next.js** (React framework)
- **TypeScript**
- Modern responsive UI

## 📁 Project Structure

```
Airport-Passengers-Maintenance-PDM/
├── Backend/
│   └── airport-backend/     # Java Javalin REST API
├── Frontend/
│   └── airport-frontend/    # Next.js application
├── Data/                    # Sample CSV data files
├── Schema/                  # SQL schema definitions
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Java 11+
- Node.js 18+
- Microsoft SQL Server
- Maven

### Backend Setup
```bash
cd Backend/airport-backend
mvn clean install
mvn exec:java
```
Backend runs on `http://localhost:7070`

### Frontend Setup
```bash
cd Frontend/airport-frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

## 📊 Database

Database backup available at: [Google Drive](https://drive.google.com/file/d/1Uqd_Ry-HiNXYu6FXelSqlfXw9YeRvRC9/view?usp=sharing)

## 📝 License

This project is developed for educational purposes as part of the Principles of Database Management course.
