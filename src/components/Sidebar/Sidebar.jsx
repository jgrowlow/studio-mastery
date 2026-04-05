import { useState } from 'react'
import './Sidebar.css'

const MODULES = [
  {
    id: 'module-1',
    label: 'Module 1 — Foundations',
    sections: [
      {
        id: 'signal-acoustics',
        label: 'Signal & Acoustics',
        lessons: [
          { id: 'signal-flow', label: 'Signal Flow & Gain Staging', badge: 'CORE' },
          { id: 'acoustics', label: 'Room Acoustics & Monitoring', badge: 'CORE' },
          { id: 'mic-theory', label: 'Microphone Theory & Technique' },
          { id: 'preamps', label: 'Preamps, Converters & I/O' },
        ]
      },
      {
        id: 'ableton-core',
        label: 'Ableton Core',
        lessons: [
          { id: 'ableton-orientation', label: 'Orientation & Workflow', badge: 'CORE' },
          { id: 'ableton-arrangement', label: 'Arrangement View', badge: 'CORE' },
          { id: 'ableton-session', label: 'Session View', badge: 'CORE' },
          { id: 'ableton-midi', label: 'MIDI & Instruments' },
          { id: 'ableton-audio', label: 'Audio & Warping' },
          { id: 'ableton-routing', label: 'Routing & Sends' },
          { id: 'ableton-rack', label: 'Racks' },
          { id: 'ableton-automation', label: 'Automation' },
          { id: 'ableton-mixing', label: 'Mixing in Ableton' },
          { id: 'ableton-export', label: 'Export & Delivery' },
        ]
      },
      {
        id: 'live-sets-framework',
        label: 'Live Sets — Framework',
        lessons: [
          { id: 'liveset-concept', label: 'Live Set Concept' },
          { id: 'liveset-build', label: 'Building a Live Set' },
          { id: 'liveset-clips', label: 'Clips & Scenes' },
          { id: 'liveset-midi-control', label: 'MIDI Control' },
          { id: 'liveset-looping', label: 'Live Looping' },
        ]
      },
      {
        id: 'your-setup',
        label: 'Your Setup',
        lessons: [
          { id: 'setup-env', label: 'Environment Check' },
          { id: 'setup-headphones', label: 'Headphone Setup' },
          { id: 'setup-mobile', label: 'Mobile Recording' },
        ]
      },
      {
        id: 'ear-foundations',
        label: 'Ear Training — Foundations',
        lessons: [
          { id: 'ear-rhythm', label: 'Rhythm & Groove' },
          { id: 'ear-melody', label: 'Melody & Intervals' },
        ]
      },
      {
        id: 'professional-habits',
        label: 'Professional Habits',
        lessons: [
          { id: 'habits-journal', label: 'Using Your Journal' },
          { id: 'habits-export', label: 'Exporting & Sharing Audio' },
          { id: 'habits-feedback', label: 'Getting Engineer Feedback' },
        ]
      },
    ]
  },
  {
    id: 'module-2',
    label: 'Module 2 — Recording',
    sections: [
      {
        id: 'mic-recording',
        label: 'Microphone Technique',
        lessons: [
          { id: 'mic-polar', label: 'Polar Patterns' },
          { id: 'mic-placement', label: 'Mic Placement' },
          { id: 'mic-proximity', label: 'Proximity Effect' },
        ]
      },
      {
        id: 'recording-instruments',
        label: 'Recording Instruments',
        lessons: [
          { id: 'drums', label: 'Drums' },
          { id: 'bass', label: 'Bass' },
          { id: 'guitars', label: 'Guitars' },
          { id: 'vocals', label: 'Vocals' },
          { id: 'piano', label: 'Keys & Synths' },
        ]
      },
      {
        id: 'ear-frequency',
        label: 'Ear Training — Frequency & Pitch',
        lessons: [
          { id: 'ear-frequency', label: 'Frequency Recognition' },
          { id: 'ear-pitch', label: 'Pitch & Tuning' },
        ]
      },
    ]
  },
  {
    id: 'module-3',
    label: 'Module 3 — Sound Design',
    sections: [
      {
        id: 'synthesis',
        label: 'Synthesis Fundamentals',
        lessons: [
          { id: 'sd-synthesis', label: 'Subtractive, FM, Wavetable', badge: 'CORE' },
          { id: 'sd-ableton', label: 'Wavetable, Operator & Drift', badge: 'CORE' },
        ]
      },
      {
        id: 'sampling-drums',
        label: 'Sampling & Drums',
        lessons: [
          { id: 'sd-sampling', label: 'Sampling & Manipulation' },
          { id: 'sd-drums', label: 'Drum Sound Design' },
          { id: 'sd-foley', label: 'Foley & Field Recording' },
        ]
      },
      {
        id: 'sound-design-context',
        label: 'Sound Design in Context',
        lessons: [
          { id: 'sd-genres', label: 'Genre Sound Design' },
          { id: 'sd-modular', label: 'Modular Concepts' },
          { id: 'sd-performance', label: 'Performance Instruments' },
        ]
      },
      {
        id: 'ear-timbre',
        label: 'Ear Training — Timbre & Texture',
        lessons: [
          { id: 'ear-synthesis-types', label: 'Identifying Synthesis Types' },
          { id: 'ear-deconstruct', label: 'Deconstructing Sounds' },
        ]
      },
    ]
  },
  {
    id: 'module-4',
    label: 'Module 4 — Mixing',
    sections: [
      {
        id: 'mixing-fundamentals',
        label: 'Mixing Fundamentals',
        lessons: [
          { id: 'eq', label: 'EQ', badge: 'CORE' },
          { id: 'compression', label: 'Compression', badge: 'CORE' },
          { id: 'reverb-delay', label: 'Reverb & Delay' },
          { id: 'saturation', label: 'Saturation' },
          { id: 'stereo', label: 'Stereo Field' },
          { id: 'automation', label: 'Automation' },
          { id: 'mix-workflow', label: 'Mix Workflow' },
        ]
      },
      {
        id: 'mastering-delivery',
        label: 'Mastering & Delivery',
        lessons: [
          { id: 'mastering', label: 'Mastering Fundamentals' },
          { id: 'loudness', label: 'Loudness & Streaming' },
        ]
      },
      {
        id: 'console-hardware',
        label: 'Console & Hardware',
        lessons: [
          { id: 'console-thinking', label: 'Console Thinking' },
          { id: 'console-ssl', label: 'SSL, Neve & API' },
          { id: 'console-outboard', label: 'Outboard Gear' },
          { id: 'console-mixbus', label: 'Mixbus & Emulation' },
        ]
      },
      {
        id: 'reference-listening',
        label: 'Reference & Critical Listening',
        lessons: [
          { id: 'reference-mixing', label: 'Reference Mixing' },
          { id: 'genre-hiphop', label: 'Hip-Hop & Trap' },
          { id: 'genre-rnb', label: 'R&B & Soul' },
          { id: 'genre-pop', label: 'Pop' },
          { id: 'genre-rock', label: 'Rock & Alternative' },
          { id: 'genre-electronic', label: 'Electronic & Dance' },
          { id: 'genre-worship', label: 'Worship & CCM' },
          { id: 'genre-jazz', label: 'Jazz' },
          { id: 'genre-folk', label: 'Folk & Acoustic' },
          { id: 'genre-film', label: 'Film & Sync' },
          { id: 'genre-crossgenre', label: 'Cross-Genre Fluency', badge: 'KEY' },
        ]
      },
      {
        id: 'ear-dynamics',
        label: 'Ear Training — Dynamics & Space',
        lessons: [
          { id: 'ear-compression', label: 'Hearing Compression' },
          { id: 'ear-eq', label: 'Hearing EQ' },
          { id: 'ear-translation', label: 'Mix Translation' },
        ]
      },
    ]
  },
  {
    id: 'module-5',
    label: 'Module 5 — Live Performance',
    sections: [
      {
        id: 'live-sets-performance',
        label: 'Live Sets — Performance',
        lessons: [
          { id: 'liveset-transitions', label: 'Transitions & Flow' },
          { id: 'liveset-effects', label: 'Performance FX' },
          { id: 'liveset-backup', label: 'Reliability & Backup' },
          { id: 'liveset-audio-interface', label: 'Interface & I/O' },
          { id: 'liveset-soundcheck', label: 'Soundcheck & FOH' },
        ]
      },
      {
        id: 'live-sound',
        label: 'Live Sound',
        lessons: [
          { id: 'livesound-intro', label: 'Live vs Studio' },
          { id: 'livesound-foh', label: 'FOH Mixing' },
          { id: 'livesound-gainstructure', label: 'Gain Structure' },
          { id: 'livesound-monitors', label: 'Monitors & IEMs' },
          { id: 'livesound-digital', label: 'Digital Consoles' },
          { id: 'livesound-worship', label: 'Worship Live Sound' },
          { id: 'livesound-troubleshoot', label: 'Troubleshooting' },
        ]
      },
      {
        id: 'delivery-standards',
        label: 'Delivery & Standards',
        lessons: [
          { id: 'delivery-stems', label: 'Stems Delivery' },
          { id: 'delivery-mono', label: 'Mono Compatibility' },
          { id: 'delivery-streaming', label: 'Streaming Specs' },
          { id: 'delivery-sync', label: 'Sync Delivery' },
        ]
      },
      {
        id: 'ear-live',
        label: 'Ear Training — Live Context',
        lessons: [
          { id: 'ear-room', label: 'Hearing a Room' },
          { id: 'ear-live-translation', label: 'Live Mix Translation' },
        ]
      },
    ]
  },
  {
    id: 'module-6',
    label: 'Module 6 — Theory',
    sections: [
      {
        id: 'theory-placement',
        label: 'Theory Placement',
        lessons: [
          { id: 'theory-assessment', label: 'Theory Placement Assessment' },
        ]
      },
      {
        id: 'theory-fundamentals',
        label: 'Music Fundamentals',
        lessons: [
          { id: 'theory-notes', label: 'Notes, Rhythm & Reading' },
          { id: 'theory-scales', label: 'Scales & the Major Scale' },
          { id: 'theory-chords-intro', label: 'What is a Chord?' },
        ]
      },
      {
        id: 'theory-1',
        label: 'Theory 1 — Intervals & Basic Harmony',
        lessons: [
          { id: 'theory1-intervals', label: 'Intervals' },
          { id: 'theory1-triads', label: 'Triads & Chord Types' },
          { id: 'theory1-diatonic', label: 'Diatonic Harmony' },
          { id: 'theory1-keys', label: 'Keys & Key Signatures' },
        ]
      },
      {
        id: 'theory-2',
        label: 'Theory 2 — Harmony & Structure',
        lessons: [
          { id: 'theory2-function', label: 'Chord Function' },
          { id: 'theory2-progressions', label: 'Progressions' },
          { id: 'theory2-form', label: 'Song Structure & Form' },
          { id: 'theory2-rhythm', label: 'Rhythm Theory' },
        ]
      },
      {
        id: 'theory-3',
        label: 'Theory 3 — Modal & Advanced',
        lessons: [
          { id: 'theory3-modal', label: 'Modal Harmony' },
          { id: 'theory3-secondary', label: 'Secondary Dominants' },
          { id: 'theory3-modulation', label: 'Modulation' },
          { id: 'theory3-modes', label: 'The 7 Modes' },
          { id: 'theory3-chromatic', label: 'Chromatic Harmony' },
          { id: 'theory3-reharmonization', label: 'Reharmonization' },
        ]
      },
      {
        id: 'theory-4',
        label: 'Theory 4 — Jazz & Advanced',
        lessons: [
          { id: 'theory4-jazz-harmony', label: 'Jazz Harmony' },
          { id: 'theory4-voice-leading', label: 'Voice Leading' },
          { id: 'theory4-counterpoint', label: 'Counterpoint' },
          { id: 'theory4-neo-riemannian', label: 'Neo-Riemannian Theory' },
          { id: 'theory4-post-tonal', label: 'Post-Tonal Theory' },
        ]
      },
      {
        id: 'theory-advanced',
        label: 'Advanced Theory — Electives',
        lessons: [
          { id: 'theory-arranging', label: 'Arranging & Orchestration' },
          { id: 'theory-composition', label: 'Composition' },
          { id: 'theory-analysis', label: 'Harmonic Analysis' },
          { id: 'theory-improvisation', label: 'Improvisation Theory' },
        ]
      },
      {
        id: 'ear-style',
        label: 'Ear Training — Style & Genre',
        lessons: [
          { id: 'ear-genre-fluency', label: 'Genre Fluency' },
          { id: 'ear-style', label: 'Style Recognition' },
        ]
      },
    ]
  },
  {
    id: 'module-7',
    label: 'Module 7 — Professional Practice',
    sections: [
      {
        id: 'artist-session',
        label: 'Artist & Session Skills',
        lessons: [
          { id: 'session-communication', label: 'Artist Communication' },
          { id: 'session-direction', label: 'Session Direction' },
          { id: 'session-energy', label: 'Session Energy' },
          { id: 'session-remote', label: 'Remote Sessions' },
        ]
      },
      {
        id: 'music-business',
        label: 'Music Business',
        lessons: [
          { id: 'biz-pricing', label: 'Pricing Your Services' },
          { id: 'biz-clients', label: 'Finding Clients' },
          { id: 'biz-contracts', label: 'Contracts & Legal' },
          { id: 'biz-copyright', label: 'Copyright & Ownership' },
          { id: 'biz-publishing', label: 'Publishing & Royalties' },
          { id: 'biz-sync', label: 'Sync Licensing' },
          { id: 'biz-streaming-income', label: 'Streaming Income' },
          { id: 'biz-distro', label: 'Distribution' },
          { id: 'biz-branding', label: 'Branding & Marketing' },
          { id: 'biz-pro', label: 'PROs & Registration' },
          { id: 'biz-worship-market', label: 'Worship Music Market' },
        ]
      },
    ]
  },
]

export default function Sidebar({ onSelectTopic, currentTopic, lessonStatus }) {
  const [openModules, setOpenModules] = useState({ 'module-1': true })
  const [openSections, setOpenSections] = useState({})

  function toggleModule(id) {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function toggleSection(id) {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function getStatusLabel(lessonId) {
    const status = lessonStatus?.[lessonId]
    if (!status || status === 'not_started') return null
    if (status === 'in_progress') return { label: 'STARTED', className: 'status-started' }
    if (status === 'needs_work') return { label: 'NEEDS WORK', className: 'status-needs-work' }
    if (status === 'solid' || status === 'strong') return { label: 'DONE', className: 'status-done' }
    return null
  }

  return (
    <aside className="sidebar">
      {MODULES.map(module => (
        <div key={module.id} className="module-group">

          <button
            className={`module-header ${openModules[module.id] ? 'open' : ''}`}
            onClick={() => toggleModule(module.id)}
          >
            <span className="module-arrow">{openModules[module.id] ? '▾' : '▸'}</span>
            <span className="module-label">{module.label}</span>
          </button>

          {openModules[module.id] && (
            <div className="module-content">
              {module.sections.map(section => (
                <div key={section.id} className="section-group">

                  <button
                    className={`section-header ${openSections[section.id] ? 'open' : ''}`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className="section-arrow">{openSections[section.id] ? '▾' : '▸'}</span>
                    <span className="section-label">{section.label}</span>
                  </button>

                  {openSections[section.id] && (
                    <div className="section-lessons">
                      {section.lessons.map(lesson => {
                        const status = getStatusLabel(lesson.id)
                        const isActive = currentTopic === lesson.id
                        return (
                          <button
                            key={lesson.id}
                            className={`lesson-btn ${isActive ? 'active' : ''}`}
                            onClick={() => onSelectTopic(lesson.id, lesson.label)}
                          >
                            <span className="lesson-label">{lesson.label}</span>
                            <div className="lesson-right">
                              {lesson.badge && (
                                <span className="lesson-badge">{lesson.badge}</span>
                              )}
                              {status && (
                                <span className={`lesson-status ${status.className}`}>
                                  {status.label}
                                </span>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>
      ))}
    </aside>
  )
}