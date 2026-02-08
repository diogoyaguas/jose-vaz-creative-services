const path = require("path")

const SUPPORTED_LOCALES = new Set(["pt", "en"])

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Project implements Node @dontInfer {
      slug: String!
      index: Int!
      locale: String!
      translationKey: String!
      seoTitle: String
      title: String!
      date: String
      banner: ProjectMediaItem
      categories: [String!]!
      seoDescription: String
      smallDescription: String!
      description: String!
      cardMedia: ProjectMediaItem!
      content: [ProjectSection!]!
    }

    type ProjectSection @dontInfer {
      type: String!
      title: String
      subtitle: String
      columns: Int

      items: [ProjectMediaItem!]
      tabs: [ProjectTab!]
      imageTabs: [ProjectImageTab!]
      flipbookPages: [ProjectImageTab!]
    }

    type ProjectTab @dontInfer {
      title: String
      items: [ProjectMediaItem!]!
    }

    type ProjectImageTab @dontInfer {
      label: String!
      img: String
      imgFile: File @link(from: "img", by: "relativePath")
      alt: String
    }

    type ProjectMediaItem @dontInfer {
      img: String
      imgFile: File @link(from: "img", by: "relativePath")
      video: String
    }
  `)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allProject(sort: { index: ASC }) {
        nodes {
          slug
          locale
          translationKey
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(result.errors)
    return
  }

  const template = path.resolve("src/templates/project.jsx")

  const nodes = result.data.allProject.nodes || []

  nodes.forEach((p) => {
    const locale = (p.locale || "").toLowerCase()

    if (!SUPPORTED_LOCALES.has(locale)) {
      reporter.warn(
        `[i18n] Skipping project "${p.slug}" because locale "${p.locale}" is not supported.`
      )
      return
    }

    if (!p.translationKey) {
      reporter.warn(
        `[i18n] Project "${p.slug}" is missing translationKey. (Needed to link PT/EN versions.)`
      )
    }

    const slug = String(p.slug || "").replace(/^\/+|\/+$/g, "")
    const isPT = locale === "pt"

    const pagePath = isPT
      ? `/projetos/${slug}`
      : `/en/projects/${slug}`

    createPage({
      path: pagePath,
      component: template,
      context: {
        slug: p.slug,
        locale,
        translationKey: p.translationKey,
      },
    })
  })
}
