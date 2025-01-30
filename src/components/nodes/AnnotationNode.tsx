import React from 'react';
import {NodeProps, NodeResizeControl, Position} from "@xyflow/react";
import styles from "../../styles/components/nodes/AnnotationNode.module.css"
import classNames from "classnames";

const AnnotationNode: React.FC<NodeProps> = ({data, selected}) => {

	const label = (data as { label: React.ReactNode }).label
	const color = (data as { color: string }).color;

	return (
		<>
			{selected && (
				<>
					<NodeResizeControl
						position={Position.Left} // Левый контрол
						style={{
							cursor: 'ew-resize',
							width: 10,
							height: 10,
						}}
					/>
					<NodeResizeControl
						position={Position.Right} // Правый контрол
						style={{
							cursor: 'ew-resize',
							width: 10,
							height: 10,
						}}
					/>
				</>
			)}
			<div
				className={classNames(styles.annotationContent, selected ? styles.annotationNodeSelected : '')}
				style={{color: color || "#000000"}}
			>
				{label}
			</div>
		</>
	);
};

export default AnnotationNode;