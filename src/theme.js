export function getInitialTheme() {
    if (typeof window === "undefined") return "light"

    const stored = window.localStorage.getItem("theme")
    if (stored === "light" || stored === "dark") return stored

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches
    return prefersDark ? "dark" : "light"
}

export function applyTheme(theme) {
    if (typeof document === "undefined") return
    document.documentElement.setAttribute("data-theme", theme)
}

export function setTheme(theme) {
    if (typeof window !== "undefined") {
        window.localStorage.setItem("theme", theme)
    }
    applyTheme(theme)
}
