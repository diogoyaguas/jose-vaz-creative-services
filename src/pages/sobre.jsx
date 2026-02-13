import * as React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Seo from "../components/seo"

const containerVariants = {
  hidden: {},
  show: {},
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

const rightColVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const rightPartVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
}

const ensureLeadingSlash = (p = "") => (p.startsWith("/") ? p : `/${p}`)

const Sobre = ({ data }) => {
  const about = data.allAbout.nodes[0]

  return (
    <Layout locale="pt" otherPath="/en/about">
      <Seo
        title="Sobre"
        pathname="/sobre"
        locale="pt"
        otherPath="/en/about"
      />

      <section className="about-page container">
        <motion.section
          className="top-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div className="left-col" variants={itemVariants}>
            <img
              className="profile-photo"
              src={ensureLeadingSlash(about.profile.photo)}
              alt="Foto de perfil"
            />
          </motion.div>

          <motion.div className="right-col" variants={rightColVariants}>
            <motion.p
              className="title-text"
              variants={rightPartVariants}
              dangerouslySetInnerHTML={{ __html: about.profile.titleText || "" }}
            />
            <motion.p className="sub-text" variants={rightPartVariants}>
              {about.profile.subtitleText}
            </motion.p>

            <motion.a
              className="cv-download-btn"
              variants={rightPartVariants}
              href="/Jos%C3%A9-Vaz-CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              Download CV
            </motion.a>

            <motion.section
              className="about-section"
              variants={rightPartVariants}
            >
              <h2 className="about-section-title">clientes</h2>
              <div className="clients-grid">
                {(about.clientsByYear || []).map((entry) => (
                  <article className="year-block" key={entry.year}>
                    <p className="year-label">{entry.year}</p>
                    <ul className="about-list">
                      {(entry.clients || []).map((client) => (
                        <li key={`${entry.year}-${client}`}>{client}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="about-section"
              variants={rightPartVariants}
            >
              <h2 className="about-section-title">software</h2>
              <ul className="about-list">
                {(about.skills || []).map((skill) => (
                  <li className="skill-row" key={skill.name}>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-track">
                      <span className="skill-fill" style={{ width: `${skill.percent}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              className="about-section"
              variants={rightPartVariants}
            >
              <h2 className="about-section-title">skills</h2>
              <ul className="about-list">
                {(about.software || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.section>
          </motion.div>
        </motion.section>
      </section>
    </Layout>
  )
}

Sobre.propTypes = {
  data: PropTypes.shape({
    allAbout: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          locale: PropTypes.string.isRequired,
          profile: PropTypes.shape({
            photo: PropTypes.string.isRequired,
            titleText: PropTypes.string.isRequired,
            subtitleText: PropTypes.string.isRequired,
          }).isRequired,
          clientsByYear: PropTypes.arrayOf(
            PropTypes.shape({
              year: PropTypes.string.isRequired,
              clients: PropTypes.arrayOf(PropTypes.string).isRequired,
            })
          ).isRequired,
          software: PropTypes.arrayOf(PropTypes.string).isRequired,
          skills: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              percent: PropTypes.number.isRequired,
            })
          ).isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export const query = graphql`
  query AboutPagePT {
    allAbout(filter: { locale: { eq: "pt" } }) {
      nodes {
        locale
        profile {
          photo
          titleText
          subtitleText
        }
        clientsByYear {
          year
          clients
        }
        software
        skills {
          name
          percent
        }
      }
    }
  }
`

export default Sobre
