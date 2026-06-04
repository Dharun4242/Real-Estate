import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as loadEnv } from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load server/.env regardless of which directory the process starts in.
loadEnv({ path: path.join(__dirname, '.env') })

// ---- Configuration ------------------------------------------------------
const PORT = process.env.PORT || 8080
const MODE = (process.env.CASHFREE_MODE || 'sandbox').toLowerCase()
const CLIENT_ID = process.env.CASHFREE_CLIENT_ID
const CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET
const API_VERSION = '2023-08-01'

// The advance is fixed server-side. NEVER trust an amount sent by the
// browser — that is how customers could pay ₹1 for a ₹50L plot.
const ADVANCE_AMOUNT = 2000

const CF_BASE =
  MODE === 'production'
    ? 'https://api.cashfree.com'
    : 'https://sandbox.cashfree.com'

// Public URL of the site, used to build Cashfree's return_url. Cashfree
// requires an absolute URL, so we never rely solely on the Origin header.
const APP_URL = process.env.APP_URL || 'http://localhost:5173'

const app = express()
app.use(cors())
app.use(express.json())

function assertConfigured(res) {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    res.status(500).json({
      message:
        'Cashfree keys are not configured. Add CASHFREE_CLIENT_ID and CASHFREE_CLIENT_SECRET to server/.env',
    })
    return false
  }
  return true
}

const cfHeaders = {
  'Content-Type': 'application/json',
  'x-api-version': API_VERSION,
  'x-client-id': CLIENT_ID,
  'x-client-secret': CLIENT_SECRET,
}

// ---- Create order -------------------------------------------------------
app.post('/api/create-order', async (req, res) => {
  if (!assertConfigured(res)) return

  const { customer = {}, plotId, plotTitle } = req.body || {}
  const { name, email, phone } = customer

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: 'Name, email and phone are required.' })
  }

  const orderId = `PG_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  try {
    const cfRes = await fetch(`${CF_BASE}/pg/orders`, {
      method: 'POST',
      headers: cfHeaders,
      body: JSON.stringify({
        order_id: orderId,
        order_amount: ADVANCE_AMOUNT,
        order_currency: 'INR',
        customer_details: {
          customer_id: `cust_${phone}`,
          customer_name: name,
          customer_email: email,
          customer_phone: String(phone).replace(/\s/g, ''),
        },
        order_note: `Advance for ${plotTitle || ''} (${plotId || 'plot'})`,
        order_meta: {
          // Must be an absolute URL. Cashfree replaces {order_id} on return.
          // (With redirectTarget '_modal' the customer stays on the page, but
          // Cashfree still validates this field.)
          return_url: `${req.headers.origin || APP_URL}/?order_id={order_id}`,
        },
      }),
    })

    const data = await cfRes.json()

    if (!cfRes.ok) {
      console.error('Cashfree create-order error:', data)
      return res.status(cfRes.status).json({
        message: data.message || 'Cashfree rejected the order.',
      })
    }

    return res.json({
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    })
  } catch (err) {
    console.error('create-order failed:', err)
    return res
      .status(502)
      .json({ message: 'Could not reach the payment gateway.' })
  }
})

// ---- Verify / fetch order status ---------------------------------------
app.get('/api/order-status/:orderId', async (req, res) => {
  if (!assertConfigured(res)) return

  try {
    const cfRes = await fetch(
      `${CF_BASE}/pg/orders/${encodeURIComponent(req.params.orderId)}`,
      { headers: cfHeaders },
    )
    const data = await cfRes.json()

    if (!cfRes.ok) {
      return res
        .status(cfRes.status)
        .json({ message: data.message || 'Order not found.' })
    }

    return res.json({
      orderId: data.order_id,
      status: data.order_status, // PAID | ACTIVE | EXPIRED | ...
      orderAmount: data.order_amount,
    })
  } catch (err) {
    console.error('order-status failed:', err)
    return res
      .status(502)
      .json({ message: 'Could not reach the payment gateway.' })
  }
})

app.get('/api/health', (_req, res) =>
  res.json({ ok: true, mode: MODE, configured: !!(CLIENT_ID && CLIENT_SECRET) }),
)

// ---- Serve the built frontend (local full-stack convenience) ------------
// In production the frontend is deployed separately (Vercel) and the API
// runs standalone. This only serves the build if you run everything locally.
const distDir = path.resolve(__dirname, '..', 'client', 'dist')
app.use(express.static(distDir))
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) res.status(404).send('Build the frontend first: npm run build')
  })
})

app.listen(PORT, () => {
  console.log(`\n  PoesGarden API → http://localhost:${PORT}`)
  console.log(`  Cashfree mode  → ${MODE}`)
  console.log(
    `  Keys           → ${CLIENT_ID && CLIENT_SECRET ? 'loaded' : 'MISSING - add server/.env'}\n`,
  )
})
