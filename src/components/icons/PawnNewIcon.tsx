import React from 'react';
import pawnNewIcon from "../../assets/icons/pawn_new16.png"

const PawnNewIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			{...rest}
			src={pawnNewIcon}
			alt="pawn_new"
		/>
	);
};

export default PawnNewIcon;