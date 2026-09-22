import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <div>
          <p className="eyebrow">Rural support, made simple</p>
          <h1>Farmer Assistance</h1>
          <p className="subtitle">
           Agricultural assistance made simple.
          </p>
        </div>
        <div className="header-tools">
          <label htmlFor="language">Language</label>
          <select id="language" defaultValue="English">
            <option>English</option>
            <option>मराठी</option>
            <option>हिन्दी</option>
          </select>
          <p className="status"><span></span> Online</p>
        </div>
      </header>

      <section className="welcome-section">
        <p className="section-label">Explore support services</p>
        <h2>What do you need help with today?</h2>
        <div className="feature-grid">
          <article className="feature-card crop-card">
            <span className="feature-icon">01</span>
            <h3>Crop Recommendation</h3>
            <p>Find crop ideas suited to your farm and growing season.</p>
          </article>
          <article className="feature-card disease-card">
            <span className="feature-icon">02</span>
            <h3>Disease Guide</h3>
            <p>Learn about common crop diseases and their signs.</p>
          </article>
          <article className="feature-card equipment-card">
            <span className="feature-icon">03</span>
            <h3>Equipment Rental</h3>
            <p>Discover useful farming equipment available for rent.</p>
          </article>
          <article className="feature-card market-card">
            <span className="feature-icon">04</span>
            <h3>Agricultural Marketplace</h3>
            <p>Explore a place to buy and sell agricultural products.</p>
          </article>
          <article className="feature-card schemes-card">
            <span className="feature-icon">05</span>
            <h3>Government Schemes</h3>
            <p>Find helpful information about farmer welfare schemes.</p>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <span>Built for farmers and farming communities</span>
        <span>Information is available even with limited connectivity.</span>
      </footer>
    </main>
  )
}

export default App
