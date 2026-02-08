import * as React from "react"

import FlipbookSection from "../components/flipbook"
import GallerySection from "../components/gallery-section"
import HoverVideoGrid from "../components/hover-video-grid"
import Layout from "../components/layout"
import OrganicContentSection from "../components/organic-content-section"
import ProjectHeader from "../components/project-header"
import Reveal from "../components/reveal"
import Seo from "../components/seo"
import TabbedImageSection from "../components/tabbed-image-section"
import { graphql } from "gatsby"

export default function ProjectTemplate({ data, pageContext }) {
  const project = data.project
  const other = data.other
  const sections = project?.content || []

  const renderSection = (section, idx) => {
    switch (section.type) {
      case "gallery":
        return (
          <Reveal key={idx}>
            <GallerySection
              title={section.title}
              subtitle={section.subtitle}
              items={section.items || []}
              columns={section.columns}
            />
          </Reveal>
        )

      case "organicTabs":
        return (
          <Reveal key={idx}>
            <OrganicContentSection tabs={section.tabs || []} />
          </Reveal>
        )

      case "hoverVideo":
        return (
          <Reveal key={idx}>
            <HoverVideoGrid
              title={section.title}
              subtitle={section.subtitle}
              items={section.items || []}
            />
          </Reveal>
        )

      case "tabbedImage":
        return (
          <Reveal key={idx}>
            <TabbedImageSection title={section.title} tabs={section.imageTabs || []} />
          </Reveal>
        )

      case "flipbook":
        return (
          <Reveal key={idx}>
            <FlipbookSection title={section.title} pages={section.items || []} />
          </Reveal>
        )

      default:
        return null
    }
  }

  return (
    <Layout
      locale={pageContext.locale}
      other={other}
      projectType="project"
      translationKey={pageContext.translationKey}
    >
      <Seo
        title={project.seoTitle || project.title}
        description={project.seoDescription}
        locale={project.locale}
        image={project.cardMedia.img} />

      <Reveal delay={0.05}>
        <ProjectHeader
          title={project.title}
          date={project.date}
          categories={project.categories}
          description={project.description}
          media={project.banner}
        />
      </Reveal>

      {sections.map(renderSection)}
    </Layout>
  )
}

export const query = graphql`
  query ProjectBySlug($slug: String!, $locale: String!, $translationKey: String!) {
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
      cardMedia {
        img
        video
      }
      categories
      seoDescription
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

    other: project(translationKey: { eq: $translationKey }, locale: { ne: $locale }) {
      slug
      locale
    }
  }
`
