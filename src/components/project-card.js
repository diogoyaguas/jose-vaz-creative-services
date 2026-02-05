import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import ReactPlayer from "react-player"

const ProjectCard = ({ title, description, media, link }) => {
    const isVideo = media?.video
    const isImage = media?.img

    return (
        <Link to={link} className="project-card">
            <div className="media">
                {isVideo ? (
                    <ReactPlayer
                        className="react-player"
                        url={media.video.publicURL || media.video}
                        playing={true}
                        loop={true}
                        muted={true}
                        controls={false}
                        width="101%"
                        height="100%"
                    />
                ) : isImage ? (
                    <GatsbyImage image={getImage(media.img)} alt={title} />
                ) : null}
            </div>
            <h3 className="project-title">{title}</h3>
            <p className="project-description">{description}</p>
            {link && (
                <a className="project-button" href={link} target="_blank" rel="noreferrer">
                    Ver projeto
                </a>
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
