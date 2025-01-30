import React from 'react';
import boxIcon from "../../assets/icons/box32.png"

const BoxIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={boxIcon}
			alt="box"
			{...rest}
		/>
	);
};

export default BoxIcon;