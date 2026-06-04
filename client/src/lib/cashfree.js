import { load } from '@cashfreepayments/cashfree-js'

// Reads the Cashfree environment exposed to the frontend. Defaults to
// "sandbox" for safe local testing. Set VITE_CASHFREE_MODE=production
// in your frontend .env when going live.
const MODE = import.meta.env.VITE_CASHFREE_MODE || 'sandbox'

// Base URL of the payment backend. When blank, calls stay relative and go
// through the Vite dev proxy (local dev). In production, point this at the
// deployed API, e.g. https://real-estate-gj09.onrender.com
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const api = (path) => `${API_BASE}${path}`

let cashfreePromise = null

function getCashfree() {
  if (!cashfreePromise) {
    cashfreePromise = load({ mode: MODE })
  }
  return cashfreePromise
}

/**
 * Create a Cashfree order on our backend, then open the hosted checkout.
 * The backend keeps the secret key; the browser only ever sees a
 * short-lived payment_session_id.
 *
 * @param {object} args
 * @param {object} args.plot      The selected plot.
 * @param {object} args.customer  { name, email, phone }
 * @returns {Promise<{orderId: string}>}
 */
export async function startBooking({ plot, customer }) {
  const res = await fetch(api('/api/create-order'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plotId: plot.id,
      plotTitle: plot.title,
      customer,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'Could not create the payment order.')
  }

  const { paymentSessionId, orderId } = await res.json()

  const cashfree = await getCashfree()
  await cashfree.checkout({
    paymentSessionId,
    redirectTarget: '_modal', // stay on the page; popup checkout
  })

  return { orderId }
}

/**
 * Ask the backend to confirm the final status of an order with Cashfree.
 * @param {string} orderId
 * @returns {Promise<{status: string, orderAmount: number}>}
 */
export async function verifyBooking(orderId) {
  const res = await fetch(api(`/api/order-status/${encodeURIComponent(orderId)}`))
  if (!res.ok) throw new Error('Could not verify the payment status.')
  return res.json()
}
