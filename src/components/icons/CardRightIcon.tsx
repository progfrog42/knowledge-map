import React from 'react';
import cardRightIcon from '../../assets/icons/card_right16.png';

const CardRightIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={cardRightIcon}
			alt="card_right"
			{...rest}
		/>
	);
};

export default CardRightIcon;