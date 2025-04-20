import { groq } from "next-sanity";

export const getAll = groq`*[]`;

export const allPostQuery = `
 *[_type == "post" ] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    "author": author-> {
      _id,
      name,
      "slug": slug.current,
      image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background
      },
      bio
    },
    publishedAt,
    mainImage {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    "categories": categories[]->title
  }
`;

export const paginatedPostQuery = `
  {
    "posts": *[_type == "post" && ($category == "All" || $category in categories[]->slug.current)] | order(publishedAt desc, _createdAt desc) [$offset...$limit] {
      _id,
      title,
      excerpt,
      "slug": slug.current,
      "author": author-> {
        _id,
        name,
        "slug": slug.current,
        image {
          ...,
          "blurDataURL": asset->metadata.lqip,
          "ImageColor": asset->metadata.palette.dominant.background
        },
        bio
      },
      publishedAt,
      mainImage {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background,
        alt
      },
      "categories": categories[]->title
    },
    "total": count(*[_type == "post" && ($category == "All" || $category in categories[]->title)])
  }
`;

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    isFeatured,
    publishedAt,
    excerpt,
   "author": author-> {
      _id,
      name,
      "slug": slug.current,
      image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background
      },
      bio
    },
   mainImage {
    ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    "categories": categories[]->title,
    body,
     gallery[] {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    }
  }
`;

export const allPostQueryWithCategory = `
  *[_type == "post" && $category in categories[]->title ] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
    _id,
    title,
    excerpt,
    "slug": slug.current,
       "author": author-> {
      _id,
      name,
      "slug": slug.current,
      image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background
      },
      bio
    },
    publishedAt,
      mainImage {
    ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    gallery[] {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
   "categories": categories[]->title,
  }
`;

export const allCategoryQuery = `*[_type == "category"] | order(title asc) {
title,description
}`;

export const relatedPostsQuery = `
*[
  _type == "post" &&
  slug.current != $currentSlug &&
  $category in categories[]->title
] [$pageIndex * $limit...($pageIndex + 1) * $limit] {
  _id,
  title,
  "slug": slug.current,
  "author": author-> {
    _id,
    name,
    "slug": slug.current,
    image {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background
    },
    bio
  },
  publishedAt,
  mainImage {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
    alt
  },
  "categories": categories[]->title,
  excerpt,
   gallery[] {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    }
}
`;

export const heroPostQuery = `
  *[_type == "post" && isHero == true] | order(publishedAt desc) [0] {
    _id,
    title,
    excerpt,
    "slug": slug.current,
       "author": author-> {
      _id,
      name,
      "slug": slug.current,
      image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background
      },
      bio
    },
    publishedAt,
      mainImage {
    ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
     gallery[] {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    }
  }
`;

export const aboutPageQuery = `*[_type == "about"][0] {
  _id,
  title,
  content
}`;

export const featuredPostsQuery = `
  *[_type == "post" && isFeatured == true && $category in categories[]->title ] [$pageIndex * $limit...($pageIndex + 1) * $limit] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
       "author": author-> {
      _id,
      name,
      "slug": slug.current,
      image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background
      },
      bio
    },
    publishedAt,
      mainImage {
    ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
   "categories": categories[]->title,
    gallery[] {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    }
  }
`;
export const featuredPostsQueryWithoutCategory = groq`
  *[_type == "post" && isFeatured == true][$pageIndex * $limit...($pageIndex + 1) * $limit] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "author": author-> {
      _id,
      name,
      "slug": slug.current,
      image {
        ...,
        "blurDataURL": asset->metadata.lqip,
        "ImageColor": asset->metadata.palette.dominant.background
      },
      bio
    },
    publishedAt,
    mainImage {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    },
    "categories": categories[]->title,
    gallery[] {
      ...,
      "blurDataURL": asset->metadata.lqip,
      "ImageColor": asset->metadata.palette.dominant.background,
      alt
    }
  }
`;

export const categories = groq`*[_type == "category"] | order(title asc) { title, slug }`;
