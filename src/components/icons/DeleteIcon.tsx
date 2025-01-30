import React from 'react';
import deleteIcon from '../../assets/icons/Delete_32x32.png';

const DeleteIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={deleteIcon}
			alt="delete"
			{...rest}
		/>
	);
};

export default DeleteIcon;