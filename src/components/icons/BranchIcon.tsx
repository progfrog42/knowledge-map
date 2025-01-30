import React from 'react';
import branchIcon from '../../assets/icons/branch32.png';

const BranchIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={branchIcon}
			alt="branch"
			{...rest}
		/>
	);
};

export default BranchIcon;