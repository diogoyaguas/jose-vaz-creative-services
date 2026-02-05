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

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      navigate("/projects")
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
    }, 400)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1))
      return
    }

    if (e.key.length !== 1 || input.length >= PASSWORD.length) return

    const next = (input + e.key).toUpperCase()
    setInput(next)

    if (next.length === PASSWORD.length) {
      if (next === PASSWORD) {
        localStorage.setItem(STORAGE_KEY, "true")
        navigate("/projects")
      } else {
        resetWithShake()
      }
    }
  }

  return (
    <div
      className="password-page"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={containerRef}
    >
      <div className={`password-container ${shake ? "shake" : ""}`}>
        <span className="prefix-text">CREATIVE VAZ</span>
        <span className="password-input">
          {PASSWORD.split("").map((_, i) => {
            const isActive = i === input.length

            return (
              <span key={i} className="char-slot">
                {input[i] || "_"}
                {isActive && cursorVisible && <span className="inline-cursor">▮</span>}
              </span>
            )
          })}
        </span>
      </div>
    </div>
  )
}

export default IndexPage
