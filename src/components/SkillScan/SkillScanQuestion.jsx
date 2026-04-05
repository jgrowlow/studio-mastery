import { useState, useEffect } from 'react'

export default function SkillScanQuestion({
  question,
  existingAnswer,
  onAnswer,
  onBack,
  canGoBack
}) {
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState([])
  const [otherText, setOtherText] = useState('')
  const [showOther, setShowOther] = useState(false)

  // Restore existing answer if resuming
  useEffect(() => {
    if (!existingAnswer) {
      setValue('')
      setSelected([])
      setOtherText('')
      setShowOther(false)
      return
    }

    if (question.type === 'open') {
      setValue(existingAnswer === 'gear_zero' ? '' : existingAnswer)
    } else if (question.type === 'singleselect') {
      const isOther = !question.options.includes(existingAnswer)
      if (isOther) {
        setShowOther(true)
        setOtherText(existingAnswer)
        setSelected(['other'])
      } else {
        setSelected([existingAnswer])
      }
    } else if (question.type === 'multiselect') {
      const arr = Array.isArray(existingAnswer) ? existingAnswer : []
      const others = arr.filter(a => !question.options.includes(a))
      const known = arr.filter(a => question.options.includes(a))
      setSelected(known)
      if (others.length) {
        setShowOther(true)
        setOtherText(others.join(', '))
      }
    }
  }, [question.id])

  function toggleOption(option) {
    if (question.type === 'singleselect') {
      setSelected([option])
      setShowOther(false)
      setOtherText('')
    } else {
      setSelected(prev =>
        prev.includes(option)
          ? prev.filter(o => o !== option)
          : [...prev, option]
      )
    }
  }

  function handleSubmit() {
    if (question.type === 'open') {
      onAnswer(value.trim() || (question.optional ? 'skipped' : ''))
    } else if (question.type === 'singleselect') {
      const answer = showOther && otherText ? otherText : selected[0]
      onAnswer(answer)
    } else if (question.type === 'multiselect') {
      const all = [...selected]
      if (showOther && otherText) all.push(otherText)
      onAnswer(all)
    }
  }

  function canSubmit() {
    if (question.optional) return true
    if (question.type === 'open') return value.trim().length > 0
    if (question.type === 'singleselect') return selected.length > 0 || (showOther && otherText.trim().length > 0)
    if (question.type === 'multiselect') return selected.length > 0 || (showOther && otherText.trim().length > 0)
    return false
  }

  return (
    <div className="skillscan-question">
      <div className="skillscan-q-inner">

        <div className="skillscan-q-number">// Question {question.number}</div>
        <h2 className="skillscan-q-text">{question.question}</h2>
        {question.subtext && (
          <p className="skillscan-q-subtext">{question.subtext}</p>
        )}

        <div className="skillscan-q-input">

          {/* OPEN TEXT */}
          {question.type === 'open' && (
            <>
              {question.quickEscape && (
                <button
                  className="skillscan-escape-btn"
                  onClick={() => onAnswer(question.quickEscape.value)}
                >
                  {question.quickEscape.label}
                </button>
              )}
              <textarea
                className="skillscan-textarea"
                placeholder={question.placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
                rows={5}
                autoFocus
              />
            </>
          )}

          {/* SINGLE SELECT */}
          {question.type === 'singleselect' && (
            <div className="skillscan-options">
              {question.options.map(option => (
                <button
                  key={option}
                  className={`skillscan-option ${selected.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleOption(option)}
                >
                  <span className="skillscan-option-dot" />
                  {option}
                </button>
              ))}
              {question.allowOther && (
                <button
                  className={`skillscan-option ${showOther ? 'selected' : ''}`}
                  onClick={() => {
                    setShowOther(true)
                    setSelected([])
                  }}
                >
                  <span className="skillscan-option-dot" />
                  Something else
                </button>
              )}
              {showOther && (
                <input
                  className="skillscan-other-input"
                  placeholder="Tell me more..."
                  value={otherText}
                  onChange={e => setOtherText(e.target.value)}
                  autoFocus
                />
              )}
            </div>
          )}

          {/* MULTI SELECT */}
          {question.type === 'multiselect' && (
            <div className="skillscan-options">
              {question.options.map(option => (
                <button
                  key={option}
                  className={`skillscan-option multi ${selected.includes(option) ? 'selected' : ''}`}
                  onClick={() => toggleOption(option)}
                >
                  <span className="skillscan-option-check">
                    {selected.includes(option) ? '✓' : ''}
                  </span>
                  {option}
                </button>
              ))}
              {question.allowOther && (
                <button
                  className={`skillscan-option multi ${showOther ? 'selected' : ''}`}
                  onClick={() => setShowOther(!showOther)}
                >
                  <span className="skillscan-option-check">
                    {showOther ? '✓' : ''}
                  </span>
                  Something else
                </button>
              )}
              {showOther && (
                <input
                  className="skillscan-other-input"
                  placeholder="Add your own..."
                  value={otherText}
                  onChange={e => setOtherText(e.target.value)}
                  autoFocus
                />
              )}
            </div>
          )}

        </div>

        <div className="skillscan-q-actions">
          {canGoBack && (
            <button className="skillscan-back-btn" onClick={onBack}>
              ← Back
            </button>
          )}
          <button
            className="skillscan-next-btn"
            onClick={handleSubmit}
            disabled={!canSubmit()}
          >
            {question.number === 15 ? 'See My Profile →' : 'Next →'}
          </button>
          {question.optional && question.type === 'open' && (
            <button
              className="skillscan-skip-btn"
              onClick={() => onAnswer('skipped')}
            >
              Skip
            </button>
          )}
        </div>

      </div>
    </div>
  )
}