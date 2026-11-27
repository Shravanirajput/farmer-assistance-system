import { useState } from 'react'
import Icon from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { equipment } from '../data/equipment'
import { useLanguage } from '../i18n/LanguageContext'
import { getBookings, updateBooking } from '../utils/bookings'
import { formatDate, formatRupees } from '../utils/format'
import { hrefFor } from '../utils/router'

// Bookings store English values; translate at display time using the equipment id.
function useBookingText() {
  const { tx } = useLanguage()
  return (booking) => {
    const item = equipment.find((entry) => entry.id === booking.equipmentId)
    return {
      name: item ? tx(item.name) : booking.equipmentName,
      location: item ? tx(item.location) : booking.equipmentLocation,
      icon: item?.icon ?? 'tractor',
    }
  }
}

function StatusBadge({ status }) {
  const { t } = useLanguage()
  return <span className={`status status-${status.toLowerCase()}`}>{t(`history.status.${status}`)}</span>
}

function BookingDetail({ booking, onBack, onCancel }) {
  const { t, locale } = useLanguage()
  const describe = useBookingText()
  const [confirming, setConfirming] = useState(false)
  const text = describe(booking)
  const daysLabel = `${booking.numberOfDays} ${booking.numberOfDays === 1 ? t('common.day') : t('common.days')}`
  const rows = [
    ['history.farmerName', booking.farmerName],
    ['history.village', booking.villageTown],
    ['history.mobile', booking.mobileNumber],
    ['history.equipmentLocation', text.location],
    ['history.startDate', formatDate(booking.bookingDate, locale)],
    ['history.duration', daysLabel],
    ['history.rate', `${booking.rentalRate} / ${t('common.perDay')}`],
    ['history.total', formatRupees(booking.estimatedTotal, locale)],
  ]
  if (booking.message) rows.push(['history.message', booking.message])

  return (
    <article className="panel booking-detail" aria-labelledby="booking-detail-title">
      <button className="button button-ghost" type="button" onClick={onBack}>
        <Icon name="arrowLeft" size={18} /> {t('history.backToList')}
      </button>
      <div className="booking-detail-head">
        <div>
          <p className="muted">{booking.bookingId}</p>
          <h2 id="booking-detail-title">{text.name}</h2>
        </div>
        <StatusBadge status={booking.status} />
      </div>
      <dl className="detail-list">
        {rows.map(([key, value]) => (
          <div key={key}>
            <dt>{t(key)}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {booking.status === 'Pending' &&
        (confirming ? (
          <div className="confirm-box" role="alertdialog" aria-labelledby="cancel-question">
            <p id="cancel-question">{t('history.cancelConfirm')}</p>
            <div className="form-actions">
              <button className="button button-ghost" type="button" onClick={() => setConfirming(false)}>
                {t('history.keep')}
              </button>
              <button className="button button-danger" type="button" onClick={() => onCancel(booking.bookingId)}>
                {t('history.cancelRequest')}
              </button>
            </div>
          </div>
        ) : (
          <button className="button button-outline-danger" type="button" onClick={() => setConfirming(true)}>
            {t('history.cancelRequest')}
          </button>
        ))}
    </article>
  )
}

export default function HistoryPage() {
  const { t, locale } = useLanguage()
  const describe = useBookingText()
  const [bookings, setBookings] = useState(getBookings)
  const [openId, setOpenId] = useState('')
  const open = bookings.find((booking) => booking.bookingId === openId)

  function cancel(bookingId) {
    setBookings(updateBooking(bookingId, { status: 'Cancelled' }))
  }

  return (
    <>
      <PageHeader icon="clipboard" title={t('history.title')} intro={t('history.intro')} />
      <div className="page-body">
        {open ? (
          <BookingDetail booking={open} onBack={() => setOpenId('')} onCancel={cancel} />
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <Icon name="clipboard" size={40} />
            <h2>{t('history.emptyTitle')}</h2>
            <p>{t('history.empty')}</p>
            <a className="button button-primary" href={hrefFor('equipment')}>{t('history.browse')}</a>
          </div>
        ) : (
          <ul className="booking-list">
            {bookings.map((booking) => {
              const text = describe(booking)
              return (
                <li key={booking.bookingId}>
                  <button type="button" className="booking-row" onClick={() => setOpenId(booking.bookingId)}>
                    <span className="booking-row-icon"><Icon name={text.icon} size={28} /></span>
                    <span className="booking-row-main">
                      <strong>{text.name}</strong>
                      <span>
                        {booking.bookingId} · {formatDate(booking.bookingDate, locale)} ·{' '}
                        {booking.numberOfDays} {booking.numberOfDays === 1 ? t('common.day') : t('common.days')}
                      </span>
                    </span>
                    <StatusBadge status={booking.status} />
                    <Icon name="arrowRight" size={20} className="booking-row-arrow" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
