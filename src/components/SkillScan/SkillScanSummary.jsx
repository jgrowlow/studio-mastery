import { useState, useEffect } from 'react'

export default function SkillScanSummary({ answers, user, onComplete, onBack }) {
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')

  useEffect(() => {
    generateSummary()
  }, [])

  async function generateSummary() {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'skill_scan_summary',
          answers
        })
      })

      if (!response.ok) throw new Error('API not connected yet')

      const data = await response.json()
      setSummary(data.content?.[0]?.text || '')
    } catch (err) {
      setSummary(`You're coming in with a clear sense of what you want from music — and that matters more than any gear list or theory score. Based on what you've shared, your program is going to be built around your actual goals, your setup, and where you are right now. We'll start where it makes sense for you and move at the pace this deserves.\n\nTHEORY_PLACEMENT: theory1`)
    } finally {
      setLoading(false)
    }
  }

  function buildPrompt(answers) {
    return `You are onboarding a new student to Studio Mastery, an AI-powered music production and engineering education program. Based on their answers below, write a personalised 4-5 sentence profile summary addressing them directly in second person.

Be warm, direct, and specific — reference their actual answers. Show them you understood what they said. Identify their starting point, what they're building toward, and one or two things the program is going to focus on specifically for them. End with a single sentence that feels like the beginning of something.

Do not use filler phrases. Do not be generic. Do not list their answers back at them — synthesise them into a real picture of who this person is as a student.

Also at the very end of your response, on a new line, write exactly this format:
THEORY_PLACEMENT: [one of: fundamentals, theory1, theory2, theory3, theory4]

Their answers:

1. What music means to them: ${answers.music_relationship || 'not answered'}
2. Previous attempts at learning: ${answers.previous_attempts || 'not answered'}
3. Vision of success: ${answers.vision || 'not answered'}
4. Last song that moved them: ${answers.musical_identity || 'not answered'}
5. Genre focus: ${Array.isArray(answers.genre_focus) ? answers.genre_focus.join(', ') : answers.genre_focus || 'not answered'}
6. Theory level: ${answers.theory_level || 'not answered'}
7. How they explain music: ${answers.communication_style || 'not answered'}
8. DAW experience: ${answers.daw_experience || 'not answered'}
9. Workspace: ${answers.workspace || 'not answered'}
10. Current gear: ${answers.current_gear || 'not answered'}
11. Instruments: ${Array.isArray(answers.instruments) ? answers.instruments.join(', ') : answers.instruments || 'not answered'}
12. Favorite gear: ${answers.favorite_gear || 'not answered'}
13. Learning style: ${Array.isArray(answers.learning_style) ? answers.learning_style.join(', ') : answers.learning_style || 'not answered'}
14. Ambition level: ${answers.ambition || 'not answered'}
15. Blind spots or avoidances: ${answers.blind_spots || 'not answered'}`
  }

  function parseSummary(text) {
    const lines = text.split('\n')
    const placementLine = lines.find(l => l.startsWith('THEORY_PLACEMENT:'))
    const summaryLines = lines.filter(l => !l.startsWith('THEORY_PLACEMENT:'))
    const placement = placementLine?.replace('THEORY_PLACEMENT:', '').trim()
    return { text: summaryLines.join('\n').trim(), placement }
  }

  function handleConfirm() {
    const { text, placement } = parseSummary(summary)
    onComplete({
      summary: text,
      theory_placement: placement,
      display_name: displayName,
      additional_context: additionalContext
    })
  }

  const { text: summaryText } = parseSummary(summary)

  return (
    <div className="skillscan-shell">
      <div className="skillscan-header">
        <div className="skillscan-logo">Studio Mastery</div>
        <div className="skillscan-progress-wrap">
          <div className="skillscan-progress-bar">
            <div className="skillscan-progress-fill" style={{ width: '100%' }} />
          </div>
          <div className="skillscan-progress-label">Complete</div>
        </div>
      </div>

      <div className="skillscan-question">
        <div className="skillscan-q-inner">

          <div className="skillscan-q-number">// Your Profile</div>
          <h2 className="skillscan-q-text">Here's what I know about you.</h2>
          <p className="skillscan-q-subtext">
            Read this over — if it sounds right, we're ready to start.
          </p>

          <div className="skillscan-summary-box">
            {loading ? (
              <div className="skillscan-summary-loading">
                <div className="skillscan-dots">
                  <span /><span /><span />
                </div>
                <div className="skillscan-summary-loading-text">
                  Building your profile...
                </div>
              </div>
            ) : (
              <p className="skillscan-summary-text">
                {summaryText}
              </p>
            )}
          </div>

          {!loading && (
            <div className="skillscan-additional">
              <div className="skillscan-q-number">// One more thing</div>
              <p className="skillscan-additional-label">
                Is there anything else you'd like me to know that would help me teach you better? Anything about how you think, learn, or work?
              </p>
              <p className="skillscan-additional-examples">
                e.g. "I have ADHD and learn better in short bursts" · "I'm deaf in one ear" · "I'm recovering from a wrist injury" · "I'm a music teacher who wants to learn production for my students"
              </p>
              <textarea
                className="skillscan-textarea"
                placeholder="Anything else I should know... (optional)"
                value={additionalContext}
                onChange={e => setAdditionalContext(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {error && (
            <div className="skillscan-error">{error}</div>
          )}

          <div className="skillscan-q-actions">
            <button
              className="skillscan-back-btn"
              onClick={onBack}
              disabled={loading}
            >
              ← Edit answers
            </button>
            <button
              className="skillscan-next-btn"
              onClick={handleConfirm}
              disabled={loading}
            >
              This is me — let's start →
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}