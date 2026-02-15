import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useEffect, useMemo, useRef } from "react"
import PropTypes from "prop-types"

import useInView from "../hooks/useInView"

const MediaGridVideoItem = React.memo(function MediaGridVideoItem({ src }) {
  const { ref, inView } = useInView({ rootMargin: "250px", threshold: 0.15 })
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (inView) {
      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {})
      }
      return
    }

    video.pause()
  }, [inView])

  return (
    <div ref={ref} className="media-grid-5x4-item">
      <video
        ref={videoRef}
        className="media-grid-5x4-media"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <track kind="captions" />
      </video>
    </div>
  )
})

MediaGridVideoItem.propTypes = {
  src: PropTypes.string.isRequired,
}

const MediaGrid5x4 = ({ title, subtitle, items = [] }) => {
  const visibleItems = useMemo(() => items.slice(0, 20), [items])

  return (
    <section className="media-grid-5x4 container">
      <div className="media-grid-5x4-header">
        {title ? <h2 className="media-grid-5x4-title">{title}</h2> : null}
        {subtitle ? <h2 className="media-grid-5x4-subtitle">{subtitle}</h2> : null}
      </div>

      <div className="media-grid-5x4-grid">
        {visibleItems.map((item, index) => {
          if (item?.video) {
            return <MediaGridVideoItem key={index} src={item.video} />
          }

          const gatsbyImage = getImage(item?.imgFile)
          if (gatsbyImage) {
            return (
              <div key={index} className="media-grid-5x4-item">
                <GatsbyImage
                  image={gatsbyImage}
                  alt={item?.alt || ""}
                  className="media-grid-5x4-media"
                  loading="lazy"
                />
              </div>
            )
          }

          if (typeof item?.img === "string" && item.img) {
            return (
              <div key={index} className="media-grid-5x4-item">
                <img
                  src={item.img}
                  alt={item?.alt || ""}
                  className="media-grid-5x4-media"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </section>
  )
}

MediaGrid5x4.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      imgFile: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      video: PropTypes.string,
      alt: PropTypes.string,
    })
  ),
}

MediaGrid5x4.defaultProps = {
  title: "",
  subtitle: "",
  items: [],
}

export default React.memo(MediaGrid5x4)
