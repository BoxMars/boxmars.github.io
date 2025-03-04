import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getBlogPosts } from "@/data/blog";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

import { getLastCommit } from 'last-commit-log';

const BLUR_FADE_DELAY = 0.05;

export default async function Page() {
  let reacent_blog=await getBlogPosts();

  const LCL = require('last-commit-log');
  const lcl = new LCL();

  const revision = await lcl.getLastCommit();

  // console.log(revision)

  //sort by date
  reacent_blog=reacent_blog.sort((a, b) => {
    if (
      new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
    ) {
      return -1;
    }
    return 1;
  });
  if (reacent_blog.length>3){
    reacent_blog=reacent_blog.slice(0,3);
  }

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10 print:space-y-5 print:min-h-fit">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-3xl xl:text-3xl/none print:hidden"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                delay={BLUR_FADE_DELAY * 2}
                className="text-2xl font-bold tracking-tighter sm:text-2xl xl:text-2xl/none hidden print:block"
                yOffset={8}
                text={'Zhang Huakang'}/>
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Markdown className="max-w-[600px] text-sm sm:text-base text-pretty print:hidden">
                  {DATA.description}
                </Markdown>
                <div className="flex items-center space-x-1 py-1 ml-[-10px]">
                  {
                    Object.entries(DATA.contact.social)
                      .filter(([_, social]) => social.navbar)
                      .map(([name,socail])=>(
                        <Tooltip
                        key={socail.url}
                        >
                        <TooltipTrigger asChild>
                        <Link
                          href={socail.url}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                          )}
                          key={socail.url}
                          >
                            <socail.icon className="size-4"/>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          <p>{name}</p>
                        </TooltipContent>
                        </Tooltip>
                      ))
                  }
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="print:hidden">
              <Tooltip delayDuration={1000}>
              <TooltipTrigger asChild>
              <Avatar className="size-32 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="">
                <p>Taken in Taipei</p>
              </TooltipContent>
              </Tooltip>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about" className="print:hidden">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans dark:prose-invert text-sm sm:text-base">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      {/* <section id='blog' className="print:hidden">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <Link href='/blog' className="inline-flex items-center justify-center group">
              <h2 className="text-xl font-bold">Recent Blog</h2>
              <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 print:hidden",
                  )}
                />
            </Link>
          </BlurFade>
          {reacent_blog && reacent_blog.sort((a, b) => {
          if (
            new Date(a.metadata.lastUpdatedAt) > new Date(b.metadata.lastUpdatedAt)
          ) {
            return -1;
          }
          return 1;
        }).map((post, id) => (
            <BlurFade
              key={post.slug}
              delay={BLUR_FADE_DELAY * 4 + id * 0.05}
            >
              <ResumeCard
                key={post.slug}
                logoUrl=""
                altText={post.metadata.title}
                title={post.metadata.title}
                description={post.metadata.summary}
                href={`/blog/${post.slug}`}
                period={post.metadata.lastUpdatedAt}
                type="blog"
              />
            </BlurFade>
          ))}
        </div>
      </section> */}

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      
      <section id="experience">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Research Experience</h2>
          </BlurFade>
          {DATA.research_experience.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
                location={work.location}
                lab={work.lab}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
                location={work.location}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge className="text-xs" key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section> */}
      <section id="projects" className="print:hidden">
        <div className="space-y-12 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="space-y-2">
              <div className="text-xl font-bold">
                Projects
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      {/* <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section> */}
      {/* <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section> */}
      <section id='git'>
        <div className="text-xs text-slate-600 dark:text-slate-300 print:hidden">
          <p>
          Copyright © {new Date().getFullYear()} Box, Zhang Huakang
          </p>
          <p>Commit <Link
            href={'https://github.com/BoxMars/boxmars.github.io/commit/'+revision.hash}>
            <span className="underline">{revision.shortHash}</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
