import React from 'react';
import toolboxIcon from "../../assets/icons/toolbox.png"

const ToolboxIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={toolboxIcon}
			alt="toolbox"
			{...rest}
		/>
	);
};

export default ToolboxIcon;