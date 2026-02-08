import * as React from "react"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { navigate } from "gatsby"

const DEV_PASSWORD = "1234"
const STORAGE_KEY = "creative_vaz_auth"

const NETLIFY_CONTEXT =
  typeof process !== "undefined" ? process.env.GATSBY_NETLIFY_CONTEXT : undefined

const isProdNetlify = NETLIFY_CONTEXT === "production"
const isDevMode = !isProdNetlify

const IndexPage = () => {
  const [input, setInput] = useState("")
  const [shake, setShake] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [liftPx, setLiftPx] = useState(0)

  const overlayInputRef = useRef(null)

  useEffect(() => {
    if (isDevMode && localStorage.getItem(STORAGE_KEY) === "true") {
      navigate("/projetos")
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 500)
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

  const trySubmitDev = (next) => {
    if (next.length === DEV_PASSWORD.length) {
      if (next === DEV_PASSWORD) {
        localStorage.setItem(STORAGE_KEY, "true")
        navigate("/projetos")
      } else {
        resetWithShake()
      }
    }
  }

  const trySubmitProd = async (next) => {
    if (next.length !== 4) return

    try {
      const res = await fetch("/.netlify/functions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: next }),
      })

      if (res.ok) {
        navigate("/projetos")
      } else {
        resetWithShake()
      }
    } catch {
      resetWithShake()
    }
  }

  const trySubmit = (next) => {
    if (isDevMode) return trySubmitDev(next)
    return trySubmitProd(next)
  }

  const handleOverlayChange = (e) => {
    const raw = e.target.value || ""
    const digitsOnly = raw.replace(/\D/g, "")
    const maxLen = isDevMode ? DEV_PASSWORD.length : 4
    const next = digitsOnly.slice(0, maxLen)

    setInput(next)
    if (e.target.value !== next) e.target.value = next
    trySubmit(next)
  }

  const focusKeyboard = () => {
    overlayInputRef.current?.focus({ preventScroll: true })
  }

  const slotsLen = isDevMode ? DEV_PASSWORD.length : 4

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
            {Array.from({ length: slotsLen }).map((_, i) => {
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
