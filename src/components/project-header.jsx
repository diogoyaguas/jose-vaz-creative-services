import React, { useCallback, useMemo, useRef, useState } from "react"

import Mute from "../assets/icons/common/mute.svg"
import PropTypes from "prop-types"
import Unmute from "../assets/icons/common/unmute.svg"

const sanitizeHtml = (html = "") => {
    return String(html)
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/\son\w+="[^"]*"/gi, "")
        .replace(/\son\w+='[^']*'/gi, "")
}

const ProjectHeader = ({ title, date, categories, description, media }) => {
    const videoUrl = media?.video || null
    const imageUrl = media?.img || null

    const videoRef = useRef(null)
    const [muted, setMuted] = useState(true)

    const safeDescriptionHtml = useMemo(
        () => sanitizeHtml(description),
        [description]
    )

    const toggleMute = useCallback((e) => {
        e.preventDefault()
        e.stopPropagation()

        setMuted((prev) => {
            const next = !prev
            const v = videoRef.current
            if (v) {
                v.muted = next
                if (!next) {
                    const p = v.play()
                    if (p && typeof p.catch === "function") p.catch(() => { })
                }
            }
            return next
        })
    }, [])

    return (
        <header className="project-header">
            {(videoUrl || imageUrl) && (
                <div className="project-header-media">
                    {videoUrl ? (
                        <div className="project-header-media">
                            <video
                                ref={videoRef}
                                className="project-header-video"
                                src={videoUrl}
                                autoPlay
                                loop
                                muted={muted}
                                playsInline
                                preload="metadata"
                            />

                            <button
                                type="button"
                                className="sound-toggle"
                                onClick={toggleMute}
                                aria-label={muted ? "Ativar som" : "Desativar som"}
                            >
                                {muted ? <Unmute /> : <Mute />}
                            </button>
                        </div>
                    ) : (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="project-header-image"
                            loading="eager"
                            decoding="async"
                        />
                    )}
                </div>
            )}

            <div className="project-header-content container">
                <h1 className="project-title">{title}</h1>

                <div className="project-meta row">
                    <div className="col-md-2 project-meta-block">
                        <span className="meta-value">{date}</span>
                    </div>

                    <div className="col-md-4 project-meta-block">
                        <ul className="project-categories">
                            {(categories || []).map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6 project-meta-block">
                        {safeDescriptionHtml ? (
                            <span
                                className="meta-value"
                                dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    )
}

ProjectHeader.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    media: PropTypes.shape({
        img: PropTypes.string,
        video: PropTypes.string,
    }),
}

ProjectHeader.defaultProps = {
    date: "",
    categories: [],
    description: "",
    media: null,
}

export default React.memo(ProjectHeader)
