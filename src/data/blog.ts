import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeKatex from 'rehype-katex'
import rehypeMathjax from 'rehype-mathjax'
import remarkMath from 'remark-math'
import { unified } from "unified";

export type ContentMetadata = {
  title: string;
  publishedAt: string;
  lastUpdatedAt: string;
  summary: string;
  image?: string;
};

const CONTENT_EXTENSIONS = [".md", ".mdx"];

function getContentFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => CONTENT_EXTENSIONS.includes(path.extname(file)));
}

function resolveContentFilePath(dir: string, slug: string) {
  for (const extension of CONTENT_EXTENSIONS) {
    const filePath = path.join(dir, `${slug}${extension}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }

  return null;
}

export async function markdownToHTML(markdown: string) {
  const p = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjax,{
      tex:{
        inlineMath: [['$', '$'],['\\(', '\\)']],
        displayMath: [['$$', '$$'],['\\[', '\\]']],
        processEscapes: true,
      }
    })
    .use(rehypePrettyCode, {
      // https://rehype-pretty.pages.dev/#usage
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  return p.toString();
}

async function getContentBySlug(dir: string, slug: string) {
  const filePath = resolveContentFilePath(dir, slug);

  if (!filePath) {
    return null;
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content: rawContent, data: metadata } = matter(source);
  const content = await markdownToHTML(rawContent);
  return {
    source: content,
    metadata: metadata as ContentMetadata,
    slug,
  };
}

export async function getPost(slug: string) {
  return getContentBySlug(path.join(process.cwd(), "content"), slug);
}

export async function getNote(slug: string) {
  return getContentBySlug(path.join(process.cwd(), "notes"), slug);
}

async function getAllPosts(dir: string) {
  const contentFiles = getContentFiles(dir);
  return Promise.all(
    contentFiles.map(async (file) => {
      const slug = path.basename(file, path.extname(file));
      const post = await getContentBySlug(dir, slug);

      if (!post) {
        return null;
      }

      return {
        metadata: post.metadata,
        slug,
        source: post.source,
      };
    })
  ).then((posts) => posts.filter((post): post is NonNullable<typeof post> => post !== null));
}

export async function getBlogPosts() {
  return getAllPosts(path.join(process.cwd(), "content"));
}

export async function getNotes() {
  return getAllPosts(path.join(process.cwd(), "notes"));
}
