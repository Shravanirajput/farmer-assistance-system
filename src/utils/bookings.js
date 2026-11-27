// Booking requests are saved in the browser (localStorage) on this device only.
// There is no server or database, so nothing leaves the farmer's phone.
// The storage key and record shape are unchanged from version 1, so older bookings still load.

const STORAGE_KEY = 'farmerAssistanceBookings'

export function getBookings() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveBookings(bookings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export function addBooking(booking) {
  const bookings = [booking, ...getBookings()]
  saveBookings(bookings)
  return bookings
}

export function updateBooking(bookingId, changes) {
  const bookings = getBookings().map((booking) =>
    booking.bookingId === bookingId ? { ...booking, ...changes } : booking,
  )
  saveBookings(bookings)
  return bookings
}

export function createBookingId() {
  return `FA-${String(Date.now()).slice(-6)}`
}

export function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}
