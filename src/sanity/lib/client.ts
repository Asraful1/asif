/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  apiVersion,
  dataset,
  projectId,
  useCdn,
  previewSecretId,
} from "./config";
import {
  aboutPageQuery,
  allCategoryQuery,
  allPostQuery,
  allPostQueryWithCategory,
  categories,
  featuredPostsQuery,
  featuredPostsQueryWithoutCategory,
  getAll,
  paginatedPostQuery,
  postBySlugQuery,
} from "./groq";
import { createClient } from "next-sanity";

if (!projectId) {
  console.error(
    "The Sanity Project ID is not set. Check your environment variables."
  );
}

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

export const previewClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: previewSecretId,
    })
  : null;

import { QueryParams } from "next-sanity";

type FetchParams = QueryParams | undefined;
type FetchQuery = string;

type FetchResult<T> = Promise<T[] | T | null>;

export const fetcher = async <T = unknown>([query, params]: [
  FetchQuery,
  FetchParams,
]): FetchResult<T> => {
  return client ? await client.fetch<T>(query, params || {}) : [];
};

(async () => {
  if (client) {
    const data = await client.fetch(getAll);
    if (!data || !data.length) {
      console.error(
        "Sanity returns empty array. Are you sure the dataset is public?"
      );
    }
  }
})();

export async function getAllPosts({
  limit = 10,
  pageIndex = 0,
  category = "All",
}: {
  limit?: number;
  pageIndex?: number;
  category?: string | null;
}): Promise<any[]> {
  if (client) {
    const queryToUse =
      category && category !== "All" ? allPostQueryWithCategory : allPostQuery;

    return (
      (await client.fetch(queryToUse, {
        pageIndex,
        limit,
        category,
      })) || []
    );
  }
  return [];
}

export async function getAllPaginatedPosts({
  offset = 0,
  limit = 10,
  category = "All",
}: {
  offset?: number;
  limit?: number;
  category?: string | null;
}): Promise<{ posts: any[]; total: number }> {
  if (!client) {
    throw new Error("Sanity client is not initialized");
  }

  const endIndex = offset + limit;

  console.log("category", category);

  const result = await client.fetch(paginatedPostQuery, {
    offset,
    limit: endIndex,
    category: category || "All",
  });

  console.log("result".result);

  return {
    posts: result.posts || [],
    total: result.total || 0,
  };
}

export async function getPostBySlug(
  slug: string
): Promise<any | Record<string, never>> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || {};
  }
  return {};
}

export async function getFeaturedPosts({
  limit = 6,
  pageIndex = 0,
  category = "All",
}: {
  limit?: number;
  pageIndex?: number;
  category?: string | null;
}): Promise<any[]> {
  if (client) {
    const queryToUse =
      category && category !== "All"
        ? featuredPostsQuery
        : featuredPostsQueryWithoutCategory;

    return (
      (await client.fetch<any[]>(queryToUse, {
        pageIndex,
        limit,
        category,
      })) || []
    );
  }
  return [];
}

export async function getAllCategories() {
  if (client) {
    return (await client.fetch(allCategoryQuery)) || [];
  }
  return [];
}

export async function getAboutPage() {
  if (client) {
    return (await client.fetch(aboutPageQuery)) || {};
  }
  return {};
}

export async function getCategories() {
  if (client) {
    return (await client.fetch(categories)) || [];
  }
  return [];
}
