import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Check your email to confirm your account.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
    }

    setLoading(false)
  }

  const input = {
    width: '100%',
    padding: '12px 16px',
    background: '#18181f',
    border: '1px solid #2a2a36',
    borderRadius: '6px',
    color: '#e8e8f0',
    fontFamily: 'monospace',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '12px'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0c',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '28px',
            letterSpacing: '4px',
            color: '#e8ff3c',
            marginBottom: '8px'
          }}>
            STUDIO MASTERY
          </div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '3px',
            color: '#666680'
          }}>
            // ABLETON · PRODUCTION · MIXING · LIVE SETS
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            style={input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            style={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {message && (
            <div style={{
              padding: '12px',
              background: 'rgba(232,255,60,0.08)',
              border: '1px solid rgba(232,255,60,0.2)',
              borderRadius: '6px',
              color: '#e8ff3c',
              fontFamily: 'monospace',
              fontSize: '11px',
              marginBottom: '12px'
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#e8ff3c',
              border: 'none',
              borderRadius: '6px',
              color: '#000',
              fontFamily: 'monospace',
              fontSize: '14px',
              letterSpacing: '3px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              marginBottom: '16px'
            }}
          >
            {loading ? 'LOADING...' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => { setIsSignUp(!isSignUp); setMessage('') }}
            style={{
              background: 'none',
              border: 'none',
              color: '#666680',
              fontFamily: 'monospace',
              fontSize: '11px',
              letterSpacing: '1px',
              cursor: 'pointer'
            }}
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

      </div>
    </div>
  )
}