import * as React from "react"
import PropTypes from "prop-types"
import { motion } from "framer-motion"

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

const chunk = (arr = [], size = 1) => {
  if (!arr.length || size <= 0) return []
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

const listToColumns = (items = [], maxPerColumn = 4) => {
  if (!items.length) return []
  const desiredColumns = Math.min(3, Math.max(1, Math.ceil(items.length / maxPerColumn)))
  return chunk(items, Math.ceil(items.length / desiredColumns)).map((group, idx) => ({
    year: idx === 0 ? "" : "",
    items: group,
  }))
}

function SliderRow({ id, clientsByYear, software, skills }) {
  const trackRef = React.useRef(null)
  const sectionRefs = React.useRef([])
  const [sectionRatios, setSectionRatios] = React.useState({})
  const [hasLeftOverflow, setHasLeftOverflow] = React.useState(false)
  const [hasRightOverflow, setHasRightOverflow] = React.useState(false)

  const sections = React.useMemo(
    () => [
      {
        id: "clientes",
        title: "clientes",
        columns: (clientsByYear || []).map((entry) => ({ year: entry.year, items: entry.clients || [] })),
      },
      {
        id: "softwares",
        title: "softwares",
        columns: listToColumns(software || []),
      },
      {
        id: "skills",
        title: "skills",
        columns: listToColumns(skills || []),
      },
    ],
    [clientsByYear, software, skills]
  )

  React.useEffect(() => {
    const root = trackRef.current
    if (!root) return undefined

    sectionRefs.current = sectionRefs.current.slice(0, sections.length)
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20)

    const observer = new IntersectionObserver(
      (entries) => {
        setSectionRatios((prev) => {
          const next = { ...prev }
          entries.forEach((entry) => {
            const idx = Number(entry.target.getAttribute("data-index"))
            next[idx] = entry.intersectionRatio
          })
          return next
        })
      },
      { root, threshold: thresholds }
    )

    sectionRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [sections.length])

  const updateOverflowState = React.useCallback((el) => {
    if (!el) return
    const left = el.scrollLeft > 2
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 2
    setHasLeftOverflow(left)
    setHasRightOverflow(right)
  }, [])

  React.useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined

    updateOverflowState(el)
    const onResize = () => updateOverflowState(el)

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [sections.length, updateOverflowState])

  const onWheelTrack = (e) => {
    const el = trackRef.current
    if (!el) return
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      el.scrollBy({ left: e.deltaY, behavior: "smooth" })
    }
  }

  return (
    <section id={id} className="slider-row">
      <div
        className={`slider-viewport ${hasLeftOverflow ? "has-left-overflow" : ""} ${hasRightOverflow ? "has-right-overflow" : ""}`}
      >
        <div
          ref={trackRef}
          className="section-track"
          onWheel={onWheelTrack}
          onScroll={(e) => updateOverflowState(e.currentTarget)}
        >
        {sections.map((section, sectionIndex) => (
          <motion.article
            key={section.id}
            className="section-slide"
            variants={itemVariants}
            ref={(el) => {
              sectionRefs.current[sectionIndex] = el
            }}
            data-index={sectionIndex}
            style={{ opacity: 0.2 + Math.min(sectionRatios[sectionIndex] || 0, 1) * 0.8 }}
          >
            <h2 className="section-title">{section.title}</h2>

            <div className="section-columns">
              {section.columns.map((column, idx) => (
                <div className="row-column" key={`${section.id}-${idx}`}>
                  {column.year ? <p className="row-year">{column.year}</p> : <p className="row-year is-blank">.</p>}
                  <ul className="row-list">
                    {column.items.map((item) => (
                      <li key={`${section.id}-${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
        </div>
      </div>
    </section>
  )
}

SliderRow.propTypes = {
  id: PropTypes.string.isRequired,
  clientsByYear: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string.isRequired,
      clients: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  software: PropTypes.arrayOf(PropTypes.string).isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default SliderRow
