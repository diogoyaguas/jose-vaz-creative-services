import * as React from "react"

import GallerySection from "../components/gallery-section"
import Layout from "../components/layout"
import OrganicContentSection from "../components/organic-content-section"
import ProjectHeader from "../components/project-header"
import Seo from "../components/seo"
import { graphql } from "gatsby"

export default function ProjectTemplate({ data }) {
  const project = data.project
  const content = project?.content

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

      {content?.merch && (
        <GallerySection title={content.merch.title} items={content.merch.items} />
      )}

      {content?.organic && (
        <OrganicContentSection tabs={content.organic} />
      )}

      {content?.events && (
        <GallerySection title={content.events.title} items={content.events.items} />
      )}

      {content?.socialMedia && (
        <GallerySection
          title={content.socialMedia.title}
          items={content.socialMedia.items}
        />
      )}

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
        merch { title items { img video } }
        organic { title items { img video } }
        events { title items { img video } }
        reels { title items { img video } }
        socialMedia { title items { img video } }
      }
    }
  }
`
