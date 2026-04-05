import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import AuthPage from './Auth'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

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

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', background: '#0a0a0c', minHeight: '100vh', color: '#e8e8f0' }}>
      <h1 style={{ color: '#e8ff3c', letterSpacing: '4px' }}>Studio Mastery</h1>
      <p>Logged in as: {session.user.email}</p>
      <button
        onClick={() => supabase.auth.signOut()}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          background: '#ff5c3c',
          border: 'none',
          color: '#fff',
          fontFamily: 'monospace',
          cursor: 'pointer',
          letterSpacing: '2px'
        }}
      >
        SIGN OUT
      </button>
    </div>
  )
}

export default App