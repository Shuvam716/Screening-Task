# Web Dev Screening Task

This project features a modern, responsive React/Next.js frontend that displays a catalog of courses with real-time searching and filtering, alongside a robust Python Flask backend API that validates incoming Indian mobile numbers and messages. The frontend and backend are seamlessly connected to provide an interactive "Send a Message" feature with live, inline response feedback.

## Tech Stack
- Frontend: Next.js 14, TypeScript, Tailwind CSS
- Backend: Python, Flask, flask-cors

## Features
- [x] Course listing with real-time search/filter (Task 1)
- [x] Indian mobile number validation API (Task 2)
- [x] Connected frontend → Flask API with live response display (Task 3)

## How to Run Locally

### Backend (Flask)
```bash
cd backend
where python
C:\Python313\python.exe -m pip install flask flask-cors      # Replace C:\Python313\python.exe with the output of the where python
C:\Python313\python.exe app.py
# Runs on http://localhost:5000
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

## API Reference

`POST /api/send-message`
Body: `{ "phone_number": "9876543210", "message": "Hello" }`

- **Success (200)**:  `{ "success": true, "message": "Message sent successfully", "phone_number": "9876543210" }`
- **Error   (400)**:  `{ "success": false, "error": "<reason>" }`
- **Missing (422)**:  `{ "success": false, "error": "Missing required fields" }`
```
The messages are stored in the backend/message.json
```
