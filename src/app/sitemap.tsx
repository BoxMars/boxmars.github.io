import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  
  const blogUrls = posts.map((post) => ({
    url: `${DATA.url}/blog/${post.slug}`,
    lastModified: post.metadata.lastUpdatedAt 
      ? new Date(post.metadata.lastUpdatedAt) 
      : new Date(post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: DATA.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${DATA.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly", 
      priority: 0.9,
    },
    ...blogUrls,
  ];
}