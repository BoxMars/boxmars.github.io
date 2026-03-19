import BlurFade from "@/components/magicui/blur-fade";
import { getNotes } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Notes",
  description: "",
};

const BLUR_FADE_DELAY = 0.05;

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link href="/" className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center pb-10 space-x-1 justify-start">
          <ChevronLeftIcon size={16} />
          <span>Back to Home</span>
        </Link>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Notes</h1>
      </BlurFade>
      {notes
        .sort((a, b) => {
          if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
            return -1;
          }

          return 1;
        })
        .map((note, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 3 + id * 0.05} key={note.slug}>
            <Link className="flex flex-col space-y-1" href={`/notes/${note.slug}`}>
              <div className="w-full flex flex-col">
                <p className="tracking-tight">{note.metadata.title}</p>
                <div className="flex justify-between items-center mt-2 mb-8 text-xs max-w-[650px]">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {formatDate(note.metadata.publishedAt)}
                  </p>
                </div>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
