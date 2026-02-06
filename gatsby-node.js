exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Project implements Node @dontInfer {
      slug: String!
      seoTitle: String
      title: String!
      date: String
      categories: [String!]!
      description: String
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
      img: File
      video: File
    }
  `)
}
