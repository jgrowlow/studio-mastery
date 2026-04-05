import './Header.css'
import { supabase } from '../../lib/supabase'

export default function Header({ onShowJournal, onShowTools, onShowGear, onShowFeedback, onSetMode, currentMode }) {

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <header className="app-header">
      <div className="header-logo">
        Studio Mastery
        <span>// ABLETON · PRODUCTION · MIXING · LIVE SETS</span>
      </div>

      <div className="header-controls">
        <div className="header-tools">
          <button
            className="nav-tool-btn"
            onClick={onShowJournal}
            title="Journal"
          >
            📓 <span className="nav-tool-label">Journal</span>
          </button>
          <button
            className="nav-tool-btn"
            onClick={onShowTools}
            title="Tools"
          >
            🛠️ <span className="nav-tool-label">Tools</span>
          </button>
          <button
            className="nav-tool-btn"
            onClick={onShowGear}
            title="Gear Guide"
          >
            🎸 <span className="nav-tool-label">Gear</span>
          </button>
          <button
            className="nav-tool-btn"
            onClick={onShowFeedback}
            title="Engineer Feedback"
            style={{ color: '#ff8c6e' }}
          >
            📣 <span className="nav-tool-label">Feedback</span>
          </button>
        </div>

        <button
          className={`mode-pill ${currentMode === 'curriculum' ? 'active' : ''}`}
          onClick={() => onSetMode('curriculum')}
        >
          Curriculum
        </button>
      </div>
    </header>
  )
}
