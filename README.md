# PoesGarden Real Estate 🌿

A clean, modern website for **PoesGarden Real Estate, Chennai** — premium DTCP/RERA
approved plots across Tamil Nadu. Customers filter plots by **location** and
**plot size**, then reserve a plot online by paying a **₹2,000 advance** through the
**Cashfree** payment gateway.

Built with **React + Vite + Tailwind CSS** on the frontend and a tiny **Express**
backend that securely talks to Cashfree.

---

## Why there's a backend (important)

A "static" site **cannot** integrate Cashfree on its own. Creating a payment order
requires your **secret key**, and that key must never live in browser code (anyone
could read it). So this project has two parts:

| Part | Folder | Role |
|------|--------|------|
| Frontend | `/` , `/src` | The website the customer sees (static React app) |
| Backend  | `/server`   | Creates Cashfree orders & verifies payments using your secret key |

The browser only ever receives a short-lived `payment_session_id` — never your secret.

---

## Project structure

```
.
├── index.html              # Vite entry
├── src/
│   ├── App.jsx             # State + filtering logic
│   ├── data/plots.js       # Sample plot inventory (edit me!)
│   ├── lib/cashfree.js     # Calls backend + opens Cashfree checkout
│   └── components/         # Navbar, Hero, Filters, PlotCard, BookingModal, ...
├── server/
│   ├── index.js            # Express API: create-order + order-status
│   └── .env                # ← your Cashfree TEST keys go here
└── .env                    # frontend public config (mode only)
```

---

## Setup

### 1. Install dependencies

```bash
npm install            # frontend
cd server && npm install && cd ..   # backend
```

### 2. Add your Cashfree TEST keys

Open **`server/.env`** and paste the keys from your Cashfree Dashboard
(*Developers → API Keys*):

```env
CASHFREE_MODE=sandbox
CASHFREE_CLIENT_ID=your_test_app_id
CASHFREE_CLIENT_SECRET=your_test_secret_key
PORT=8080
```

The frontend `.env` only needs the (public) mode, already set to `sandbox`.

### 3. Run it

**Two terminals (recommended for development):**

```bash
npm run server     # terminal 1 → API on http://localhost:8080
npm run dev        # terminal 2 → site on http://localhost:5173
```

…or run both at once:

```bash
npm run dev:all
```

Open **http://localhost:5173**. The Vite dev server proxies `/api/*` to the backend
automatically, so no CORS setup is needed.

### 4. Production build

```bash
npm run build      # outputs static site to /dist
npm run server     # Express also serves /dist on http://localhost:8080
```

---

## Testing a payment (sandbox)

1. Click **View & Book** on any available plot.
2. Fill in name, email and a valid 10-digit mobile number.
3. Click **Pay ₹2,000 & Reserve** — the Cashfree checkout opens.
4. Use Cashfree's sandbox test instruments (e.g. test UPI `testsuccess@gocash`
   or the test cards shown in the checkout) to complete the payment.
5. On success you'll see the **"Plot reserved!"** confirmation.

Going live? Set `CASHFREE_MODE=production` (and `VITE_CASHFREE_MODE=production`),
swap in your production keys, and you're done.

---

## Customising

- **Plots / locations / prices** → edit [`src/data/plots.js`](src/data/plots.js).
  Plot size category is derived automatically from `sqft`.
- **Advance amount** → `ADVANCE_AMOUNT` in `src/data/plots.js` (display) **and**
  `server/index.js` (the charged amount — kept server-side for security).
- **Brand colours / font** → the `@theme` block in [`src/index.css`](src/index.css).
- **Contact details** → [`src/components/Footer.jsx`](src/components/Footer.jsx).

---

## API reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/create-order` | Creates a ₹2,000 Cashfree order, returns `paymentSessionId` |
| `GET`  | `/api/order-status/:orderId` | Returns the order's `status` (`PAID`, `ACTIVE`, …) |
| `GET`  | `/api/health` | Reports server mode + whether keys are configured |
# Real-Estate
