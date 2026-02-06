import React, { useEffect, useRef, useState } from "react"

import PropTypes from "prop-types"
import ReactPlayer from "react-player"

const GallerySection = ({ title, items = [], columns = 5 }) => {
  const gridRef = useRef(null)
  const [isScrollable, setIsScrollable] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const safeColumns = columns === 3 ? 3 : 5
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

  return (
    <section className="gallery-section container">
      <h2 className="gallery-title">{title}</h2>

      <div className={`gallery-grid-wrapper ${isScrollable ? "scrollable" : ""}`}>
        <div
          className={`gallery-grid cols-${safeColumns}`}
          ref={gridRef}
          onScroll={handleScroll}
        >
          {items.map((item, index) => {
            if (item?.img) {
              return (
                <img
                  key={index}
                  src={item.img}
                  alt=""
                  className="gallery-item"
                  loading="lazy"
                  decoding="async"
                />
              )
            }

            if (item?.video) {
              return (
                <ReactPlayer
                  key={index}
                  className="react-player gallery-item"
                  url={item.video}
                  playing
                  loop
                  muted
                  controls={false}
                  playsinline
                  width="100%"
                  height="100%"
                  config={{
                    file: {
                      attributes: {
                        disablePictureInPicture: true,
                        controlsList: "nodownload noplaybackrate",
                        preload: "metadata",
                      },
                    },
                  }}
                />
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
  items: [],
  columns: 5,
}

export default GallerySection
