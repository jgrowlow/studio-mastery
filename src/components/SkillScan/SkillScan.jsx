import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import SkillScanQuestion from './SkillScanQuestion'
import SkillScanSummary from './SkillScanSummary'
import './SkillScan.css'

export const QUESTIONS = [
  {
    id: 'music_relationship',
    number: 1,
    type: 'open',
    question: 'What is music to you right now?',
    subtext: 'Is it a hobby, a calling, a career you\'re building, or something you\'ve always wanted to do but haven\'t started yet? No wrong answers.',
    placeholder: 'Tell me honestly — where are you with music right now...'
  },
  {
    id: 'previous_attempts',
    number: 2,
    type: 'open',
    question: 'Have you tried to learn production or music theory before?',
    subtext: 'If yes — what happened? Where did it click and where did it fall apart? If no, just say so.',
    placeholder: 'What\'s worked, what hasn\'t, or what you\'ve never tried...'
  },
  {
    id: 'vision',
    number: 3,
    type: 'open',
    question: 'If this program works exactly the way you hope — what are you doing a year from now that you\'re not doing today?',
    subtext: 'Be specific. The more concrete your answer, the better I can tailor this to you.',
    placeholder: 'A year from now I\'m...'
  },
  {
    id: 'musical_identity',
    number: 4,
    type: 'open',
    question: 'Tell me about the last song or record that genuinely moved you.',
    subtext: 'What was it and what did it do to you? This tells me more about how you hear music than any checklist.',
    placeholder: 'The song, the artist, and what it did to you...'
  },
  {
    id: 'genre_focus',
    number: 5,
    type: 'multiselect',
    question: 'What genres are you working in or want to work in?',
    subtext: 'Pick everything that applies — including things you\'re curious about but haven\'t tried yet.',
    options: [
      'Hip-Hop / Trap',
      'R&B / Soul',
      'Pop',
      'Rock / Alternative',
      'Metal / Heavy',
      'Electronic / Dance / Club',
      'Jazz / Blues',
      'Folk / Acoustic / Singer-Songwriter',
      'Worship / CCM / Gospel',
      'Film / Sync / Cinematic',
      'Classical / Orchestral',
      'I want full cross-genre fluency'
    ],
    allowOther: true
  },
  {
    id: 'theory_level',
    number: 6,
    type: 'singleselect',
    question: 'Have you studied music theory formally?',
    subtext: 'In school, online courses, or privately. Pick the closest match.',
    options: [
      'No formal study — I\'ve picked things up by ear or figured things out myself',
      'I know the basics — major/minor chords, a few scales, nothing formal',
      'I\'ve completed some formal theory — roughly 1-2 semesters or equivalent',
      'I\'ve completed intermediate theory — roughly 3-4 semesters or equivalent',
      'I have a music degree or completed advanced theory study'
    ],
    allowOther: true
  },
  {
    id: 'communication_style',
    number: 7,
    type: 'open',
    question: 'When you\'re trying to explain something about music to someone — what do you reach for?',
    subtext: 'Technical terms, analogies, humming it, playing it, describing how it feels? There\'s no right answer — this helps me speak your language.',
    placeholder: 'I usually try to...'
  },
  {
    id: 'daw_experience',
    number: 8,
    type: 'open',
    question: 'What DAWs have you used, and how comfortable are you with each?',
    subtext: 'Tell me what you\'ve used and how deep you\'ve gone. If you\'ve never used one, just say so.',
    placeholder: 'e.g. "Ableton daily for 2 years, pretty comfortable. Tried Logic once. Never touched Pro Tools." Or just "Nothing yet."',
    optional: false
  },
  {
    id: 'workspace',
    number: 9,
    type: 'singleselect',
    question: 'What kind of atmosphere do you plan to use as your workspace?',
    subtext: 'This affects everything from what gear we recommend to how we approach acoustics.',
    options: [
      'Mobile — laptop anywhere, no fixed space',
      'Small room with no sound treatment',
      'Dedicated home studio space, no treatment',
      'Home studio with some acoustic treatment',
      'Professional studio access'
    ],
    allowOther: true
  },
  {
    id: 'current_gear',
    number: 10,
    type: 'open',
    question: 'What are you currently working with?',
    subtext: 'No wrong answers — just tell me what you have. Examples: "Just a MacBook and AirPods" · "Focusrite Scarlett 2i2, Sony MDR-7506, no monitors" · "Apollo Twin, SM7B, Yamaha HS8s, Waves plugins"',
    placeholder: 'List whatever you\'re working with...',
    optional: true
  },
  {
    id: 'instruments',
    number: 11,
    type: 'multiselect',
    question: 'What instruments do you like to create with or record?',
    subtext: 'Pick everything that applies.',
    options: [
      'Keys / Piano',
      'Guitar',
      'Bass',
      'Drums / Percussion',
      'Vocals',
      'Synths / Electronic',
      'Strings / Brass / Orchestra',
      'I produce entirely in the box — no live instruments'
    ],
    allowOther: true
  },
  {
    id: 'favorite_gear',
    number: 12,
    type: 'open',
    question: 'What are your top five favorite pieces of gear you own or use regularly?',
    subtext: 'Don\'t overthink it — just what comes to mind first.',
    placeholder: 'List whatever you love most...',
    quickEscape: {
      label: 'I\'m new to this and don\'t have gear yet',
      value: 'gear_zero'
    },
    optional: true
  },
  {
    id: 'learning_style',
    number: 13,
    type: 'multiselect',
    question: 'How do you learn best?',
    subtext: 'Pick everything that sounds like you.',
    options: [
      'Show me the concept then let me try it',
      'Walk me through it step by step',
      'Give me the theory first then the application',
      'Just give me exercises and let me figure it out',
      'Real-world examples and reference tracks',
      'Push me hard — I want to be challenged'
    ]
  },
  {
    id: 'ambition',
    number: 14,
    type: 'singleselect',
    question: 'How serious are you about this right now?',
    subtext: 'Be honest — this affects how hard I push you.',
    options: [
      'Exploring — no pressure, just curious',
      'Committed — I want to make real progress',
      'All in — this is a priority for me',
      'Professional — I\'m building a career'
    ]
  },
  {
    id: 'blind_spots',
    number: 15,
    type: 'open',
    question: 'Is there anything about music production or theory you\'ve been avoiding or that has felt too hard in the past?',
    subtext: 'Skip if nothing comes to mind.',
    placeholder: 'Anything you\'ve been putting off or that\'s felt out of reach...',
    optional: true
  }
]

export default function SkillScan({ user, onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [scanId, setScanId] = useState(null)
  const [showSummary, setShowSummary] = useState(false)
  const [loading, setLoading] = useState(true)

  // On mount — check for existing in-progress scan
  useEffect(() => {
    async function checkExisting() {
      const { data } = await supabase
        .from('skill_scan')
        .select('*')
        .eq('user_id', user.id)
        .is('completed_at', null)
        .maybeSingle()

      if (data) {
        setScanId(data.id)
        setAnswers(data.answers || {})
        // Resume from last answered question
        const answeredCount = Object.keys(data.answers || {}).length
        setCurrentQ(Math.min(answeredCount, QUESTIONS.length - 1))
      }

      setLoading(false)
    }

    checkExisting()
  }, [user.id])

  async function saveAnswer(questionId, answer) {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    if (scanId) {
      // Update existing scan
      await supabase
        .from('skill_scan')
        .update({ answers: newAnswers })
        .eq('id', scanId)
    } else {
      // Create new scan record
      const { data } = await supabase
        .from('skill_scan')
        .insert({
          user_id: user.id,
          answers: newAnswers
        })
        .select()
        .single()

      if (data) setScanId(data.id)
    }
  }

  async function handleAnswer(answer) {
    const question = QUESTIONS[currentQ]
    await saveAnswer(question.id, answer)

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1)
    } else {
      setShowSummary(true)
    }
  }

  function handleBack() {
    if (currentQ > 0) setCurrentQ(prev => prev - 1)
  }

  async function handleComplete(profile) {
    // Mark scan as complete
    await supabase
      .from('skill_scan')
      .update({
        completed_at: new Date().toISOString(),
        theory_placement: profile.theory_placement
      })
      .eq('id', scanId)

    // Save profile
    await supabase
      .from('profiles')
      .update({
        display_name: profile.display_name || user.email.split('@')[0],
        skill_scan_complete: true
      })
      .eq('id', user.id)

    onComplete()
  }

  if (loading) return (
    <div className="skillscan-loading">
      <div className="skillscan-loading-text">Loading...</div>
    </div>
  )

  if (showSummary) return (
    <SkillScanSummary
      answers={answers}
      user={user}
      onComplete={handleComplete}
      onBack={() => setShowSummary(false)}
    />
  )

  return (
    <div className="skillscan-shell">
      <div className="skillscan-header">
        <div className="skillscan-logo">Studio Mastery</div>
        <div className="skillscan-progress-wrap">
          <div className="skillscan-progress-bar">
            <div
              className="skillscan-progress-fill"
              style={{ width: `${((currentQ) / QUESTIONS.length) * 100}%` }}
            />
          </div>
          <div className="skillscan-progress-label">
            {currentQ + 1} of {QUESTIONS.length}
          </div>
        </div>
      </div>

      <SkillScanQuestion
        question={QUESTIONS[currentQ]}
        existingAnswer={answers[QUESTIONS[currentQ].id]}
        onAnswer={handleAnswer}
        onBack={handleBack}
        canGoBack={currentQ > 0}
      />
    </div>
  )
}