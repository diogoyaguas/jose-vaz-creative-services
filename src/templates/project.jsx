import * as React from "react"

import GallerySection from "../components/gallery-section"
import HoverVideoGrid from "../components/hover-video-grid"
import Layout from "../components/layout"
import OrganicContentSection from "../components/organic-content-section"
import ProjectHeader from "../components/project-header"
import Seo from "../components/seo"
import TabbedImageSection from "../components/tabbed-image-section"
import { graphql } from "gatsby"

export default function ProjectTemplate({ data }) {
  const project = data.project
  const sections = project?.content || []

  const renderSection = (section, idx) => {
    switch (section.type) {
      case "gallery":
        return (
          <GallerySection
            key={idx}
            title={section.title}
            items={section.items || []}
          />
        )

      case "organicTabs":
        return (
          <OrganicContentSection
            key={idx}
            tabs={section.tabs || []}
          />
        )

      case "hoverVideo":
        return (
          <HoverVideoGrid
            key={idx}
            title={section.title}
            subtitle={section.subtitle}
            items={section.items || []}
          />
        )

      case "tabbedImage":
        return (
          <TabbedImageSection
            key={idx}
            title={section.title}
            tabs={section.imageTabs || []}
          />
        )

      default:
        return null
    }
  }

  return (
    <Layout>
      <Seo title={project.seoTitle || project.title} />

      <ProjectHeader
        title={project.title}
        date={project.date}
        categories={project.categories}
        description={project.description}
        media={project.banner}
      />

      {sections.map(renderSection)}
    </Layout>
  )
}

export const query = graphql`
  query ProjectBySlug($slug: String!) {
    project(slug: { eq: $slug }) {
      slug
      seoTitle
      title
      date
      banner { img video }
      categories
      description
      content {
        type
        title
        subtitle
        items { img video }
        tabs {
          title
          items { img video }
        }
        imageTabs {
          label
          img
          alt
        }
      }
    }
  }
`
