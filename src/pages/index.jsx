import * as React from "react"

import { useEffect, useRef, useState } from "react"

import { navigate } from "gatsby"

const PASSWORD = "0506"
const STORAGE_KEY = "creative_vaz_auth"

const IndexPage = () => {
  const [input, setInput] = useState("")
  const [shake, setShake] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  const containerRef = useRef(null)
  const hiddenInputRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      navigate("/projetos")
    } else {
      containerRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const resetWithShake = () => {
    setShake(true)
    setTimeout(() => {
      setShake(false)
      setInput("")
      if (hiddenInputRef.current) hiddenInputRef.current.value = ""
    }, 400)
  }

  const trySubmit = (next) => {
    if (next.length === PASSWORD.length) {
      if (next === PASSWORD) {
        localStorage.setItem(STORAGE_KEY, "true")
        navigate("/projetos")
      } else {
        resetWithShake()
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setInput((prev) => {
        const next = prev.slice(0, -1)
        if (hiddenInputRef.current) hiddenInputRef.current.value = next
        return next
      })
      return
    }

    if (e.key.length !== 1 || input.length >= PASSWORD.length) return
    if (!/[0-9]/.test(e.key)) return

    const next = (input + e.key).toUpperCase()
    setInput(next)
    if (hiddenInputRef.current) hiddenInputRef.current.value = next
    trySubmit(next)
  }

  const handleHiddenInputChange = (e) => {
    const raw = e.target.value || ""
    const digitsOnly = raw.replace(/\D/g, "")
    const next = digitsOnly.slice(0, PASSWORD.length)

    setInput(next)
    if (e.target.value !== next) e.target.value = next
    trySubmit(next)
  }

  const focusKeyboard = () => {
    hiddenInputRef.current?.focus()
  }

  return (
    <div
      className="password-page"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={focusKeyboard}
      onTouchStart={focusKeyboard}
      ref={containerRef}
    >
      <input
        ref={hiddenInputRef}
        className="hidden-password-input"
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        aria-label="Password"
        onChange={handleHiddenInputChange}
      />

      <div className={`password-container ${shake ? "shake" : ""}`}>
        <span className="prefix-text">CREATIVE VAZ</span>
        <span className="password-input">
          {PASSWORD.split("").map((_, i) => {
            const isActive = i === input.length

            return (
              <span key={i} className="char-slot">
                {input[i] || "_"}
                {isActive && cursorVisible && (
                  <span className="inline-cursor">▮</span>
                )}
              </span>
            )
          })}
        </span>
      </div>
    </div>
  )
}

export default IndexPage
