import React, { useEffect, useState } from "react"

const getInitialTheme = () => {
    if (typeof window === "undefined") return "light"

    const stored = window.localStorage.getItem("theme")
    if (stored === "dark" || stored === "light") return stored

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    return prefersDark ? "dark" : "light"
}

const applyTheme = (theme) => {
    if (typeof document === "undefined") return
    document.documentElement.setAttribute("data-theme", theme)
}

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const t = getInitialTheme()
        setTheme(t)
        applyTheme(t)
    }, [])

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark"
        setTheme(next)
        applyTheme(next)
        if (typeof window !== "undefined") {
            window.localStorage.setItem("theme", next)
        }
    }

    return (
        <button className="theme-switcher-toggle" aria-hidden="true" onClick={toggleTheme}>
            <svg className={`theme-switcher-toggle__icon${theme == "dark" ? "--moon" : ""}`} width="24" height="24" viewBox="0 0 24 24">
                <defs>
                    <mask id="mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                        <circle className="theme-switcher-toggle__cut-out" r="6" cx="24" cy="10" fill="black" />
                    </mask>
                </defs>
                <circle className="theme-switcher-toggle__center-circle" r="6" cx="12" cy="12" fill="currentColor" mask="url(#mask)" />
                <g className="theme-switcher-toggle__rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" x2="12" y1="3" y2="1" />
                    <line x1="21" x2="23" y1="12" y2="12" />
                    <line x1="12" x2="12" y1="21" y2="23" />
                    <line x1="1" x2="3" y1="12" y2="12" />
                </g>
                <g className="theme-switcher-toggle__rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="rotate(45 12 12)">
                    <line x1="12" x2="12" y1="3" y2="1" />
                    <line x1="21" x2="23" y1="12" y2="12" />
                    <line x1="12" x2="12" y1="21" y2="23" />
                    <line x1="1" x2="3" y1="12" y2="12" />
                </g>
            </svg>
        </button>
    )
}

export default ThemeSwitcher