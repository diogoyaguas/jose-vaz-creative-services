const GLOBAL_VIDEO_AUDIO_EVENT = "jvcs:video-audio-focus"

let scopeCounter = 0

export const createVideoAudioScope = (prefix = "video-audio") => {
  scopeCounter += 1
  return `${prefix}-${scopeCounter}`
}

export const requestVideoAudioFocus = (scopeId) => {
  if (typeof window === "undefined") return

  window.dispatchEvent(
    new CustomEvent(GLOBAL_VIDEO_AUDIO_EVENT, {
      detail: { scopeId },
    })
  )
}

export const subscribeToVideoAudioFocus = (scopeId, onExternalFocus) => {
  if (typeof window === "undefined") return () => {}

  const handler = (event) => {
    const sourceScopeId = event?.detail?.scopeId
    if (!sourceScopeId || sourceScopeId === scopeId) return
    onExternalFocus(event)
  }

  window.addEventListener(GLOBAL_VIDEO_AUDIO_EVENT, handler)
  return () => window.removeEventListener(GLOBAL_VIDEO_AUDIO_EVENT, handler)
}

