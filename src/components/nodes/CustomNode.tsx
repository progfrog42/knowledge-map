import {Handle, NodeProps, NodeResizeControl, Position} from "@xyflow/react";
import styles from "../../styles/components/nodes/CustomNode.module.css"
import classNames from "classnames";
import {useGraph} from '../GraphContext.tsx';
import ResizeableNodeImage from "../ResizeableNodeImage.tsx";
import {MIN_CUSTOM_NODE_SIZE} from "../../consts/consts.ts";
import {NameSettingEnum} from "../modals/GraphParametersModal.tsx";
import {motion} from "framer-motion";

const CustomNode = (
	{width, height, data, selected}: NodeProps
) => {
	const label = (data as { label: string }).label;
	const imageLink = (data as { imageLink: string }).imageLink;

	const { isVisibleConnector, stateGraphParameters } = useGraph();

	const showLabel = (labelString: string) => {
		switch (stateGraphParameters.nameSetting) {
			case NameSettingEnum.HIDE_NAME:
				return '';
			case NameSettingEnum.FIRST_50_SYMBOLS:
				return `${labelString.substring(0, 50)}${labelString.length > 50 ? '...' : ''}`;
			case NameSettingEnum.FULL_NAME:
				return labelString;
		}
	}

	return (
		<div className={styles.nodeWrapper}>
			<NodeResizeControl
				color="#ff0071"
				minWidth={MIN_CUSTOM_NODE_SIZE}
				minHeight={MIN_CUSTOM_NODE_SIZE}
				onResize={(_: any, {width, height}) => {
					data.width = width;
					data.height = height;
				}}
			/>
			<motion.div
				initial={{opacity: 0, scale: 0}}
				animate={{opacity: 1, scale: 1}}
				className={classNames(styles.node, selected ? styles.selectedNode : '')}
				style={{
					width: `${data.width}px`,
					height: `${data.height}px`,
				}}
			>
				{imageLink && (
					<ResizeableNodeImage
						nodeWidth={width || MIN_CUSTOM_NODE_SIZE}
						nodeHeight={height || MIN_CUSTOM_NODE_SIZE}
						handleImageDoubleClick={() => {
						}}
						imgAttributes={{
							className: styles.nodeImage,
							src: imageLink,
						}}
					/>
				)}
				<Handle
					type="target"
					position={Position.Top}
					style={{
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: isVisibleConnector ? 1 : 0,
						pointerEvents: isVisibleConnector ? 'auto' : 'none',
					}}
				/>
				<Handle
					type="source"
					position={Position.Bottom}
					style={{
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: isVisibleConnector ? 1 : 0,
						pointerEvents: isVisibleConnector ? 'auto' : 'none',
					}}
				/>
			</motion.div>
			<label
				className={styles.label}
			>
				{showLabel(label || '')}
			</label>
		</div>
	)
}

export default CustomNode;