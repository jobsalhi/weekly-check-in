import { useState } from 'react'
import './App.css'

type Screen = 'home' | 'reflection'

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [wentWell, setWentWell] = useState('')

  if (screen === 'reflection') {
    return (
      <div className="app-shell">
        <header className="site-header">
          <p className="brand">Weekly Check-in</p>
          <button
            className="text-button"
            type="button"
            onClick={() => setScreen('home')}
          >
            Back to home
          </button>
        </header>

        <main className="reflection-page">
          <p className="eyebrow">Step 1 of 4 · Notice what helped</p>

          <h1 className="reflection-title">What went well this week?</h1>

          <p className="intro-text">
            Begin with what supported you. This is not about judging the whole
            week. Notice a few useful moments clearly.
          </p>

          <label className="question">
            <span>What are you glad you did this week?</span>
            <textarea
              rows={5}
              value={wentWell}
              onChange={(event) => setWentWell(event.target.value)}
              placeholder="A useful action, a moment of restraint, or something you maintained..."
            />
          </label>

          <div className="reflection-actions">
            <button className="primary-button" type="button">
              Continue
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <p className="brand">Weekly Check-in</p>
        <p className="privacy-label">Private by default</p>
      </header>

      <main className="home">
        <section className="intro-card">
          <p className="eyebrow">A quiet weekly pause</p>

          <h1>Notice the week. Prepare the next one.</h1>

          <p className="intro-text">
            Reflect calmly, notice recurring patterns, and choose a few
            deliberate adjustments for the coming week.
          </p>

          <div className="actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => setScreen('reflection')}
            >
              Start this week&apos;s reflection
            </button>

            <button className="secondary-button" type="button">
              View past weeks
            </button>
          </div>
        </section>

        <section className="principles" aria-label="Application principles">
          <article>
            <h2>Observe calmly</h2>
            <p>Look for patterns without reducing the week to a score.</p>
          </article>

          <article>
            <h2>Prepare gently</h2>
            <p>Choose what to protect, reduce, prepare, and learn next.</p>
          </article>

          <article>
            <h2>Keep it private</h2>
            <p>Your reflections will remain on your device.</p>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App