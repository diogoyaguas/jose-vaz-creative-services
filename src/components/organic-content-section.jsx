import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import Mute from "../assets/icons/common/mute.svg"
import Unmute from "../assets/icons/common/unmute.svg"
import useInView from "../hooks/useInView"

import GallerySection from "./gallery-section"

const OrganicVideoItem = React.memo(function OrganicVideoItem({
  src,
  isMuted,
  onToggleSound,
}) {
  const { ref, inView } = useInView({ rootMargin: "250px", threshold: 0.15 })
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    if (inView) {
      const p = v.play()
      if (p && typeof p.catch === "function") p.catch(() => { })
    } else {
      v.pause()
    }
  }, [inView])

  return (
    <div ref={ref} className="main-image">
      <video
        ref={videoRef}
        className="organic-video"
        src={src}
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <track kind="captions" />
      </video>

      <button
        className="sound-toggle"
        onClick={onToggleSound}
        aria-label={isMuted ? "Ativar som do vídeo" : "Desativar som do vídeo"}
        type="button"
      >
        {isMuted ? <Unmute /> : <Mute />}
      </button>
    </div>
  )
})

OrganicVideoItem.propTypes = {
  src: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  onToggleSound: PropTypes.func.isRequired,
}

const OrganicImageItem = React.memo(function OrganicImageItem({ image, alt }) {
  const gImg = getImage(image)
  if (!gImg) return null

  return (
    <div className="main-image">
      <GatsbyImage image={gImg} alt={alt || ""} className="organic-image" />
    </div>
  )
})

OrganicImageItem.propTypes = {
  image: PropTypes.any.isRequired,
  alt: PropTypes.string,
}

OrganicImageItem.defaultProps = {
  alt: "",
}

const OrganicContentSection = ({ title, tabs }) => {
  const tabArray = useMemo(() => {
    if (!tabs) return []
    return Array.isArray(tabs) ? tabs : [tabs]
  }, [tabs])

  const [activeTab, setActiveTab] = useState(0)
  const [unmutedIndex, setUnmutedIndex] = useState(null)
  const [direction, setDirection] = useState(1)

  const itemsPerPage = 10
  const reduceMotion = useReducedMotion()

  const activeItems = useMemo(() => {
    const tab = tabArray[activeTab]
    return tab?.items ? tab.items.slice(0, itemsPerPage) : []
  }, [tabArray, activeTab])

  const firstFive = useMemo(() => activeItems.slice(0, 5), [activeItems])
  const secondFive = useMemo(() => activeItems.slice(5, 10), [activeItems])

  const onTabSelect = useCallback(
    (index) => {
      if (index === activeTab) return
      setDirection(index > activeTab ? 1 : -1)
      setActiveTab(index)
      setUnmutedIndex(null)
    },
    [activeTab]
  )

  const toggleSound = useCallback((index) => {
    setUnmutedIndex((prev) => (prev === index ? null : index))
  }, [])

  if (tabArray.length === 0) return null

  const variants = reduceMotion
    ? {
      initial: { opacity: 1, x: 0 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 1, x: 0 },
    }
    : {
      initial: (dir) => ({ opacity: 0, x: dir * 18 }),
      animate: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } },
      exit: (dir) => ({ opacity: 0, x: dir * -18, transition: { duration: 0.18, ease: "easeIn" } }),
    }

  return (
    <div className="organic-content-section container">
      <div className="titles" role="tablist" aria-label="Conteúdo orgânico">
        <div className="title">{title}</div>
        {tabArray.map((tab, index) => {
          const isActive = activeTab === index
          return (
            <button
              key={tab.title || index}
              type="button"
              className={`title-btn ${isActive ? "active" : ""}`}
              onClick={() => onTabSelect(index)}
              role="tab"
              aria-selected={isActive}
            >
              {tab.title}
            </button>
          )
        })}
      </div>

      <div className="main-images">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeTab}
            className="tab-grid"
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeItems.map((item, index) => {
              if (item?.imgFile) {
                return (
                  <OrganicImageItem
                    key={item.id || index}
                    image={item.imgFile}
                    alt={item.alt}
                  />
                )
              }

              if (item?.video) {
                return (
                  <OrganicVideoItem
                    key={item.id || index}
                    src={item.video}
                    isMuted={unmutedIndex !== index}
                    onToggleSound={() => toggleSound(index)}
                  />
                )
              }

              return null
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mobile-carousels">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <GallerySection title="" subtitle="" items={firstFive} columns={5} />
            <GallerySection title="" subtitle="" items={secondFive} columns={5} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

OrganicContentSection.propTypes = {
  title: PropTypes.string,
  tabs: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            alt: PropTypes.string,
            image: PropTypes.any,
            imgFile: PropTypes.any,
            video: PropTypes.string,
          })
        ),
      })
    ),
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.array,
    }),
  ]),
}

OrganicContentSection.defaultProps = {
  tabs: [],
}

export default React.memo(OrganicContentSection)
