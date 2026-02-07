import React, { useEffect, useMemo, useRef, useState } from "react"

import Mute from "../assets/icons/common/mute.svg"
import PropTypes from "prop-types"
import Unmute from "../assets/icons/common/unmute.svg"
import useInView from "../hooks/useInView"

const GalleryVideoItem = ({ src, muted, onToggleSound }) => {
  const { ref, inView } = useInView({ rootMargin: "250px", threshold: 0.15 })
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (inView) {
      const p = v.play()
      if (p && typeof p.catch === "function") p.catch(() => {})
    } else {
      v.pause()
    }
  }, [inView])

  return (
    <div ref={ref} className="gallery-item">
      <video
        ref={videoRef}
        className="gallery-video"
        src={src}
        loop
        muted={muted}
        playsInline
        preload="metadata"
        controls={false}
      />

      <button
        type="button"
        className="sound-toggle"
        onClick={onToggleSound}
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <Unmute /> : <Mute />}
      </button>
    </div>
  )
}

GalleryVideoItem.propTypes = {
  src: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
  onToggleSound: PropTypes.func.isRequired,
}

const GallerySection = ({ title, subtitle, items = [], columns = 5 }) => {
  const gridRef = useRef(null)
  const rafRef = useRef(null)

  const [isScrollable, setIsScrollable] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [unmutedIndex, setUnmutedIndex] = useState(null)
  const [itemsPerPage, setItemsPerPage] = useState(columns ?? 5)

  const safeColumns = columns ?? 5

  const totalPages = useMemo(() => {
    const perPage = Math.max(1, itemsPerPage || 1)
    return Math.ceil(items.length / perPage)
  }, [items.length, itemsPerPage])

  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const computeLayout = () => {
      const child = el.querySelector(".gallery-item")
      const childWidth = child?.getBoundingClientRect()?.width || 0
      const containerWidth = el.clientWidth || 0

      const computedPerPage =
        childWidth > 0 && containerWidth > 0
          ? Math.max(1, Math.round(containerWidth / childWidth))
          : safeColumns

      setItemsPerPage(computedPerPage)
      setIsScrollable(el.scrollWidth > el.clientWidth + 1)
    }

    computeLayout()

    const onResize = () => computeLayout()
    window.addEventListener("resize", onResize)

    let ro
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => computeLayout())
      ro.observe(el)
    }

    return () => {
      window.removeEventListener("resize", onResize)
      if (ro) ro.disconnect()
    }
  }, [items.length, safeColumns])

  useEffect(() => {
    setActiveIndex(0)
  }, [itemsPerPage, items.length])

  const handleScroll = () => {
    const el = gridRef.current
    if (!el) return

    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null

      const maxScrollLeft = el.scrollWidth - el.clientWidth
      if (maxScrollLeft <= 0) {
        if (activeIndex !== 0) setActiveIndex(0)
        return
      }

      const newIndex = Math.round((el.scrollLeft / maxScrollLeft) * (totalPages - 1))
      if (newIndex !== activeIndex) setActiveIndex(newIndex)
    })
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
                  <img src={item.img} alt="" loading="lazy" decoding="async" />
                </div>
              )
            }

            if (item?.video) {
              return (
                <GalleryVideoItem
                  key={index}
                  src={item.video}
                  muted={unmutedIndex !== index}
                  onToggleSound={() => toggleSound(index)}
                />
              )
            }

            return null
          })}
        </div>

        {isScrollable && totalPages > 1 && (
          <div className="carousel-dots" role="navigation" aria-label="Paginação da galeria">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dot ${activeIndex === i ? "active" : ""}`}
                onClick={() => scrollToPage(i)}
                aria-label={`Ir para a página ${i + 1} de ${totalPages}`}
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
  columns: PropTypes.oneOf([3, 4, 5]),
}

GallerySection.defaultProps = {
  title: "",
  subtitle: "",
  items: [],
  columns: 5,
}

export default GallerySection
