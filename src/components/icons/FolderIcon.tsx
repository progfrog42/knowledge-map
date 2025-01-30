import React from 'react';
import folderIcon from '../../assets/icons/folder.ico';

const FolderIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={folderIcon}
			alt="export_file"
			{...rest}
		/>
	);
};

export default FolderIcon;