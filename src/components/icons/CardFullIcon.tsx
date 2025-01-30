import React from 'react';
import cardFullIcon from '../../assets/icons/card_full16.png'

const CardFullIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={cardFullIcon}
			alt="card_full"
			{...rest}
		/>
	);
};

export default CardFullIcon;