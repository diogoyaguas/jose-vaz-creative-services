/* global window */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./src/styles/index.scss"

const forceScrollTop = () => {
  if (typeof window === "undefined") return

  const root = window.document?.documentElement
  const body = window.document?.body

  if (root) root.scrollTop = 0
  if (body) body.scrollTop = 0
  window.scrollTo(0, 0)
}

export const onInitialClientRender = () => {
  if (typeof window === "undefined") return
  window.history.scrollRestoration = "manual"
  forceScrollTop()
}

export const shouldUpdateScroll = () => false

export const onPreRouteUpdate = () => {
  forceScrollTop()
}

export const onRouteUpdate = () => {
  forceScrollTop()

  if (typeof window === "undefined") return

  window.requestAnimationFrame(() => {
    forceScrollTop()
    window.requestAnimationFrame(() => {
      forceScrollTop()
    })
  })
}
