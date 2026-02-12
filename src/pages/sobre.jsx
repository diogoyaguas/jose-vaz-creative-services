import * as React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { motion } from "framer-motion"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SliderRow from "../components/slider-row"

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
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

          <motion.div className="right-col" variants={itemVariants}>
            <p
              className="title-text"
              dangerouslySetInnerHTML={{ __html: about.profile.titleText || "" }}
            />
            <p className="sub-text">{about.profile.subtitleText}</p>
          </motion.div>
        </motion.section>

        <section className="tabs-section">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <SliderRow
              id="about-slider-track"
              clientsByYear={about.clientsByYear || []}
              software={about.software || []}
              skills={about.skills || []}
            />
          </motion.div>
        </section>
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
          skills: PropTypes.arrayOf(PropTypes.string).isRequired,
          experience: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              text: PropTypes.string.isRequired,
            })
          ).isRequired,
          cv: PropTypes.shape({
            file: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
          }),
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
        skills
        experience {
          title
          date
          text
        }
        cv {
          file
          label
        }
      }
    }
  }
`

export default Sobre
