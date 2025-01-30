import React from 'react';
import dashboardIcon from "../../assets/icons/dashboard.png"

const DashboardIcon: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({...rest}) => {
	return (
		<img
			src={dashboardIcon}
			alt="dashboard"
			{...rest}
		/>
	);
};

export default DashboardIcon;