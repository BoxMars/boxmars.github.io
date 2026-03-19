'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';


export const CommentsCofig={
    owner:'BoxMars',
	repo:'boxmars.github.io',
    repoId:'R_kgDOMtySLg',
    category:'General',
    categoryId:'DIC_kwDOMtySLs4Ci5zi',
}

export const Comments = () => {
    const { theme } = useTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const markReadyIfIframeExists = () => {
            const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
            if (!iframe) {
                return false;
            }

            setShowSkeleton(false);
            return true;
        };

        if (markReadyIfIframeExists()) {
            return;
        }

        const observer = new MutationObserver(() => {
            if (!markReadyIfIframeExists()) {
                return;
            }

            observer.disconnect();
        });

        observer.observe(container, { childList: true, subtree: true });

        const fallbackTimer = window.setTimeout(() => {
            setShowSkeleton(false);
            observer.disconnect();
        }, 2500);

        return () => {
            observer.disconnect();
            window.clearTimeout(fallbackTimer);
        };
    }, []);

	return (
        <section className="mt-16 border-t border-border pt-10">
            <div className="mb-5 space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">Comments</h2>
                <p className="text-sm text-muted-foreground">
                    Discuss this post on GitHub.
                </p>
            </div>
            <div ref={containerRef} className="relative min-h-[320px]">
                {showSkeleton && (
                    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm transition-opacity duration-300">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                                <div className="h-3 w-48 animate-pulse rounded bg-muted" />
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="h-20 animate-pulse rounded-xl bg-muted" />
                            <div className="h-16 animate-pulse rounded-xl bg-muted" />
                            <div className="h-16 w-5/6 animate-pulse rounded-xl bg-muted" />
                        </div>
                    </div>
                )}
                <Giscus
                    repo={`${CommentsCofig.owner}/${CommentsCofig.repo}`}
                    repoId={CommentsCofig.repoId}
                    category={CommentsCofig.category}
                    categoryId={CommentsCofig.categoryId}
                    mapping="title"
                    strict="1"
                    reactionsEnabled="1"
                    emitMetadata="1"
                    inputPosition="top"
                    theme={theme === 'dark' ? "noborder_dark" : 'noborder_light'}
                    lang="en"
                    loading="eager"
                />
            </div>
        </section>
	);
};
