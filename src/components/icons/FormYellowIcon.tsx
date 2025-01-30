import React from 'react';
import formYellowIcon from '../../assets/icons/form_yellow.ico';

const FormYellowIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={formYellowIcon}
			alt="form_yellow"
			{...rest}
		/>
	);
};

export default FormYellowIcon;