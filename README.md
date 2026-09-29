# ACADEX ULTIMATE — FULL WORKING PROJECT

#Features
- Student login with JWT
- Dashboard: score, attendance, assignment average and status
- Subject performance
- Assignments
- Course browsing and enrollment
- Real graphs using Recharts
- What-If academic prediction
- Speakit communication practice using browser microphone/speech recognition
- PostgreSQL database
- Express backend

## IMPORTANT: Do this exactly
### 1. Install PostgreSQL and create database
Open pgAdmin Query Tool and run:
```sql
CREATE DATABASE acadex;
```

### 2. Backend setup
Open `backend/.env.example`, copy it as `.env`.

Change:
`YOUR_POSTGRES_PASSWORD`

Then:
```powershell
cd backend
npm install
npm run db:init
npm run dev
```
You must see:
`Acadex API running on http://localhost:5000`

### 3. Frontend setup
Open a NEW terminal:
```powershell
cd frontend
npm install
npm run dev
```

Open:
`http://localhost:3000/login`

Demo login:
- Email: student@acadex.com
- Password: 123456

## IMPORTANT
Do NOT run `npm audit fix --force`. The project versions are intentionally pinned.

If port 5000 is already used:
```powershell
netstat -ano | findstr :5000
taskkill /PID YOUR_PID /F
```

## Speakit
For microphone speech recognition, use Chrome and allow microphone permission.
You can also type or paste speech text manually.
