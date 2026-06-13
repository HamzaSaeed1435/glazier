# Running NikoVision Locally

## Prerequisites

Install these once if you don't have them:

- **Python 3.11+** → https://www.python.org/downloads/
- **Node.js 20+** → https://nodejs.org/
- **Yarn** → `npm install -g yarn`
- **MongoDB Community** → https://www.mongodb.com/try/download/community (start the `mongod` service)

---

## 1. Get the code

Export the project from Emergent (Profile → Download Code, or push to GitHub) and unzip into a folder, e.g. `~/nikovision/`.

```bash
cd ~/nikovision
```

You should see `backend/` and `frontend/` folders.

---

## 2. Backend (FastAPI) — Terminal 1

```bash
cd backend
python -m venv venv

# Activate venv:
# macOS / Linux:
source venv/bin/activate
# Windows (PowerShell):
venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

**Create `backend/.env`** (copy these exact lines):

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=nikovision
CORS_ORIGINS=http://localhost:3000
RESEND_API_KEY=re_NhgGNe3u_MaqLjUdRywxBwPZdUZDYTqUX
SENDER_EMAIL=onboarding@resend.dev
NOTIFICATION_EMAIL=nikovisionglazing@gmail.com
```

**Start the backend:**

```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Test it works: open http://localhost:8001/api/ in your browser. You should see `{"message":"NikoVision API","status":"ok"}`.

---

## 3. Frontend (React) — Terminal 2 (new window, keep backend running)

```bash
cd ~/nikovision/frontend
yarn install
```

**Create `frontend/.env`:**

```env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=3000
```

**Start the frontend:**

```bash
yarn start
```

It will open http://localhost:3000 automatically.

---

## 4. MongoDB

Make sure `mongod` is running before starting the backend. Quick check:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB service usually auto-starts. Check Services panel if not.
```

---

## Quick test once everything is up

1. Visit `http://localhost:3000` → site loads
2. Go to `/contact` → fill the quote form → submit
3. Check backend terminal → you should see `INFO - New quote received: ...` then `Quote email sent to nikovisionglazing@gmail.com — id=...`
4. Check Theo's inbox for the email

---

## Common issues

| Problem | Fix |
|---|---|
| `ModuleNotFoundError` in backend | Re-activate venv, run `pip install -r requirements.txt` again |
| `ECONNREFUSED` on form submit | Backend isn't running on 8001 — check Terminal 1 |
| `CORS error` in browser console | Make sure `CORS_ORIGINS=http://localhost:3000` in `backend/.env` (no trailing slash) and restart backend |
| Emails not sending | Check backend terminal log; verify the Resend account associated with that key has `nikovisionglazing@gmail.com` as the verified signup email |
| MongoDB connection refused | `mongod` isn't running — start it (see step 4) |

That's it — `yarn start` + `uvicorn` + `mongod` running simultaneously and you're good.
