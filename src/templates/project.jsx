import * as React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import FlipbookSection from "../components/flipbook"
import GallerySection from "../components/gallery-section"
import HoverVideoGrid from "../components/hover-video-grid"
import Layout from "../components/layout"
import OrganicContentSection from "../components/organic-content-section"
import ProjectHeader from "../components/project-header"
import Reveal from "../components/reveal"
import Seo from "../components/seo"
import TabbedImageSection from "../components/tabbed-image-section"

export default function ProjectTemplate({ data, pageContext }) {
  const project = data.project
  const other = data.other
  const sections = project?.content || []

  const seoImage =
    project?.cardMedia?.imgFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src

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
            <OrganicContentSection
              title={section.title}
              tabs={section.tabs || []}
            />
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
            <TabbedImageSection
              title={section.title}
              subtitle={section.subtitle}
              tabs={section.imageTabs || []}
              initialTab={0}
            />
          </Reveal>
        )

      case "flipbook":
        return (
          <Reveal key={idx}>
            <FlipbookSection
              title={section.title}
              subtitle={section.subtitle}
              pages={section.flipbookPages || []}
            />
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
        image={seoImage}
      />

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

ProjectTemplate.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.oneOf(["pt", "en"]).isRequired,
    translationKey: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    project: PropTypes.shape({
      title: PropTypes.string,
      seoTitle: PropTypes.string,
      seoDescription: PropTypes.string,
      locale: PropTypes.oneOf(["pt", "en"]),
      date: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
      banner: PropTypes.shape({
        video: PropTypes.string,
        imgFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.any,
          }),
        }),
      }),
      cardMedia: PropTypes.shape({
        video: PropTypes.string,
        imgFile: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            gatsbyImageData: PropTypes.shape({
              images: PropTypes.shape({
                fallback: PropTypes.shape({
                  src: PropTypes.string,
                }),
              }),
            }),
          }),
        }),
      }),
      content: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          title: PropTypes.string,
          subtitle: PropTypes.string,
          columns: PropTypes.number,
          items: PropTypes.arrayOf(
            PropTypes.shape({
              video: PropTypes.string,
              imgFile: PropTypes.object,
            })
          ),
          tabs: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string,
              items: PropTypes.arrayOf(
                PropTypes.shape({
                  video: PropTypes.string,
                  imgFile: PropTypes.object,
                })
              ),
            })
          ),
          imageTabs: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              alt: PropTypes.string,
              imgFile: PropTypes.object,
            })
          ),
          flipbookPages: PropTypes.arrayOf(
            PropTypes.shape({
              alt: PropTypes.string,
              imgFile: PropTypes.object,
            })
          ),
        })
      ),
    }).isRequired,
    other: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      locale: PropTypes.oneOf(["pt", "en"]).isRequired,
    }),
  }).isRequired,
}

ProjectTemplate.defaultProps = {
  data: undefined,
}
ProjectTemplate.defaultProps = {}

export const query = graphql`
  fragment ProjectImageSmall on File {
    childImageSharp {
      gatsbyImageData(
        placeholder: BLURRED
        formats: [AUTO, WEBP, AVIF]
        quality: 70
        layout: CONSTRAINED
        width: 400
      )
    }
  }

  fragment ProjectImageLarge on File {
    childImageSharp {
      gatsbyImageData(
        placeholder: BLURRED
        formats: [AUTO, WEBP, AVIF]
        quality: 75
        layout: CONSTRAINED
        width: 900
      )
    }
  }

  fragment ProjectImageFlipbookLarge on File {
    childImageSharp {
      gatsbyImageData(
        placeholder: BLURRED
        formats: [AUTO, WEBP, AVIF]
        quality: 75
        layout: CONSTRAINED
        width: 800
      )
    }
  }

  fragment ProjectSeoImage on File {
    childImageSharp {
      gatsbyImageData(
        placeholder: DOMINANT_COLOR
        formats: [AUTO, WEBP, AVIF]
        quality: 70
        layout: CONSTRAINED
        width: 500
      )
    }
  }

  query ProjectBySlug($slug: String!, $locale: String!, $translationKey: String!) {
    project(slug: { eq: $slug }, locale: { eq: $locale }) {
      slug
      locale
      translationKey
      seoTitle
      title
      date

      banner {
        imgFile { ...ProjectImageLarge }
        video
      }

      cardMedia {
        imgFile { ...ProjectSeoImage }
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
          imgFile { ...ProjectImageSmall }
          video
        }

        tabs {
          title
          items {
            imgFile { ...ProjectImageSmall }
            video
          }
        }

        imageTabs {
          label
          imgFile { ...ProjectImageLarge }
          alt
        }

        flipbookPages {
          imgFile { ...ProjectImageFlipbookLarge }
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
