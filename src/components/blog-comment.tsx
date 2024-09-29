'use client';

import Giscus from '@giscus/react';

export const CommentsCofig={
    repo:'BoxMars/boxmars.github.io',
    repoId:'R_kgDOMtySLg',
    category:'General',
    categoryId:'DIC_kwDOMtySLs4Ci5zi',
}

export const Comments = ({ repo, repoId, category, categoryId }:any) => {
	return (
		<Giscus
			repo={repo}
			repoId={repoId}
			category={category}
			categoryId={categoryId}
			mapping="title"
            strict='1'
			reactionsEnabled="1"
			emitMetadata="1"
			inputPosition="top"
			theme="noborder_dark"
			lang="en"
			loading="lazy"
		/>
	);
};
