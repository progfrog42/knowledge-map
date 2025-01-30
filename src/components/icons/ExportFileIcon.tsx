import React from 'react';
import exportFileIcon from '../../assets/icons/ExportFile_32x32.png';

const ExportFileIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={exportFileIcon}
			alt="export_file"
			{...rest}
		/>
	);
};

export default ExportFileIcon;