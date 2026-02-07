import * as React from "react"

import FlipbookSection from "../components/flipbook"
import GallerySection from "../components/gallery-section"
import HoverVideoGrid from "../components/hover-video-grid"
import Layout from "../components/layout"
import OrganicContentSection from "../components/organic-content-section"
import ProjectHeader from "../components/project-header"
import Seo from "../components/seo"
import TabbedImageSection from "../components/tabbed-image-section"
import { graphql } from "gatsby"

export default function ProjectTemplate({ data, pageContext }) {
  const project = data.project
  const other = data.other

  const sections = project?.content || []

  return (
    <Layout
      locale={pageContext.locale}
      translationKey={pageContext.translationKey}
      other={other}
      projectType="project"
    >
      <Seo title={project.seoTitle || project.title} />

      <ProjectHeader
        title={project.title}
        date={project.date}
        categories={project.categories}
        description={project.description}
        media={project.banner}
      />

      {sections.map((section, idx) => {
        switch (section.type) {
          case "gallery":
            return (
              <GallerySection
                key={idx}
                title={section.title}
                subtitle={section.subtitle}
                items={section.items || []}
                columns={section.columns}
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

          case "flipbook":
            return (
              <FlipbookSection
                key={idx}
                title={section.title}
                pages={section.items || []}
              />
            )

          default:
            return null
        }
      })}
    </Layout>
  )
}

export const query = graphql`
  query ProjectBySlug(
    $slug: String!
    $locale: String!
    $translationKey: String!
  ) {
    project(slug: { eq: $slug }, locale: { eq: $locale }) {
      slug
      locale
      translationKey
      seoTitle
      title
      date
      banner {
        img
        video
      }
      categories
      description
      content {
        type
        title
        subtitle
        columns
        items {
          img
          video
        }
        tabs {
          title
          items {
            img
            video
          }
        }
        imageTabs {
          label
          img
          alt
        }
      }
    }

    other: project(
      translationKey: { eq: $translationKey }
      locale: { ne: $locale }
    ) {
      slug
      locale
    }
  }
`
