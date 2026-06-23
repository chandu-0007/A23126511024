# Notification System — Full Stack Assessment

## How to Run

### Backend
```bash
cd notificaton-app-be
npm install
npm run dev
# runs on http://localhost:4000
```

### Frontend
```bash
cd notification-app-fe
npm install
npm run dev
# runs on http://localhost:3000
```

---

## What I Built

### Logging Middleware
- Custom `Log(stack, level, package, message)` function
- Posts every log to Affordmed evaluation server
- Used throughout backend on every request, error, and response

### Backend (Express + TypeScript)
- `GET /notifications` — fetch all notifications with pagination + type filter
- `GET /notifications/priority?n=10` — top N using MaxHeap priority queue
- `GET /notifications/type/:type` — filter by Placement / Result / Event
- `GET /health` — server health check
- All data fetched live from Affordmed Notification API

### Priority Queue (DSA)
- Implemented MaxHeap from scratch in TypeScript
- Score = `weight × 1e13 + timestamp`
- Placement (3) > Result (2) > Event (1)
- Same weight → newer notification wins

### Frontend (Next.js + Native CSS)
- Single page dark theme UI
- Filter buttons — All / Priority / Placement / Result / Event
- Table view with type chip, message, timestamp
- Fetches live from backend API
