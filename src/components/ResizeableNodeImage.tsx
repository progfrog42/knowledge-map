import React, {useEffect, useState} from 'react';

interface IResizeableNodeImageProps {
	nodeWidth: number;
	nodeHeight: number;
	imgAttributes: React.ImgHTMLAttributes<HTMLImageElement>;
	handleImageDoubleClick: (imageWidth: number, imageHeight: number) => void;
}

const ResizeableNodeImage: React.FC<IResizeableNodeImageProps> = ({
																																		nodeHeight,
																																		nodeWidth,
																																		imgAttributes,
																																		handleImageDoubleClick
																																	}) => {

	const [imageDimensions, setImageDimensions] =
		useState<{ width: number, height: number }>({width: 0, height: 0});

	const [imageAspectRatio, setImageAspectRatio] = useState<number>(0);

	// Если соотношение ещё неизвестно
	if (imageAspectRatio === 0) {
		// return <></>;
	}

	const calculateImageDimensions = (aspectRatio: number) => {
		const availableWidth = nodeWidth - 10;
		const availableHeight = nodeHeight - 10;

		const widthBasedHeight = availableWidth / aspectRatio;
		const heightBasedWidth = availableHeight * aspectRatio;

		if (widthBasedHeight <= availableHeight) {
			setImageDimensions({
				width: availableWidth,
				height: widthBasedHeight,
			});
		} else {
			setImageDimensions({
				width: heightBasedWidth,
				height: availableHeight,
			});
		}
	}

	const handleImageOnLoad = (event: any) => {
		const {naturalWidth, naturalHeight} = event.target;

		if (naturalHeight > 0) {
			const aspectRatio = naturalWidth / naturalHeight;
			setImageAspectRatio(aspectRatio);

			calculateImageDimensions(aspectRatio);
		}
	}

	useEffect(() => {
		if (imageAspectRatio > 0) {
			calculateImageDimensions(imageAspectRatio);
		}
	}, [nodeWidth, nodeHeight, imageAspectRatio]);

	return (
		<img
			alt="image"
			{...imgAttributes}
			onLoad={handleImageOnLoad}
			onDoubleClick={() => handleImageDoubleClick(imageDimensions.width, imageDimensions.height)}
			style={{
				width: `${imageDimensions.width}px`,
				height: `${imageDimensions.height}px`,
			}}
		/>
	);
};

export default ResizeableNodeImage;