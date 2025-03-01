import React from 'react';

const FormatTextVariant: React.FC<React.SVGProps<SVGSVGElement>> = ({...rest}) => {
	return (
		<svg
			{...rest}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path d="M9.6,14L12,7.7L14.4,14M11,5L5.5,19H7.7L8.8,16H15L16.1,19H18.3L13,5H11Z"/>
		</svg>
	);
};

export default FormatTextVariant;