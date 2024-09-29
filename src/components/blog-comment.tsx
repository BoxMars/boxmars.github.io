'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';


export const CommentsCofig={
    owner:'BoxMars',
	repo:'boxmars.github.io',
    repoId:'R_kgDOMtySLg',
    category:'General',
    categoryId:'DIC_kwDOMtySLs4Ci5zi',
}

export const Comments = () => {
    const { theme, setTheme } = useTheme();
	return (
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
			loading="lazy"
		/>
	);
};
