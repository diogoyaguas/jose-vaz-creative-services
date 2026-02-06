import React, { useMemo, useState } from "react"

import PropTypes from "prop-types"

const TabbedImageSection = ({ title, subtitle, tabs, initialTab = 0 }) => {
  const tabArray = useMemo(
    () => (Array.isArray(tabs) ? tabs : []),
    [tabs]
  )

  const [activeTab, setActiveTab] = useState(
    Math.min(Math.max(initialTab, 0), tabArray.length - 1)
  )

  const active = tabArray[activeTab]
  const imageUrl = active?.img || ""

  return (
    <section className="tabbed-image-section container">
      <div className="header">
        <h2 className="title">{title}</h2>

        <div className="tabs" role="tablist">
          {tabArray.map((tab, index) => (
            <button
              key={tab.label || index}
              type="button"
              className={`tab ${index === activeTab ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={index === activeTab}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="media">
        {imageUrl ? (
          <>
            <img
              key={imageUrl}
              src={imageUrl}
              alt={active?.alt || ""}
              className="image is-active"
              loading="lazy"
              decoding="async"
            />
          </>
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
      img: PropTypes.string.isRequired,
      alt: PropTypes.string,
    })
  ).isRequired,
}

export default TabbedImageSection
