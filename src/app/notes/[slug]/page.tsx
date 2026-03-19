
import { getNote, getNotes } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const note = await getNote(params.slug);

  if (!note) {
    return undefined;
  }

  const {
    title,
    publishedAt: publishedTime,
    lastUpdatedAt: modifiedTime,
    summary: description,
    image,
  } = note.metadata;
  const ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/notes/${note.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    other: {
      modifiedTime,
    },
  };
}

export async function generateStaticParams() {
  const notes = await getNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const note = await getNote(params.slug);

  if (!note) {
    notFound();
  }


  return (
    <section id="notes">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: note.metadata.title,
            datePublished: note.metadata.publishedAt,
            dateModified: note.metadata.lastUpdatedAt,
            description: note.metadata.summary,
            image: note.metadata.image
              ? `${DATA.url}${note.metadata.image}`
              : `${DATA.url}/og?title=${note.metadata.title}`,
            url: `${DATA.url}/notes/${note.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <Link href="/notes" className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center pb-10 space-x-1 justify-start">
        <ChevronLeftIcon size={16} />
        <span>Back to Notes</span>
      </Link>

      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {note.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Published at {formatDate(note.metadata.publishedAt)}
          </p>
        </Suspense>
      </div>
      <article
        className="prose dark:prose-invert mb-10 text-pretty"
        dangerouslySetInnerHTML={{ __html: note.source }}
      />
    </section>
  );
}
