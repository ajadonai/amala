import { groq } from 'next-sanity';

// ── Articles ──

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    tag,
    publishedAt,
    readTime,
    featured
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    tag,
    publishedAt,
    readTime,
    featured,
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url,
        "dimensions": asset->metadata.dimensions
      }
    }
  }
`;

export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`;

// ── Site Settings ──

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    surveyUrl,
    linkedinUrl,
    twitterUrl,
    scholarUrl,
    "resumeUrl": resumeFile.asset->url
  }
`;
