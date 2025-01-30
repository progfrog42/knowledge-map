import React from 'react';
import cardNoneIcon from '../../assets/icons/card_none16.png';

const CardNoneIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={cardNoneIcon}
			alt="card_none"
			{...rest}
		/>
	);
};

export default CardNoneIcon;