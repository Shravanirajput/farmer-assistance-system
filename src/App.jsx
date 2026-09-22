import { useState } from 'react'
import './App.css'
import { noMatchMessage, recommendCrops } from './utils/recommendCrops'

const seasonDescriptions = {
  Kharif: 'Monsoon season — generally June to October',
  Rabi: 'Winter season — generally October/November to March/April',
  Zaid: 'Summer season — generally March/April to June',
}

function App() {
  const [currentView, setCurrentView] = useState('home')

  if (currentView === 'crop') {
    return <CropRecommendationPage onBack={() => setCurrentView('home')} />
  }

  return (
    <main className="app-shell">
      <a className="skip-link" href="#services">Skip to services</a>

      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Farmer Assistance home">
          <span className="brand-mark" aria-hidden="true">FA</span>
          <span>Farmer Assistance</span>
        </a>
        <div className="topbar-links">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <span className="status"><span></span> Online</span>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Rural support, made simple</p>
          <h1>Better decisions for a <em>stronger harvest.</em></h1>
          <p className="subtitle">
            Farmer Assistance brings useful agricultural information and practical support together in one easy-to-use place.
          </p>
          <a className="primary-action" href="#services">Explore services <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-panel" aria-label="Platform highlights">
          <div className="sun-disc" aria-hidden="true"></div>
          <div className="field-lines" aria-hidden="true"></div>
          <div className="hero-note">
            <span className="hero-note-icon" aria-hidden="true">✦</span>
            <div>
              <strong>Information for every season</strong>
              <span>Simple guidance, close at hand.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <div>
            <p className="section-label">Your support centre</p>
            <h2>Start with what you need today.</h2>
          </div>
          <div className="language-control">
            <label htmlFor="language">Choose language</label>
            <select id="language" defaultValue="English">
              <option>English</option>
              <option>मराठी</option>
              <option>हिन्दी</option>
            </select>
          </div>
        </div>
        <div className="feature-grid">
          <button className="feature-card crop-card" type="button" onClick={() => setCurrentView('crop')}>
            <span className="feature-icon" aria-hidden="true">🌱</span>
            <span className="card-number">01</span>
            <h3>Crop Recommendation</h3>
            <p>Find crop ideas suited to your farm and growing season.</p>
            <span className="card-link">Explore guide <span aria-hidden="true">→</span></span>
          </button>
          <a className="feature-card disease-card" href="#services">
            <span className="feature-icon" aria-hidden="true">⌁</span>
            <span className="card-number">02</span>
            <h3>Disease Guide</h3>
            <p>Learn about common crop diseases and their signs.</p>
            <span className="card-link">View guide <span aria-hidden="true">→</span></span>
          </a>
          <a className="feature-card equipment-card" href="#services">
            <span className="feature-icon" aria-hidden="true">⚙</span>
            <span className="card-number">03</span>
            <h3>Equipment Rental</h3>
            <p>Discover useful farming equipment available for rent.</p>
            <span className="card-link">Find equipment <span aria-hidden="true">→</span></span>
          </a>
          <a className="feature-card market-card" href="#services">
            <span className="feature-icon" aria-hidden="true">↗</span>
            <span className="card-number">04</span>
            <h3>Agricultural Marketplace</h3>
            <p>Explore a place to buy and sell agricultural products.</p>
            <span className="card-link">Visit marketplace <span aria-hidden="true">→</span></span>
          </a>
          <a className="feature-card schemes-card" href="#services">
            <span className="feature-icon" aria-hidden="true">▤</span>
            <span className="card-number">05</span>
            <h3>Government Schemes</h3>
            <p>Find helpful information about farmer welfare schemes.</p>
            <span className="card-link">See schemes <span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>

      <section className="trust-strip" id="about">
        <span className="trust-icon" aria-hidden="true">✓</span>
        <div>
          <strong>Made for real farming needs</strong>
          <p>Clear information, simple navigation, and support that works for every farming community.</p>
        </div>
        <span className="offline-note"><span className="status-dot"></span> Works with limited connectivity</span>
      </section>

      <footer className="site-footer">
        <span>Farmer Assistance</span>
        <span>Support for better farming decisions</span>
      </footer>
    </main>
  )
}

function CropRecommendationPage({ onBack }) {
  const [formValues, setFormValues] = useState({
    soilType: '',
    season: '',
    state: '',
    waterAvailability: '',
  })
  const [recommendations, setRecommendations] = useState(null)
  const [formError, setFormError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
    setFormError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    const hasMissingValue = Object.values(formValues).some((value) => value === '')

    if (hasMissingValue) {
      setRecommendations(null)
      setFormError('Please complete all four fields before getting recommendations.')
      return
    }

    setFormError('')
    setRecommendations(recommendCrops(formValues))
  }

  function handleClear() {
    setFormValues({
      soilType: '',
      season: '',
      state: '',
      waterAvailability: '',
    })
    setRecommendations(null)
    setFormError('')
  }

  return (
    <main className="app-shell feature-view">
      <button className="back-link" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> Back to Home
      </button>
      <section className="feature-intro">
        <p className="eyebrow">Farmer Assistance / Crop Support</p>
        <h1>Crop Recommendation</h1>
        <p className="subtitle">
          Tell us a little about your farm to find suitable crops from our local guide.
        </p>
      </section>
      <section className="recommendation-panel" aria-labelledby="crop-form-title">
        <div className="form-heading">
          <span className="feature-icon" aria-hidden="true">🌱</span>
          <div>
            <h2 id="crop-form-title">Tell us about your farm</h2>
            <p>Select the options that best describe your current conditions.</p>
          </div>
        </div>

        <form className="recommendation-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="soilType">Soil Type</label>
            <select id="soilType" name="soilType" value={formValues.soilType} onChange={handleChange} required>
              <option value="">Select soil type</option>
              <option value="Black Soil">Black Soil</option>
              <option value="Red Soil">Red Soil</option>
              <option value="Alluvial Soil">Alluvial Soil</option>
              <option value="Laterite Soil">Laterite Soil</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="season">Season</label>
            <select id="season" name="season" value={formValues.season} onChange={handleChange} required>
              <option value="">Select season</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Zaid">Zaid</option>
            </select>
            {formValues.season && (
              <p className="field-helper">{seasonDescriptions[formValues.season]}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="state">State</label>
            <select id="state" name="state" value={formValues.state} onChange={handleChange} required>
              <option value="">Select state</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="waterAvailability">Water Availability</label>
            <select id="waterAvailability" name="waterAvailability" value={formValues.waterAvailability} onChange={handleChange} required>
              <option value="">Select water availability</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>

          <button className="recommendation-button" type="submit">
            Get Crop Recommendations <span aria-hidden="true">→</span>
          </button>
        </form>
        {formError && <p className="form-error" role="alert">{formError}</p>}
      </section>

      {recommendations !== null && (
        <section className="results-section" aria-live="polite" aria-labelledby="results-title">
          <div className="results-heading">
            <div>
              <p className="section-label">Local rule-based guide</p>
              <h2 id="results-title">{recommendations.length > 0 ? 'Suitable crops to explore' : 'No close matches'}</h2>
            </div>
            <button className="clear-button" type="button" onClick={handleClear}>Clear / Start Again</button>
          </div>

          <div className="selection-summary">
            <strong>Your selected conditions</strong>
            <span>{formValues.soilType}</span>
            <span>{formValues.season}</span>
            <span>{formValues.state}</span>
            <span>{formValues.waterAvailability} water availability</span>
          </div>

          {recommendations.length === 0 ? (
            <p className="no-match-message">{noMatchMessage}</p>
          ) : (
            <div className="results-grid">
              {recommendations.map((crop) => (
                <article className="result-card" key={crop.name}>
                  <div className="result-card-topline">
                    <span className="result-icon" aria-hidden="true">🌱</span>
                    <span className="result-state">{crop.state}</span>
                  </div>
                  <h3>{crop.name}</h3>
                  <dl className="result-details">
                    <div>
                      <dt>Growing duration</dt>
                      <dd>{crop.duration}</dd>
                    </div>
                    <div>
                      <dt>Water / irrigation note</dt>
                      <dd>{crop.waterNote}</dd>
                    </div>
                  </dl>
                  <p className="match-reason"><strong>Why it matches:</strong> {crop.whyItMatches}</p>
                  <p className="source-note">{crop.sourceNote}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  )
}

export default App
