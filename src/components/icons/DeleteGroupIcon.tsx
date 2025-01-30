import React from 'react';
import deleteGroupIcon from '../../assets/icons/DeleteGroupFooter_32x32.png';

const DeleteGroupIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={deleteGroupIcon}
			alt="delete_group"
			{...rest}
		/>
	);
};

export default DeleteGroupIcon;