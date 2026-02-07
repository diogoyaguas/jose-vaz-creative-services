import * as React from "react"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { navigate } from "gatsby"

const PASSWORD = "0506"
const STORAGE_KEY = "creative_vaz_auth"

const IndexPage = () => {
  const [input, setInput] = useState("")
  const [shake, setShake] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [liftPx, setLiftPx] = useState(0)

  const overlayInputRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      navigate("/projetos")
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useLayoutEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const updateLift = () => {
      const keyboardHeight = Math.max(
        0,
        window.innerHeight - vv.height - vv.offsetTop
      )
      setLiftPx(
        keyboardHeight > 0 ? Math.min(220, Math.round(keyboardHeight * 0.55)) : 0
      )
    }

    updateLift()
    vv.addEventListener("resize", updateLift)
    vv.addEventListener("scroll", updateLift)

    return () => {
      vv.removeEventListener("resize", updateLift)
      vv.removeEventListener("scroll", updateLift)
    }
  }, [])

  const resetWithShake = () => {
    setShake(true)
    setTimeout(() => {
      setShake(false)
      setInput("")
      if (overlayInputRef.current) overlayInputRef.current.value = ""
      overlayInputRef.current?.focus()
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

  const handleOverlayChange = (e) => {
    const raw = e.target.value || ""
    const digitsOnly = raw.replace(/\D/g, "")
    const next = digitsOnly.slice(0, PASSWORD.length)

    setInput(next)
    if (e.target.value !== next) e.target.value = next
    trySubmit(next)
  }

  const focusKeyboard = () => {
    overlayInputRef.current?.focus({ preventScroll: true })
  }

  return (
    <div
      className="password-page"
      onPointerDown={focusKeyboard}
      onTouchStart={focusKeyboard}
    >
      <input
        ref={overlayInputRef}
        className="password-overlay-input"
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        aria-label="Password"
        onChange={handleOverlayChange}
      />

      <div
        className="password-lift"
        style={{ transform: `translateY(-${liftPx}px)` }}
      >
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
    </div>
  )
}

export default IndexPage
