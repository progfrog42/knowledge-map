import React from 'react';
import formGreenIcon from '../../assets/icons/form_green.ico';

const FormGreenIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={formGreenIcon}
			alt="form_green"
			{...rest}
		/>
	);
};

export default FormGreenIcon;