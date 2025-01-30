import React from 'react';
import textNewIcon from '../../assets/icons/Text_new16.png';

const TextNewIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={textNewIcon}
			alt="text_new"
			{...rest}
		/>
	);
};

export default TextNewIcon;