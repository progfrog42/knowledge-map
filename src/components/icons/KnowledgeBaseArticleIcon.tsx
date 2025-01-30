import React from 'react';
import knowledgeBaseArticleIcon from '../../assets/icons/KnowledgeBaseArticle_32x32.png';

const KnowledgeBaseArticleIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={knowledgeBaseArticleIcon}
			alt="original_source"
			{...rest}
		/>
	);
};

export default KnowledgeBaseArticleIcon;