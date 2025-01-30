import React from 'react';
import printerIcon from '../../assets/icons/printer32.png';

const PrinterIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={printerIcon}
			alt="printer"
			{...rest}
		/>
	);
};

export default PrinterIcon;