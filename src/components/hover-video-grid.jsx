import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import PropTypes from "prop-types"

const HoverVideoCell = React.memo(function HoverVideoCell({
  item,
  index,
  isActive,
  onActivate,
  onDeactivate,
}) {
  const videoRef = useRef(null)
  const hasVideo = Boolean(item.video)

  const gatsbyImage = useMemo(() => {
    if (!item?.imgFile) return null
    return (
      getImage(item.imgFile) ||
      getImage(item.imgFile?.childImageSharp?.gatsbyImageData) ||
      null
    )
  }, [item?.imgFile])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (isActive) {
      const p = v.play()
      if (p && typeof p.catch === "function") p.catch(() => { })
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [isActive])

  return (
    <button
      type="button"
      className="cell"
      onMouseEnter={() => onActivate(index)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(index)}
      onBlur={onDeactivate}
      aria-label={item.label || `Item ${index + 1}`}
    >
      {gatsbyImage ? (
        <GatsbyImage
          image={gatsbyImage}
          alt={item.alt || ""}
          className={`media image ${isActive && hasVideo ? "fade-out" : "fade-in"
            }`}
          loading="lazy"
        />
      ) : item.img ? (
        <img
          src={item.img}
          alt={item.alt || ""}
          className={`media image ${isActive && hasVideo ? "fade-out" : "fade-in"
            }`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="placeholder" />
      )}

      {hasVideo ? (
        <div className={`media video ${isActive ? "fade-in" : "fade-out"}`}>
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="hover-video"
            aria-hidden="true"
          >
            <track kind="captions" />
          </video>
        </div>
      ) : null}
    </button>
  )
})

HoverVideoCell.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string,
    imgFile: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    video: PropTypes.string,
    alt: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
}

const HoverVideoGrid = ({ title, subtitle, items }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const normalized = useMemo(() => {
    return (items || []).slice(0, 4).map((it) => ({
      img: it?.img || null,
      imgFile: it?.imgFile || null,
      video: it?.video || null,
      alt: it?.alt || "",
      label: it?.label || "",
    }))
  }, [items])

  const onActivate = useCallback((index) => setActiveIndex(index), [])
  const onDeactivate = useCallback(() => setActiveIndex(null), [])

  return (
    <section className="hover-video-grid container">
      <div className="header">
        <h2 className="title">{title}</h2>
        {subtitle ? <h2 className="subtitle">{subtitle}</h2> : null}
      </div>

      <div className="grid">
        {normalized.map((item, index) => (
          <HoverVideoCell
            key={index}
            item={item}
            index={index}
            isActive={activeIndex === index}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
          />
        ))}
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
      imgFile: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      video: PropTypes.string,
      alt: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
}

HoverVideoGrid.defaultProps = {
  subtitle: "",
}

export default React.memo(HoverVideoGrid)
