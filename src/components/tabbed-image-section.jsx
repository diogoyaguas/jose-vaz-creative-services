import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useMemo, useState } from "react"
import PropTypes from "prop-types"

const TabbedImageSection = ({ title, subtitle, tabs, initialTab = 0 }) => {
  const tabArray = useMemo(() => (Array.isArray(tabs) ? tabs : []), [tabs])

  const [activeTab, setActiveTab] = useState(() => {
    if (tabArray.length === 0) return 0
    return Math.min(Math.max(initialTab, 0), tabArray.length - 1)
  })

  const active = tabArray[activeTab]

  const gatsbyImage = useMemo(() => {
    if (!active?.imgFile) return null
    return getImage(active.imgFile)
  }, [active])

  const imageUrl = active?.img || ""
  const alt = active?.alt || ""

  return (
    <section className="tabbed-image-section container">
      <div className="header">
        <h2 className="title">{title}</h2>

        <div className="tabs" role="tablist">
          {tabArray.map((tab, index) => {
            const isActive = index === activeTab
            return (
              <button
                key={tab.label || index}
                type="button"
                className={`tab ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
                role="tab"
                aria-selected={isActive}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="media">
        {gatsbyImage ? (
          <GatsbyImage
            key={activeTab}
            image={gatsbyImage}
            alt={alt}
            className="image is-active"
            loading="lazy"
          />
        ) : imageUrl ? (
          <img
            key={imageUrl}
            src={imageUrl}
            alt={alt}
            className="image is-active"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="placeholder" />
        )}
      </div>

      {subtitle && <p className="subtitle">{subtitle}</p>}
    </section>
  )
}

TabbedImageSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  initialTab: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      img: PropTypes.string,
      imgFile: PropTypes.any,

      alt: PropTypes.string,
    })
  ).isRequired,
}

export default TabbedImageSection
