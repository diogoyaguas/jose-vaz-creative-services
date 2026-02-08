import React, { useEffect, useMemo, useRef } from "react"

import { Link } from "gatsby"
import PropTypes from "prop-types"
import useInView from "../hooks/useInView"

const ProjectCard = ({ title, description, media, link }) => {
    const videoUrl = useMemo(() => {
        if (!media?.video) return null
        if (typeof media.video === "string") return media.video
        return media.video.publicURL || null
    }, [media])

    const imageUrl = useMemo(() => {
        if (!media?.img) return null
        if (typeof media.img === "string") return media.img
        return media.img.publicURL || null
    }, [media])

    const { ref, inView } = useInView()
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
        <Link to={link} className="project-card" ref={ref}>
            <div className="media">
                {videoUrl ? (
                    <video
                        ref={videoRef}
                        className="project-card-video"
                        src={videoUrl}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="project-card-image"
                        loading="lazy"
                        decoding="async"
                    />
                ) : null}
            </div>

            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>

            {link ? <span className="project-button">Ver projeto</span> : null}
        </Link>
    )
}

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    media: PropTypes.shape({
        img: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ publicURL: PropTypes.string })]),
        video: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ publicURL: PropTypes.string })]),
    }),
    link: PropTypes.string,
}

ProjectCard.defaultProps = {
    description: "",
    media: null,
    link: null,
}

export default React.memo(ProjectCard)
