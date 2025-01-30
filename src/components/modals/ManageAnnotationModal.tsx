import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import stylesModal from "../../styles/components/modals/Modal.module.css"
import styles from "../../styles/components/modals/ManageAnnotationModal.module.css"
import classNames from "classnames";
import Close from "../svg/Close.tsx";
import Button from "../Button.tsx";
import {useReactFlow} from "@xyflow/react";
import {getDataForNewNode} from "../../functions/nodeGeneration.ts";

export type ManageAnnotationProps = {
	closeModal: () => void;
	nodeId: string | null | undefined;
} | null;

const ManageAnnotationModal: React.FC<{ props: ManageAnnotationProps }> = ({props}) => {

	// Состояние графа
	const reactFlowInstance = useReactFlow();

	const [text, setText] = useState<string>("");
	const [textColor, setTextColor] = useState<string>("#000000");
	const [buttonText, setButtonText] = useState<string>("");

	// Обработка изменения названия узла
	const handleChangeNodeLabel = useCallback(
		(label: string, color: string) => {

			label = label
				.split('\n')
				.filter((line) => line.trim() !== '')
				.join('\n');

			if (label.length === 0) {
				alert("Введите текст");
				return;
			}

			if (props && props.nodeId && reactFlowInstance) {
				reactFlowInstance.updateNodeData(props.nodeId, {label, color});
			}
		},
		[reactFlowInstance, props]
	);

	// Создание нового текстового узла в центре видимой области графа
	const handleAddAnnotationNode = useCallback((label: string, color: string) => {
		const {maxId, centerOfVisibleCanvas} = getDataForNewNode(reactFlowInstance);

		label = label
			.split('\n')
			.filter((line) => line.trim() !== '')
			.join('\n');

		if (label.length === 0) {
			alert("Введите текст");
			return;
		}

		const newNode = {
			id: (maxId + 1).toString(), // Уникальный ID
			position: {x: centerOfVisibleCanvas.x, y: centerOfVisibleCanvas.y}, // Позиция
			data: {label, color}, // Данные узла
			type: 'annotationNode',
		};

		reactFlowInstance.addNodes(newNode); // Добавляем новую ноду
	}, [reactFlowInstance]);

	const handleButtonClick = () => {
		if (props?.nodeId) {
			handleChangeNodeLabel(text, textColor);
		} else {
			handleAddAnnotationNode(text, textColor);
		}
		props?.closeModal();
	}

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextColor(event.target.value);
	};

	useEffect(() => {
		if (props?.nodeId) {
			setButtonText("Сохранить текст")
			const node = reactFlowInstance.getNode(props.nodeId);
			setText(node?.data.label as string);
			setTextColor(node?.data.color as string);
		} else {
			setButtonText("Добавить аннотацию")
			setText("");
			setTextColor("#000000");
		}
	}, [props]);

	return (
		<AnimatePresence>
			{props && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					className={classNames(stylesModal.overlay)}
				>
					<motion.div
						className={classNames(stylesModal.modalComponent, styles.modal)}
						initial={{transform: 'translateY(-4rem)'}}
						animate={{transform: 'translateY(0)'}}
						exit={{transform: 'translateY(-4rem)'}}
					>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
							<h3 className={stylesModal.headerText}>
								Введите текст аннотации
							</h3>
							<Button
								onClick={props.closeModal}
								className={stylesModal.closeButton}
								aria-label={'Кнопка для закрытия окна'}
								title={'Закрыть окно'}
							>
								<Close className={stylesModal.closeSvg}/>
							</Button>
						</div>
						<textarea
							value={text}
							onChange={e => setText(e.target.value)}
							className={styles.textarea}
						/>
						<div className={styles.colorLine}>
							<p className={styles.colorText}>
								Цвет текста
							</p>
							<input
								type="color"
								value={textColor}
								onChange={handleColorChange}
								className={styles.inputColor}
							/>
						</div>
						<Button
							onClick={handleButtonClick}
							aria-label={'Кнопка для закрытия модального окна ввода'}
							title={'Сохранить текст и закрыть окно'}
						>
							{buttonText}
						</Button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ManageAnnotationModal;