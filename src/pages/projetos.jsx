import * as React from "react"

import Layout from "../components/layout"
import ProjectCard from "../components/project-card"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import { motion } from "framer-motion"

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
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
}

const Projects = ({ data }) => {
  const projects = data.allProject.nodes

  return (
    <Layout locale="pt" otherPath="/en/projects">
      <Seo title="Projetos" />

      <motion.div
        className="projects-page row"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.div
            key={`${project.slug}-pt`}
            className="col-xl-4 col-lg-6 col-md-6 mb-5"
            variants={itemVariants}
          >
            <ProjectCard
              media={project.cardMedia}
              title={project.title}
              description={project.smallDescription}
              link={`/projetos/${project.slug}`}
            />
          </motion.div>
        ))}
      </motion.div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsPagePT {
    allProject(sort: { index: ASC }, filter: { locale: { eq: "pt" } }) {
      nodes {
        slug
        title
        smallDescription
        cardMedia {
          img
          video
        }
      }
    }
  }
`

export default Projects
