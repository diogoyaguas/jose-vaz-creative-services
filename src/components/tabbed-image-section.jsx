import React, { useMemo, useState } from "react"

import PropTypes from "prop-types"

const TabbedImageSection = ({ title, tabs, initialTab = 0 }) => {
  const tabArray = useMemo(
    () => (Array.isArray(tabs) ? tabs : tabs ? [tabs] : []),
    [tabs]
  )

  const [activeTab, setActiveTab] = useState(
    Math.min(Math.max(initialTab, 0), Math.max(tabArray.length - 1, 0))
  )

  const active = tabArray[activeTab] || null
  const imageUrl = active?.img || ""

  return (
    <section className="tabbed-image-section container">
      <div className="header">
        <h2 className="title">{title}</h2>

        <div className="tabs" role="tablist" aria-label={title}>
          {tabArray.map((tab, index) => (
            <button
              key={tab.id || tab.label || index}
              type="button"
              className={`tab ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
              role="tab"
              aria-selected={activeTab === index}
              tabIndex={activeTab === index ? 0 : -1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="media">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={active?.alt || ""}
            className="image"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="placeholder" />
        )}
      </div>
    </section>
  )
}

TabbedImageSection.propTypes = {
  title: PropTypes.string.isRequired,
  initialTab: PropTypes.number,
  tabs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        alt: PropTypes.string,
      })
    ),
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }),
  ]).isRequired,
}

export default TabbedImageSection
