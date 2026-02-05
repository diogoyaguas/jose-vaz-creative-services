import { GatsbyImage, getImage } from "gatsby-plugin-image"

import PropTypes from "prop-types"
import React from "react"
import ReactPlayer from "react-player"

const ProjectHeader = ({ title, date, categories, description, media }) => {
    const hasVideo = media?.video
    const hasImage = media?.img

    return (
        <header className="project-header">
            {(hasVideo || hasImage) && (
                <div className="project-header-media">
                    {hasVideo && (
                        <ReactPlayer
                            url={media.video}
                            playing
                            loop
                            muted
                            controls={false}
                            playsinline
                            width="100%"
                            height="100%"
                        />
                    )}

                    {hasImage && (
                        <GatsbyImage
                            image={getImage(media.img)}
                            alt={title}
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
                            {categories?.map((category, index) => (
                                <li key={index}>{category}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6 project-meta-block">
                        <span className="meta-value">{description}</span>
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
        img: PropTypes.object,
        video: PropTypes.string,
    }),
}

ProjectHeader.defaultProps = {
    date: "",
    categories: [],
    description: "",
    media: null,
}

export default ProjectHeader
