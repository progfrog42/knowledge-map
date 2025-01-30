import React from 'react';
import jarIcon from "../../assets/icons/jar16.png"

const JarIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={jarIcon}
			alt="form_yellow"
			{...rest}
		/>
	);
};

export default JarIcon;