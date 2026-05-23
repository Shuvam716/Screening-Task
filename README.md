# Full-Stack Course Catalog — Next.js + Flask

A full-stack web application built as an assignment submission. It combines a **Next.js 14** frontend with a **Python Flask** REST API backend to deliver a searchable course catalog with a live messaging feature.

---

## What Was Built

### Task 1 — Course Catalog with Real-Time Search
A responsive grid of 8 courses sourced from a static dataset. Each card displays:
- Course name, type (Full Course / Crash Course / Masterclass), and category
- Instructor, module count, and a short description
- Cover image with a dark gradient overlay
- **Enrol Now** and **About Course** action buttons

A search bar filters courses **instantly** (no page reload) by name or category using `useMemo`.

### Task 2 — Indian Mobile Number Validation API
A Flask REST endpoint (`POST /api/send-message`) that:
- Accepts a JSON body with `phone_number` and `message`
- Validates the phone number against the Indian mobile format: exactly **10 digits, starting with 6–9**
- Returns structured JSON responses for success, validation errors, or missing fields
- Persists every successful submission to a local `messages.json` file with a timestamp

### Task 3 — Connected Frontend ↔ Backend
A floating **chat button** (bottom-right corner) opens a message panel where users can:
- Enter a 10-digit Indian mobile number
- Type a message and submit the form
- See **live inline feedback** — green on success, red on validation error — without any page navigation

The panel hits the Flask API at `http://localhost:5000/api/send-message` and displays the server's JSON response directly in the UI.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | Next.js 14, TypeScript, Tailwind CSS |
| Backend   | Python 3, Flask 3, flask-cors        |
| Storage   | Local JSON file (`messages.json`)    |

---

## Project Structure

```
Assignment/
├── frontend/                   # Next.js application
│   ├── app/
│   │   ├── page.tsx            # Main page: course catalog + chat widget
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── package.json
│   └── tailwind.config.ts
│
└── backend/                    # Flask application
    ├── app.py                  # API server with validation logic
    ├── messages.json           # Auto-created; stores submitted messages
    └── requirements.txt        # Python dependencies
```

---

## How to Run Locally

> Both servers must be running at the same time — open two terminal windows.

### 1. Backend (Flask) — Terminal 1

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS / Linux

# Install dependencies
pip install -r requirements.txt

# Start the server
python app.py
# → Running on http://localhost:5000
```

### 2. Frontend (Next.js) — Terminal 2

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
# → Running on http://localhost:3000
```

Then open **http://localhost:3000** in your browser.

---

## API Reference

### `POST /api/send-message`

**Request body (JSON):**
```json
{
  "phone_number": "9876543210",
  "message": "Hello, I have a question about the course."
}
```

**Responses:**

| Status | Condition              | Response body                                                                 |
|--------|------------------------|-------------------------------------------------------------------------------|
| `200`  | Valid number & message | `{ "success": true, "message": "Message sent successfully", "phone_number": "9876543210" }` |
| `400`  | Invalid phone / empty message | `{ "success": false, "error": "<reason>" }`                          |
| `422`  | Missing fields         | `{ "success": false, "error": "Missing required fields" }`                   |

**Phone number rules:** exactly 10 digits, first digit must be 6, 7, 8, or 9 (Indian mobile format).

---

## Prerequisites

- **Node.js** v18+ and **npm**
- **Python** 3.9+
