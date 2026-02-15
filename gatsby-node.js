const path = require("path")
const fs = require("fs")
const crypto = require("crypto")

const SUPPORTED_LOCALES = new Set(["pt", "en"])

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type About implements Node @dontInfer {
      locale: String!
      profile: AboutProfile!
      clientsByYear: [AboutClientsYear!]!
      software: [String!]!
      skills: [AboutSkill!]!
    }

    type AboutProfile @dontInfer {
      photo: String!
      titleText: String!
      subtitleText: String!
    }

    type AboutClientsYear @dontInfer {
      year: String!
      clients: [String!]!
    }

    type AboutSkill @dontInfer {
      name: String!
      percent: Int!
    }

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
      alt: String
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


exports.sourceNodes = ({ actions, createNodeId, reporter }) => {
  const { createNode } = actions

  // Ajusta este path caso o ficheiro esteja noutro sítio
  const aboutPath = path.resolve("src/data/about.json")

  reporter.info(`[about] Reading: ${aboutPath}`)

  if (!fs.existsSync(aboutPath)) {
    reporter.warn(`[about] File not found: ${aboutPath}`)
    return
  }

  let parsed
  try {
    parsed = JSON.parse(fs.readFileSync(aboutPath, "utf8"))
  } catch (e) {
    reporter.panicOnBuild(`[about] Invalid JSON in ${aboutPath}: ${e.message}`)
    return
  }

  const items = Array.isArray(parsed) ? parsed : [parsed]
  reporter.info(`[about] Entries in JSON: ${items.length}`)

  let created = 0

  items.forEach((item, idx) => {
    const locale = String(item.locale || "").toLowerCase()

    if (!SUPPORTED_LOCALES.has(locale)) {
      reporter.warn(
        `[about] Skipping entry #${idx} because locale "${item.locale}" is not supported.`
      )
      return
    }

    const content = JSON.stringify(item)
    const digest = crypto.createHash("md5").update(content).digest("hex")

    createNode({
      ...item,
      id: createNodeId(`about-${locale}`),
      parent: null,
      children: [],
      internal: {
        type: "About",
        contentDigest: digest,
      },
    })

    created += 1
  })

  reporter.info(`[about] Created About nodes: ${created}`)
}
