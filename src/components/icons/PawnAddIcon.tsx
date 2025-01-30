import React from 'react';
import pawnAddIcon from '../../assets/icons/pawn_add16.png';

const PawnAddIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={pawnAddIcon}
			alt="pawn_add"
			{...rest}
		/>
	);
};

export default PawnAddIcon;