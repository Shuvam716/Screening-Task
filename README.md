# Project Name

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
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
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

## Screenshots
*(Add screenshots of the course page and API response box here)*

---

```bash
# First-time setup
git init
git add .
git commit -m "feat: initial submission — Next.js + Flask full-stack project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```
