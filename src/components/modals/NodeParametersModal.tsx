import React, {useCallback, useEffect, useState} from 'react';
import {AnimatePresence} from "framer-motion";
import stylesModal from "../../styles/components/modals/Modal.module.css";
import stylesInput from "../../styles/components/Input.module.css"
import styles from "../../styles/components/modals/NodeParametersModal.module.css"
import Button from "../Button.tsx";
import Close from "../svg/Close.tsx";
import Input from "../Input.tsx";
import {useReactFlow} from "@xyflow/react";
import ModalWrapper from "./ModalWrapper.tsx";

export type NodeParametersModalType = {
	closeModal: () => void;
	nodeId: string;
} | null;

const NodeParametersModal: React.FC<{ props: NodeParametersModalType }> = ({props}) => {

	// Состояние графа
	const reactFlowInstance = useReactFlow();

	const [label, setLabel] = useState<string>("");
	const [note, setNote] = useState<string>("");

	const [fixPosition, setFixPosition] = useState<boolean>(false);

	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(URL.createObjectURL(file));
		}
	};

	const saveNodeData = useCallback(
		(label: string, note: string, imageLink: string | null, isFixPosition: boolean) => {

			if (note) {
				note = note
					.split('\n')
					.filter((line) => line.trim() !== '')
					.join('\n');
			}

			if (props && reactFlowInstance) {
				reactFlowInstance.updateNodeData(props.nodeId, {label, note, imageLink, isFixPosition});
			}
		}, [reactFlowInstance, props])

	const handleSaveAndCloseModal = () => {
		saveNodeData(label, note, selectedImage, fixPosition);
		console.log(props);
		props?.closeModal();
	}

	useEffect(() => {
		if (props) {
			const node = reactFlowInstance.getNode(props.nodeId);
			setLabel(node?.data.label as string);
			setNote(node?.data.note as string);
			setSelectedImage(node?.data.imageLink as string);
			setFixPosition(node?.data.isFixPosition as boolean);
		} else {
			setLabel('');
			setNote('');
			setSelectedImage(null);
			setFixPosition(false);
		}
	}, [props]);

	return (
		<AnimatePresence>
			{props && (
				<ModalWrapper modalAttrs={{className: styles.modal}}>
					<div className={stylesModal.headerLine}>
						<h3 className={stylesModal.headerText}>
							Параметры узла карты знания
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
					<Input
						inputNameText={'Наименование'}
						inputAttributes={{
							value: label,
							onChange: (e) => setLabel(e.target.value),
						}}
					/>
					<div className={styles.inputImageBlock}>
						<p
							className={stylesInput.inputName}
							style={{marginBottom: 0}}
						>
							Значок:
						</p>
						{selectedImage && (
							<img
								className={styles.selectedImage}
								src={selectedImage}
								alt="selected"
							/>
						)}
						<label
							className={styles.labelSelectImage}
							htmlFor="fileInput"
						>
							. . .
						</label>
						<input
							id="fileInput"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							style={{
								display: "none",
							}}
						/>
					</div>
					<div className={styles.textareaBlock}>
						<p className={stylesInput.inputName}>Примечание</p>
						<textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							className={styles.textarea}
						/>
					</div>
					<div className={styles.checkboxBlock}>
						<input
							type="checkbox"
							checked={fixPosition}
							onChange={(e) => setFixPosition(e.target.checked)}
						/>
						Зафиксировать положение на карте знаний
					</div>
					<Button
						onClick={handleSaveAndCloseModal}
						aria-label={'Кнопка для закрытия модального окна'}
						title={'Сохранить и закрыть окно'}
					>
						Сохранить
					</Button>
				</ModalWrapper>
			)}
		</AnimatePresence>
	)
		;
};

export default NodeParametersModal;