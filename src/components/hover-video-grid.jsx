import React, { useMemo, useState } from "react"

import PropTypes from "prop-types"
import ReactPlayer from "react-player"

const HoverVideoGrid = ({ title, subtitle, items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const normalized = useMemo(() => {
    return (items || []).slice(0, 4).map((it) => ({
      img: it?.img || null,
      video: it?.video || null,
      alt: it?.alt || "",
      label: it?.label || "",
    }))
  }, [items])

  return (
    <section className="hover-video-grid container">
      <div className="header">
        <h2 className="title">{title}</h2>
        {subtitle ? <h2 className="subtitle">{subtitle}</h2> : null}
      </div>

      <div className="grid">
        {normalized.map((item, index) => {
          const isHovered = hoveredIndex === index
          const hasVideo = Boolean(item.video)

          return (
            <div
              key={index}
              className="cell"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              tabIndex={0}
              role="button"
              aria-label={item.label || `Item ${index + 1}`}
            >
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.alt}
                  className={`media image ${
                    isHovered && hasVideo ? "fade-out" : "fade-in"
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="placeholder" />
              )}

              {hasVideo ? (
                <div className={`media video ${isHovered ? "fade-in" : "fade-out"}`}>
                  <ReactPlayer
                    url={item.video}
                    playing={isHovered}
                    loop
                    muted
                    controls={false}
                    playsInline
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}

HoverVideoGrid.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      video: PropTypes.string,
      alt: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
}

HoverVideoGrid.defaultProps = {
  subtitle: "",
}

export default HoverVideoGrid
