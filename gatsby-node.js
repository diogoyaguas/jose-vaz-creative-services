const path = require("path")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Project implements Node @dontInfer {
      slug: String!
      index: Int!
      seoTitle: String
      title: String!
      date: String
      banner: ProjectMediaItem
      categories: [String!]!
      smallDescription: String!
      description: String!
      cardMedia: ProjectMediaItem!
      content: ProjectContent
    }

    type ProjectContent @dontInfer {
      merch: ProjectSection
      organic: ProjectSection
      events: ProjectSection
      reels: ProjectSection
      socialMedia: ProjectSection
    }

    type ProjectSection @dontInfer {
      title: String
      items: [ProjectMediaItem!]!
    }

    type ProjectMediaItem @dontInfer {
      img: String
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
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(result.errors)
    return
  }

  const template = path.resolve("src/templates/project.jsx")

  result.data.allProject.nodes.forEach((p) => {
    console.log("Creating page for:", p.slug)

    createPage({
      path: `/projetos/${p.slug}`,
      component: template,
      context: { slug: p.slug },
    })
  })
}
