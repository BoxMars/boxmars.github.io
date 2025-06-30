import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts, markdownToHTML } from "@/data/blog";
import { formatDate } from "@/lib/utils";
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
        <Link href="/" className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center pb-10 space-x-1 justify-start">
          <ChevronLeftIcon
            size={16}
            />
          <span>
            Back to Home
          </span>
        </Link>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      </BlurFade>
      {/* <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p className=" text-muted-foreground mb-4">
        Welcome to my blog! This is where I share updates on my recent studies in Computer Science in English or Chinese. Through this blog, I hope to document my personal growth and share insights and experiences I have gained along the way.
        </p>
      </BlurFade> */}
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.lastUpdatedAt) > new Date(b.metadata.lastUpdatedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={post.slug}>
            <Link
              className="flex flex-col space-y-1"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight">
                  {post.metadata.title}
                </p>
                <div className="flex justify-between items-center mt-2 mb-8 text-xs max-w-[650px]">
                    {/* <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      Updated at {post.metadata.lastUpdatedAt}
                    </p> */}
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {formatDate(post.metadata.publishedAt)}
                    </p>
                </div>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
