import React, { useEffect, useRef, useState } from "react"

import Mute from "../assets/icons/common/mute.svg"
import PropTypes from "prop-types"
import ReactPlayer from "react-player"
import Unmute from "../assets/icons/common/unmute.svg"

const GallerySection = ({ title, subtitle, items = [], columns = 5 }) => {
  const gridRef = useRef(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [unmutedIndex, setUnmutedIndex] = useState(null)

  const safeColumns = columns ?? 5;
  const itemsPerPage = safeColumns
  const totalPages = Math.ceil(items.length / itemsPerPage)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const updateScrollable = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth + 1)
    }

    updateScrollable()
    window.addEventListener("resize", updateScrollable)
    return () => window.removeEventListener("resize", updateScrollable)
  }, [items.length, safeColumns])

  const handleScroll = () => {
    const el = gridRef.current
    if (!el) return

    const maxScrollLeft = el.scrollWidth - el.clientWidth
    if (maxScrollLeft <= 0) {
      setActiveIndex(0)
      return
    }

    const newIndex = Math.round((el.scrollLeft / maxScrollLeft) * (totalPages - 1))
    setActiveIndex(newIndex)
  }

  const scrollToPage = (index) => {
    const el = gridRef.current
    if (!el) return

    const pageWidth = el.clientWidth
    el.scrollTo({ left: index * pageWidth, behavior: "smooth" })
  }

  const toggleSound = (index) => {
    setUnmutedIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="gallery-section container">
      <div className="gallery-header">
        <h2 className="gallery-title">{title}</h2>
        {subtitle ? <h2 className="gallery-subtitle">{subtitle}</h2> : null}
      </div>

      <div className={`gallery-grid-wrapper ${isScrollable ? "scrollable" : ""}`}>
        <div
          className={`gallery-grid cols-${safeColumns}`}
          ref={gridRef}
          onScroll={handleScroll}
        >
          {items.map((item, index) => {
            if (item?.img) {
              return (
                <div key={index} className="gallery-item">
                  <img
                    src={item.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )
            }

            if (item?.video) {
              return (
                <div key={index} className="gallery-item">
                  <ReactPlayer
                    className="react-player"
                    url={item.video}
                    playing
                    loop
                    muted={unmutedIndex !== index}
                    controls={false}
                    playsinline
                    width="100%"
                    height="100%"
                  />

                  <button
                    type="button"
                    className="sound-toggle"
                    onClick={() => toggleSound(index)}
                    aria-label={unmutedIndex === index ? "Mute video" : "Unmute video"}
                  >
                    {unmutedIndex === index ? <Mute /> : <Unmute />}
                  </button>
                </div>
              )
            }

            return null
          })}
        </div>

        {isScrollable && totalPages > 1 && (
          <div className="carousel-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                className={`dot ${activeIndex === i ? "active" : ""}`}
                onClick={() => scrollToPage(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") scrollToPage(i)
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

GallerySection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      video: PropTypes.string,
    })
  ),
  columns: PropTypes.oneOf([3, 5]),
}

GallerySection.defaultProps = {
  title: "",
  subtitle: "",
  items: [],
  columns: 5,
}

export default GallerySection
