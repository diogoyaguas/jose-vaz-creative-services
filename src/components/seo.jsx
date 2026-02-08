import React, { useMemo } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Helmet from "react-helmet"
import PropTypes from "prop-types"

const stripHtml = (value = "") =>
    String(value)
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()

const ensureLeadingSlash = (p = "") => (p.startsWith("/") ? p : `/${p}`)
const removeTrailingSlash = (u = "") => (u.endsWith("/") ? u.slice(0, -1) : u)

function Seo({
    title,
    description,
    lang,
    meta,
    pathname,
    image,
    canonical,
    robots,
    locale,
    otherPath,
    type,
}) {
    const data = useStaticQuery(graphql`
    query SeoMetaQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          defaultImage
        }
      }
    }
  `)

    const siteMeta = data.site.siteMetadata

    const siteUrl = removeTrailingSlash(siteMeta.siteUrl || "")
    const pagePath = pathname ? ensureLeadingSlash(pathname) : ""
    const url = canonical
        ? canonical
        : siteUrl && pagePath
            ? `${siteUrl}${pagePath}`
            : undefined

    const metaDescription = stripHtml(description || siteMeta.description || "")

    const imageUrl = useMemo(() => {
        const img = image || siteMeta.defaultImage
        if (!img) return undefined
        if (img.startsWith("http://") || img.startsWith("https://")) return img
        if (!siteUrl) return img
        return `${siteUrl}${ensureLeadingSlash(img)}`
    }, [image, siteMeta.defaultImage, siteUrl])

    const computedLang = lang || (locale === "pt" ? "pt-PT" : "en")
    const computedLocale = locale === "pt" ? "pt_PT" : "en_US"
    const computedType = type || "website"
    const computedRobots = robots || "index,follow"

    const alternates = useMemo(() => {
        if (!siteUrl) return []
        if (!otherPath) return []
        const otherUrl = `${siteUrl}${ensureLeadingSlash(otherPath)}`
        const thisUrl = url

        if (!thisUrl) return []

        const isPt = locale === "pt"
        return [
            {
                hrefLang: isPt ? "pt-PT" : "en",
                href: thisUrl,
            },
            {
                hrefLang: isPt ? "en" : "pt-PT",
                href: otherUrl,
            },
            {
                hrefLang: "x-default",
                href: isPt ? thisUrl : otherUrl,
            },
        ]
    }, [siteUrl, otherPath, url, locale])

    const titleTemplate = `%s | ${siteMeta.title}`

    return (
        <Helmet
            htmlAttributes={{ lang: computedLang }}
            title={title}
            titleTemplate={titleTemplate}
        >
            {url ? <link rel="canonical" href={url} /> : null}

            {alternates.map((a) => (
                <link
                    key={`${a.hrefLang}-${a.href}`}
                    rel="alternate"
                    hrefLang={a.hrefLang}
                    href={a.href}
                />
            ))}

            <meta name="description" content={metaDescription} />
            <meta name="robots" content={computedRobots} />

            <meta property="og:site_name" content={siteMeta.title} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={computedType} />
            <meta property="og:locale" content={computedLocale} />
            {url ? <meta property="og:url" content={url} /> : null}
            {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}

            <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
            {siteMeta.author ? <meta name="twitter:creator" content={siteMeta.author} /> : null}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}

            {(meta || []).map((m, i) => (
                <meta key={m.name || m.property || i} {...m} />
            ))}
        </Helmet>
    )
}

Seo.defaultProps = {
    description: "",
    meta: [],
    pathname: "",
    image: "",
    canonical: "",
    robots: "",
    locale: "pt",
    otherPath: "",
    type: "website",
    lang: "",
}

Seo.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    pathname: PropTypes.string,
    image: PropTypes.string,
    canonical: PropTypes.string,
    robots: PropTypes.string,
    locale: PropTypes.oneOf(["pt", "en"]),
    otherPath: PropTypes.string,
    type: PropTypes.oneOf(["website", "article"]),
}

export default Seo
