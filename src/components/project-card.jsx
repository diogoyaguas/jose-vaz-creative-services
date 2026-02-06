import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ReactPlayer from "react-player"

const ProjectCard = ({ title, description, media, link }) => {
    const videoUrl = media?.video || null
    const imageUrl = media?.img || null

    console.log(imageUrl)

    return (
        <Link to={link} className="project-card">
            <div className="media">
                {videoUrl ? (
                    <ReactPlayer
                        className="react-player"
                        url={videoUrl}
                        playing={true}
                        loop={true}
                        muted={true}
                        controls={false}
                        width="101%"
                        height="100%"
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
            {link && (
                <span className="project-button">
                    Ver projeto
                </span>
            )}
        </Link>
    )
}

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    media: PropTypes.shape({
        img: PropTypes.object,
        video: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({ publicURL: PropTypes.string })
        ]),
    }),
    link: PropTypes.string,
}

ProjectCard.defaultProps = {
    description: "",
    media: null,
    link: null,
}

export default ProjectCard
