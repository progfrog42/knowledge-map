import React from 'react';
import linkNewIcon from '../../assets/icons/link_new16.png';

const LinkNewIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={linkNewIcon}
			alt="link_new"
			{...rest}
		/>
	);
};

export default LinkNewIcon;