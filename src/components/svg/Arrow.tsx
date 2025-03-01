import React from 'react';

interface ArrowProps extends React.SVGProps<SVGSVGElement> {
	dir?: 'top' | 'bottom' | 'left' | 'right';
}

const Arrow: React.FC<ArrowProps> = ({dir = 'right', ...rest}) => {

	const directions = {
		'left': 180,
		'right': 0,
		'top': -90,
		'bottom': 90,
	}

	return (
		<svg
			{...rest}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 -960 960 960"
			style={{transform: `rotate(${directions[dir]}deg)`}}
		>
			<path
				d="M410.64-285.65q-8.07 0-13.81-5.65-5.74-5.66-5.74-13.55v-350.3q0-7.89 6.04-13.55 6.04-5.65 14.26-5.65 2.65 0 13.61 6.48l167.03 166.8q3.25 4.02 5.69 9.89 2.43 5.87 2.43 11.02 0 5.15-2.43 10.85-2.44 5.69-5.69 9.38l-167.2 167.97q-3.02 3.07-6.6 4.69-3.57 1.62-7.59 1.62Z"/>
		</svg>
	);
};

export default Arrow;