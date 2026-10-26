import { useEffect } from 'react'

const SITE_URL = 'https://spaceforyou.nikelyh.tech'
const DEFAULT_TITLE = 'Space for You — Personalized Interactive Digital Spaces'
const DEFAULT_DESCRIPTION =
  'Create personalized, interactive digital spaces for someone special—featuring spatial photo canvases, voice recordings, dynamic objects, wax-sealed letters, and printable QR keepsake cards.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export interface PageSeoOptions {
  title?: string
  description?: string
  canonicalPath?: string
  ogImage?: string
  noindex?: boolean
}

function upsertMetaTag(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function usePageSeo({
  title,
  description,
  canonicalPath = '/',
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageSeoOptions = {}) {
  useEffect(() => {
    const resolvedTitle = title ? `${title} | Space for You` : DEFAULT_TITLE
    const resolvedDescription = description || DEFAULT_DESCRIPTION
    const normalizedPath = canonicalPath.startsWith('/')
      ? canonicalPath
      : `/${canonicalPath}`
    const resolvedUrl = `${SITE_URL}${normalizedPath}`
    const robotsValue = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large'

    document.title = resolvedTitle

    upsertMetaTag('name', 'description', resolvedDescription)
    upsertMetaTag('name', 'robots', robotsValue)
    upsertCanonicalLink(resolvedUrl)

    upsertMetaTag('property', 'og:title', resolvedTitle)
    upsertMetaTag('property', 'og:description', resolvedDescription)
    upsertMetaTag('property', 'og:url', resolvedUrl)
    upsertMetaTag('property', 'og:image', ogImage)

    upsertMetaTag('name', 'twitter:title', resolvedTitle)
    upsertMetaTag('name', 'twitter:description', resolvedDescription)
    upsertMetaTag('name', 'twitter:image', ogImage)
  }, [title, description, canonicalPath, ogImage, noindex])
}
