import { useEffect, useRef, useState } from 'react'
import { TextField } from '../components/Form'
import Icon from '../components/Icons'
import PageHeader from '../components/PageHeader'
import { equipment, equipmentCategories } from '../data/equipment'
import { useLanguage } from '../i18n/LanguageContext'
import { addBooking, createBookingId, todayISO } from '../utils/bookings'
import { formatDate, formatRupees } from '../utils/format'
import { hrefFor } from '../utils/router'

function EquipmentArt({ item, size = 'small' }) {
  return (
    <div className={`equipment-art equipment-art-${size}`} aria-hidden="true">
      <Icon name={item.icon} size={size === 'large' ? 72 : 48} strokeWidth={1.4} />
    </div>
  )
}

function SampleNote() {
  const { t } = useLanguage()
  return (
    <p className="sample-note">
      <Icon name="info" size={18} /> {t('equipment.sampleNote')}
    </p>
  )
}

function Browse({ onSelect }) {
  const { t, tx, locale } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const search = query.trim().toLowerCase()
  const filtered = equipment.filter((item) => {
    const matchesCategory = category === 'All' || item.group === category
    const haystack = [item.name.en, item.name.mr, item.location.en, item.location.mr, item.group].join(' ').toLowerCase()
    return matchesCategory && (!search || haystack.includes(search))
  })

  return (
    <>
      <SampleNote />
      <section className="panel equipment-filters" aria-label={t('equipment.categories')}>
        <div className="field search-field">
          <label htmlFor="equipment-search">{t('equipment.searchLabel')}</label>
          <div className="input-with-icon">
            <Icon name="search" size={20} />
            <input
              id="equipment-search"
              type="search"
              value={query}
              placeholder={t('equipment.searchPlaceholder')}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="filter-chips" role="group" aria-label={t('equipment.categories')}>
          {equipmentCategories.map((option) => (
            <button key={option.value} type="button" aria-pressed={category === option.value} onClick={() => setCategory(option.value)}>
              {tx(option.label)}
            </button>
          ))}
        </div>
      </section>

      <p className="results-count" aria-live="polite">
        {t('equipment.resultsCount', { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h2>{t('equipment.noResultsTitle')}</h2>
          <p>{t('equipment.noResults')}</p>
        </div>
      ) : (
        <ul className="equipment-grid">
          {filtered.map((item) => (
            <li key={item.id}>
              <button type="button" className="equipment-card" onClick={() => onSelect(item.id)}>
                <EquipmentArt item={item} />
                <span className="equipment-card-body">
                  <span className="equipment-card-title">{tx(item.name)}</span>
                  <span className="equipment-card-meta">
                    <Icon name="pin" size={16} /> {tx(item.location)}
                  </span>
                  <span className="equipment-card-rate">
                    {formatRupees(item.ratePerDay, locale)} <small>/ {t('common.perDay')}</small>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <aside className="info-callout">
        <Icon name="tractor" size={26} />
        <div>
          <strong>{t('equipment.chcTitle')}</strong>
          <p>{t('equipment.chcText')}</p>
        </div>
      </aside>
    </>
  )
}

function Details({ item, onBack, onBook }) {
  const { t, tx, locale } = useLanguage()
  const headingRef = useRef(null)
  useEffect(() => headingRef.current?.focus(), [])
  return (
    <article className="equipment-detail">
      <button className="button button-ghost" type="button" onClick={onBack}>
        <Icon name="arrowLeft" size={18} /> {t('equipment.backToList')}
      </button>
      <div className="equipment-detail-layout">
        <EquipmentArt item={item} size="large" />
        <div>
          <h2 ref={headingRef} tabIndex={-1}>{tx(item.name)}</h2>
          <p className="lead">{tx(item.description)}</p>
          <dl className="detail-list">
            <div>
              <dt>{t('equipment.suitableFor')}</dt>
              <dd>{tx(item.suitableFor)}</dd>
            </div>
            <div>
              <dt>{t('equipment.location')}</dt>
              <dd>{tx(item.location)}</dd>
            </div>
            <div>
              <dt>{t('equipment.rate')}</dt>
              <dd className="rate">{formatRupees(item.ratePerDay, locale)} / {t('common.perDay')}</dd>
            </div>
            <div>
              <dt>{t('equipment.owner')}</dt>
              <dd>{tx(item.ownerName)}</dd>
            </div>
          </dl>
          <button className="button button-primary button-large" type="button" onClick={onBook}>
            <Icon name="calendar" size={20} /> {t('equipment.requestBooking')}
          </button>
          <SampleNote />
        </div>
      </div>
    </article>
  )
}

function BookingForm({ item, onCancel, onSubmitted }) {
  const { t, tx, locale } = useLanguage()
  const [values, setValues] = useState({ farmerName: '', mobileNumber: '', villageTown: '', bookingDate: '', numberOfDays: '1', message: '' })
  const [errors, setErrors] = useState({})
  const days = Number(values.numberOfDays) || 0
  const total = item.ratePerDay * days

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function validate() {
    const found = {}
    if (values.farmerName.trim().length < 2) found.farmerName = t('equipment.booking.errors.farmerName')
    if (!/^[6-9]\d{9}$/.test(values.mobileNumber)) found.mobileNumber = t('equipment.booking.errors.mobile')
    if (!values.villageTown.trim()) found.villageTown = t('equipment.booking.errors.village')
    if (!values.bookingDate || values.bookingDate < todayISO()) found.bookingDate = t('equipment.booking.errors.date')
    if (days < 1 || days > 30 || !Number.isInteger(days)) found.numberOfDays = t('equipment.booking.errors.days')
    return found
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate()
    if (Object.keys(found).length > 0) {
      setErrors(found)
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    // Same record shape as version 1 so older saved bookings keep working.
    const booking = {
      bookingId: createBookingId(),
      equipmentId: item.id,
      equipmentName: item.name.en,
      equipmentImage: '/equipment-placeholder.svg',
      equipmentLocation: item.location.en,
      rentalRate: formatRupees(item.ratePerDay, 'en-IN'),
      farmerName: values.farmerName.trim(),
      mobileNumber: values.mobileNumber,
      villageTown: values.villageTown.trim(),
      bookingDate: values.bookingDate,
      numberOfDays: days,
      estimatedTotal: total,
      message: values.message.trim(),
      createdAt: new Date().toISOString(),
      status: 'Pending',
    }
    addBooking(booking)
    onSubmitted(booking)
  }

  return (
    <section className="panel booking-form" aria-labelledby="booking-title">
      <button className="button button-ghost" type="button" onClick={onCancel}>
        <Icon name="arrowLeft" size={18} /> {tx(item.name)}
      </button>
      <h2 id="booking-title" className="panel-title">{t('equipment.booking.title')}</h2>
      <p>{t('equipment.booking.text')}</p>
      <div className="booking-item">
        <EquipmentArt item={item} />
        <div>
          <strong>{tx(item.name)}</strong>
          <span>{tx(item.location)} · {formatRupees(item.ratePerDay, locale)} / {t('common.perDay')}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <TextField label={t('equipment.booking.farmerName')} name="farmerName" value={values.farmerName} onChange={handleChange} error={errors.farmerName} placeholder={t('equipment.booking.farmerNamePlaceholder')} autoComplete="name" />
          <TextField label={t('equipment.booking.mobile')} name="mobileNumber" value={values.mobileNumber} onChange={handleChange} error={errors.mobileNumber} placeholder={t('equipment.booking.mobilePlaceholder')} inputMode="numeric" maxLength={10} autoComplete="tel-national" />
          <TextField label={t('equipment.booking.village')} name="villageTown" value={values.villageTown} onChange={handleChange} error={errors.villageTown} placeholder={t('equipment.booking.villagePlaceholder')} />
          <TextField label={t('equipment.booking.date')} name="bookingDate" type="date" min={todayISO()} value={values.bookingDate} onChange={handleChange} error={errors.bookingDate} />
          <TextField label={t('equipment.booking.days')} name="numberOfDays" type="number" min={1} max={30} value={values.numberOfDays} onChange={handleChange} error={errors.numberOfDays} />
          <TextField label={t('equipment.booking.message')} name="message" multiline value={values.message} onChange={handleChange} placeholder={t('equipment.booking.messagePlaceholder')} className="span-2" />
        </div>
        <div className="booking-total" aria-live="polite">
          <span>{t('equipment.booking.estimate')}</span>
          <strong>{formatRupees(total, locale)}</strong>
          <small>
            {t('equipment.booking.estimateDetail', {
              rate: formatRupees(item.ratePerDay, locale),
              days: `${days} ${days === 1 ? t('common.day') : t('common.days')}`,
            })}
          </small>
        </div>
        <p className="privacy-note">
          <Icon name="shield" size={18} /> {t('equipment.booking.privacy')}
        </p>
        <div className="form-actions">
          <button className="button button-primary button-large" type="submit">
            {t('equipment.booking.submit')}
          </button>
          <button className="button button-ghost" type="button" onClick={onCancel}>
            {t('equipment.booking.cancel')}
          </button>
        </div>
      </form>
    </section>
  )
}

function Confirmation({ booking, item, onBackToList }) {
  const { t, tx, locale } = useLanguage()
  const headingRef = useRef(null)
  useEffect(() => headingRef.current?.focus(), [])
  return (
    <section className="panel confirmation" aria-labelledby="confirm-title">
      <span className="confirmation-icon">
        <Icon name="check" size={36} strokeWidth={2.4} />
      </span>
      <h2 id="confirm-title" ref={headingRef} tabIndex={-1}>{t('equipment.confirm.title')}</h2>
      <p>{t('equipment.confirm.text')}</p>
      <dl className="detail-list compact">
        <div>
          <dt>{t('equipment.confirm.bookingId')}</dt>
          <dd><strong>{booking.bookingId}</strong></dd>
        </div>
        <div>
          <dt>{tx(item.name)}</dt>
          <dd>{formatDate(booking.bookingDate, locale)} · {booking.numberOfDays} {booking.numberOfDays === 1 ? t('common.day') : t('common.days')}</dd>
        </div>
        <div>
          <dt>{t('history.total')}</dt>
          <dd>{formatRupees(booking.estimatedTotal, locale)}</dd>
        </div>
        <div>
          <dt>{t('history.statusLabel')}</dt>
          <dd><span className="status status-pending">{t('history.status.Pending')}</span></dd>
        </div>
      </dl>
      <div className="form-actions">
        <a className="button button-primary" href={hrefFor('history')}>{t('equipment.confirm.viewHistory')}</a>
        <button className="button button-ghost" type="button" onClick={onBackToList}>{t('equipment.confirm.backToEquipment')}</button>
      </div>
    </section>
  )
}

export default function EquipmentPage() {
  const { t } = useLanguage()
  const [selectedId, setSelectedId] = useState('')
  const [view, setView] = useState('browse')
  const [booking, setBooking] = useState(null)
  const item = equipment.find((entry) => entry.id === selectedId)

  function go(nextView, id = selectedId) {
    setSelectedId(id)
    setView(nextView)
    window.scrollTo({ top: 0 })
  }

  let content
  if (item && view === 'details') content = <Details item={item} onBack={() => go('browse', '')} onBook={() => go('booking')} />
  else if (item && view === 'booking') content = <BookingForm item={item} onCancel={() => go('details')} onSubmitted={(saved) => { setBooking(saved); go('confirmed') }} />
  else if (item && view === 'confirmed' && booking) content = <Confirmation booking={booking} item={item} onBackToList={() => go('browse', '')} />
  else content = <Browse onSelect={(id) => go('details', id)} />

  return (
    <>
      <PageHeader icon="tractor" title={t('equipment.title')} intro={t('equipment.intro')} />
      <div className="page-body">{content}</div>
    </>
  )
}
