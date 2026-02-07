import React, { forwardRef, useMemo, useRef, useState } from "react"

import HTMLFlipBook from "react-pageflip"
import PropTypes from "prop-types"

const FlipbookPage = forwardRef(function FlipbookPage({ page }, ref) {
  return (
    <div className="flipbook-page" ref={ref}>
      <div className="flipbook-page-inner">
        <img
          src={page.img}
          alt={page.alt || ""}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
})

const FlipbookSection = ({
  title,
  subtitle,
  pages = [],
  width = 420,
  height = 560,
  showCover = false,
}) => {
  const bookRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0)

  const safePages = useMemo(
    () => pages.filter((p) => p && p.img),
    [pages]
  )

  const total = safePages.length

  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev()
  const goNext = () => bookRef.current?.pageFlip()?.flipNext()

  const onFlip = (e) => {
    const nextIndex = typeof e?.data === "number" ? e.data : 0
    setPageIndex(nextIndex)
  }

  return (
    <section className="flipbook-section container">
      {(title || subtitle) && (
        <div className="flipbook-header">
          {title ? <h2 className="flipbook-title">{title}</h2> : null}
          {subtitle ? <h2 className="flipbook-subtitle">{subtitle}</h2> : null}
        </div>
      )}

      <div className="flipbook-wrapper">
        <button
          type="button"
          className="flipbook-nav flipbook-prev"
          onClick={goPrev}
          aria-label="Anterior"
          disabled={total === 0}
        >
          ‹
        </button>

        <div className="flipbook-book">
          <HTMLFlipBook
            ref={bookRef}
            width={width}
            height={height}
            size="stretch"
            minWidth={280}
            maxWidth={900}
            minHeight={360}
            maxHeight={1200}
            maxShadowOpacity={0.25}
            showCover={showCover}
            mobileScrollSupport={true}
            onFlip={onFlip}
            className="flipbook"
          >
            {safePages.map((page, idx) => (
              <FlipbookPage key={idx} page={page} />
            ))}
          </HTMLFlipBook>
        </div>

        <button
          type="button"
          className="flipbook-nav flipbook-next"
          onClick={goNext}
          aria-label="Seguinte"
          disabled={total === 0}
        >
          ›
        </button>
      </div>

      {total > 0 && (
        <div className="flipbook-footer">
          <span className="flipbook-counter">
            {Math.min(pageIndex + 1, total)} / {total}
          </span>
        </div>
      )}
    </section>
  )
}

FlipbookSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
    })
  ),
  width: PropTypes.number,
  height: PropTypes.number,
  showCover: PropTypes.bool,
}

FlipbookSection.defaultProps = {
  title: "",
  subtitle: "",
  pages: [],
  width: 420,
  height: 595,
  showCover: true,
}

export default FlipbookSection
