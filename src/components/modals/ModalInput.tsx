import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import styles from "../../styles/components/modals/ModalInput.module.css"
import stylesModal from "../../styles/components/modals/Modal.module.css"
import classNames from "classnames";
import Button from "../Button.tsx";
import Input from "../Input.tsx";
import {TypeObjectEnum} from "../../enums/type-object.ts";
import {useReactFlow} from "@xyflow/react";

export type ModalInputStateType = {
	headerText: string;
	objectId: string;
	typeObject: TypeObjectEnum | null;
	isOpen: boolean;
}

export interface ModalInputProps {
	stateModalInput: ModalInputStateType;
	closeModal: () => void;
}

const ModalInput: React.FC<ModalInputProps> = ({stateModalInput, closeModal}) => {

	// Состояние графа
	const reactFlowInstance = useReactFlow();

	const [currentLabel, setCurrentLabel] = useState<string>('');

	// Обработка изменения названия узла
	const handleChangeNodeLabel = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newLabel = event.target.value;

			if (stateModalInput && reactFlowInstance) {
				reactFlowInstance.updateNodeData(stateModalInput.objectId, {label: newLabel});
				setCurrentLabel(newLabel);
			}
		},
		[reactFlowInstance, stateModalInput]
	);

	// Обработка изменения названия связи
	const handleChangeEdgeLabel = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newLabel = event.target.value;

			if (stateModalInput && reactFlowInstance) {
				const edge = reactFlowInstance.getEdge(stateModalInput.objectId);
				reactFlowInstance.updateEdge(stateModalInput.objectId, {...edge, label: newLabel});
				setCurrentLabel(newLabel);
			}
		},
		[reactFlowInstance, stateModalInput]
	);

	// Общая функция обработки изменения инпута
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		switch (stateModalInput.typeObject) {
			case TypeObjectEnum.CUSTOM_NODE:
				handleChangeNodeLabel(event);
				break;
			case TypeObjectEnum.EDGE:
				handleChangeEdgeLabel(event);
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		if (stateModalInput.isOpen) {

		} else {
			setCurrentLabel('');
		}
	}, [stateModalInput]);

	return (
		<AnimatePresence>
			{stateModalInput.isOpen && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					className={classNames(stylesModal.overlay, styles.overlay)}
				>
					<motion.div
						initial={{transform: 'translateY(-4rem)'}}
						animate={{transform: 'translateY(0)'}}
						exit={{transform: 'translateY(-4rem)'}}
						className={styles.modal}
					>
						<h3 className={stylesModal.headerText}>Введите подпись узла</h3>
						<Input
							componentWrapperClassName={styles.input}
							inputAttributes={{
								placeholder: 'Введите текст...',
								value: currentLabel,
								onChange: handleInputChange,
							}}
						/>
						<Button
							onClick={closeModal}
							className={styles.btnClose}
							aria-label={'Кнопка для закрытия модального окна ввода'}
							title={'Сохранить текст и закрыть окно'}
						>
							Сохранить и закрыть
						</Button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ModalInput;