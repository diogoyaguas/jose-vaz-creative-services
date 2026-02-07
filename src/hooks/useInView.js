import { useEffect, useRef, useState } from "react"

export default function useInView(
  options = { root: null, rootMargin: "200px", threshold: 0.1 }
) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
    }, options)

    obs.observe(el)

    return () => {
      obs.disconnect()
    }
  }, [options])

  return { ref, inView }
}
