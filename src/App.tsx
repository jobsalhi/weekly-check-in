import { useState } from 'react'
import './App.css'

type Screen = 'home' | 'reflection' | 'complete'
type ReflectionStep = 1 | 2 | 3 | 4

type ReflectionDraft = {
  wentWell: string
  autopilot: string
  protectOrReduce: string
  preparation: string
}

type ReflectionStepContent = {
  eyebrow: string
  title: string
  intro: string
  question: string
  placeholder: string
  field: keyof ReflectionDraft
}
const reflectionSteps: Record<ReflectionStep, ReflectionStepContent> = {
  1: {
    eyebrow: 'Step 1 of 4 · Notice what helped',
    title: 'What went well this week?',
    intro:
      'Begin with what supported you. This is not about judging the whole week. Notice a few useful moments clearly.',
    question: 'What are you glad you did this week?',
    placeholder:
      'A useful action, a moment of restraint, or something you maintained...',
    field: 'wentWell',
  },
  2: {
    eyebrow: 'Step 2 of 4 · Notice autopilot',
    title: 'Where did autopilot take over?',
    intro:
      'Notice moments when your actions drifted away from your intentions. Observe them without turning the reflection into self-criticism.',
    question: 'What pulled you away from the week you wanted?',
    placeholder:
      'A repeated distraction, an avoidable difficulty, or a pattern you noticed...',
    field: 'autopilot',
  },
  3: {
    eyebrow: 'Step 3 of 4 · Choose deliberately',
    title: 'What should change gently?',
    intro:
      'Choose a small adjustment. You do not need to redesign your life or fix everything at once.',
    question:
      'What would you like to protect, reduce, or approach differently?',
    placeholder:
      'Something worth protecting, reducing, or handling with more care...',
    field: 'protectOrReduce',
  },
  4: {
    eyebrow: 'Step 4 of 4 · Prepare the next week',
    title: 'What would make next week easier?',
    intro:
      'Prepare one or two practical supports for the coming week. Make the desired action easier to begin.',
    question: 'What can you prepare in advance?',
    placeholder:
      'A small preparation, a boundary, or something useful to learn...',
    field: 'preparation',
  },
}

const nextReflectionStep: Partial<Record<ReflectionStep, ReflectionStep>> = {
  1: 2,
  2: 3,
  3: 4,
}

const previousReflectionStep: Partial<Record<ReflectionStep, ReflectionStep>> =
  {
    2: 1,
    3: 2,
    4: 3,
  }

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [currentStep, setCurrentStep] = useState<ReflectionStep>(1)

  const [draft, setDraft] = useState<ReflectionDraft>({
    wentWell: '',
    autopilot: '',
    protectOrReduce: '',
    preparation: '',
  })
  const updateDraftField = (field: keyof ReflectionDraft, value: string) => {
    setDraft((previousDraft) => ({
      ...previousDraft,
      [field]: value,
    }))
  }
  const stepContent = reflectionSteps[currentStep]
  const goToNextStep = () => {
    const nextStep = nextReflectionStep[currentStep]

    if (nextStep) {
      setCurrentStep(nextStep)
    } else {
      setScreen('complete')
    }
  }

  const goToPreviousStep = () => {
    const previousStep = previousReflectionStep[currentStep]

    if (previousStep) {
      setCurrentStep(previousStep)
    }
  }
  const openReflectionFromBeginning = () => {
    setCurrentStep(1)
    setScreen('reflection')
  }

  if (screen === 'complete') {
    return (
      <div className="app-shell">
        <header className="site-header">
          <p className="brand">Weekly Check-in</p>
          <p className="privacy-label">Private by default</p>
        </header>

        <main className="reflection-page">
          <p className="eyebrow">Reflection complete</p>

          <h1 className="reflection-title">Your week has been noticed.</h1>

          <p className="intro-text">
            You do not need to solve everything now. Keep the useful
            observations and carry a few deliberate adjustments into the coming
            week.
          </p>

          <div className="reflection-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={openReflectionFromBeginning}
            >
              Review answers
            </button>

            <button
              className="primary-button"
              type="button"
              onClick={() => setScreen('home')}
            >
              Return home
            </button>
          </div>
        </main>
      </div>
    )
  }

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
          <p className="eyebrow">{stepContent.eyebrow}</p>

          <h1 className="reflection-title">{stepContent.title}</h1>

          <p className="intro-text">{stepContent.intro}</p>

          <label className="question">
            <span>{stepContent.question}</span>
            <textarea
              rows={5}
              value={draft[stepContent.field]}
              onChange={(event) =>
                updateDraftField(stepContent.field, event.target.value)
              }
              placeholder={stepContent.placeholder}
            />
          </label>

          <div className="reflection-actions">
            {currentStep > 1 && (
              <button
                className="secondary-button"
                type="button"
                onClick={goToPreviousStep}
              >
                Previous
              </button>
            )}
            <button
              className="primary-button"
              type="button"
              onClick={goToNextStep}
            >
              {currentStep === 4 ? 'Finish reflection' : 'Continue'}
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
              onClick={openReflectionFromBeginning}
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
