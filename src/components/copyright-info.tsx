'use client';

import Link from "next/link";   
import { formatDate } from "@/lib/utils";

export const CopyrightInfo = ({revision}:{revision: any}) => {


    return (
        <div className="text-xs text-slate-600 dark:text-slate-300 print:hidden">
          <p>
          Copyright © {new Date().getFullYear()} Box, Zhang Huakang
          </p>
          {revision && (
            <p>Last update on <span className="underline">{
                new Date(revision.committer.date*1000).toLocaleDateString('en-us',{
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })
                }</span> with commit <Link
              href={'https://github.com/BoxMars/boxmars.github.io/commit/'+revision.hash}>
              <span className="underline">{revision.shortHash}</span>
              </Link>
            </p>
          )}
        </div>
    )
}