import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts, markdownToHTML } from "@/data/blog";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

export const metadata = {
  title: "Blog",
  description: "",
};

const BLUR_FADE_DELAY = 0.05;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link href="/" className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center py-1">
          <ChevronLeftIcon
            size={14}
            />
          Back to Home
        </Link>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p className=" text-muted-foreground mb-4">
        Welcome to my blog! This is where I share updates on my recent studies in Computer Science in English or Chinese. Through this blog, I hope to document my personal growth and share insights and experiences I have gained along the way.
        </p>
      </BlurFade>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1 mb-4"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight">
                  {post.metadata.title}
                </p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.metadata.publishedAt}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
