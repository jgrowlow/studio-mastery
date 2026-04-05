import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import AuthPage from './Auth'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import SkillScan from './components/SkillScan/SkillScan'

function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentTopic, setCurrentTopic] = useState(null)
  const [currentTopicLabel, setCurrentTopicLabel] = useState('')
  const [currentMode, setCurrentMode] = useState('curriculum')
  const [lessonStatus, setLessonStatus] = useState({})

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) loadProfile(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session)
        if (session) loadProfile(session.user.id)
        else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function loadProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    setProfile(data)
    setLoading(false)
  }

  function handleSelectTopic(topicId, topicLabel) {
    setCurrentTopic(topicId)
    setCurrentTopicLabel(topicLabel)
  }

  async function handleSkillScanComplete() {
    // Reload profile — scan is now marked complete
    await loadProfile(session.user.id)
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666680',
      fontFamily: 'monospace',
      letterSpacing: '3px'
    }}>
      LOADING...
    </div>
  )

  if (!session) return <AuthPage />

  // Show Skill Scan if not completed
  if (!profile?.skill_scan_complete) return (
    <SkillScan
      user={session.user}
      onComplete={handleSkillScanComplete}
    />
  )

  // Main app — skill scan complete
  return (
    <div className="app-shell">
      <Header
        onShowJournal={() => console.log('journal')}
        onShowTools={() => console.log('tools')}
        onShowGear={() => console.log('gear')}
        onShowFeedback={() => console.log('feedback')}
        onSetMode={setCurrentMode}
        currentMode={currentMode}
      />
      <div className="app-body">
        <Sidebar
          onSelectTopic={handleSelectTopic}
          currentTopic={currentTopic}
          lessonStatus={lessonStatus}
        />
        <main className="app-main">
          {currentTopic ? (
            <div style={{
              padding: '32px',
              fontFamily: 'monospace',
              color: '#666680'
            }}>
              <div style={{
                color: '#e8ff3c',
                fontSize: '24px',
                letterSpacing: '3px',
                marginBottom: '8px'
              }}>
                {currentTopicLabel}
              </div>
              <div style={{
                fontSize: '11px',
                letterSpacing: '2px'
              }}>
                // Chat interface coming in Phase 4
              </div>
            </div>
          ) : (
            <div style={{
              padding: '32px',
              fontFamily: 'monospace',
              color: '#666680'
            }}>
              <div style={{
                color: '#e8ff3c',
                fontSize: '32px',
                letterSpacing: '3px',
                marginBottom: '8px'
              }}>
                Studio Mastery
              </div>
              <div style={{
                fontSize: '11px',
                letterSpacing: '2px'
              }}>
                // Select a topic from the sidebar to begin
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App