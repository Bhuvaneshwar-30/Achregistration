# ACH Mandate Registration System

This project was developed during my internship. It allows users to register and manage ACH (Automated Clearing House) mandates securely and efficiently.

## 🔧 Features
- Register new ACH mandates
- View, search, and manage existing mandates
- Validate bank and account details before submission
- Digital signing and verification (if integrated)
- Status tracking and error handling

## 🛠️ Technologies Used
- Angular (Frontend)
- .NET Core Web API (Backend)
- SQL Server (Database)
- Optional: Integration with NPCI / Bank API

## 📁 Project Structure
- `/ach-frontend` – Angular frontend application
- `/ach-backend` – .NET Core Web API backend

## 🚀 Setup Instructions

### Backend:
1. Open `ach-backend` in Visual Studio
2. Configure connection string to your SQL Server
3. Run the application

### Frontend:
```bash
cd ach-frontend
npm install
ng serve
```

## 📌 Notes
- Created as part of my internship project.
- Designed to follow industry best practices for secure mandate handling.