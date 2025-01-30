import {motion} from "framer-motion";
import {GraphManagerProps} from "../GraphManager.tsx";
import stylesGraphManager from "../../styles/components/GraphManager.module.css";
import React, {useCallback, useEffect, useState} from "react";
import Input from "../Input.tsx";
import {ButtonStylesEnum} from "../../enums/button-styles.enum.ts";
import Button from "../Button.tsx";
import {useReactFlow} from "@xyflow/react";
import Dropdown, {DropdownElementType} from "../Dropdown.tsx";

const ManageEdgeLayout = ({currentObject, setCurrentObject}: GraphManagerProps) => {

	// Состояние графа
	const reactFlowInstance = useReactFlow();

	// Список состояний анимаций
	const dropdownElements: DropdownElementType[] = [
		{
			id: 1,
			content: 'Статичная'
		},
		{
			id: 2,
			content: 'Анимированная'
		}
	];

	// Состояние анимации связи
	const [selectedEdgeAnimate, setSelectedEdgeAnimate] = useState<DropdownElementType>(
		currentObject && 'animated' in currentObject.object && currentObject.object.animated === true ?
			dropdownElements[1]
			:
			dropdownElements[0]
	);

	// Обработчик изменения строки ввода (названия)
	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newLabel = event.target.value;

			if (currentObject && reactFlowInstance) {
				const edge = reactFlowInstance.getEdge(currentObject.object.id);
				reactFlowInstance.updateEdge(currentObject.object.id, {...edge, label: newLabel});
			}
		},
		[reactFlowInstance, currentObject]
	);

	// Изменение состояния анимации связи на графе
	const handleAnimatedChange = useCallback(
		(isAnimated: boolean) => {
			if (reactFlowInstance && currentObject) {
				if (isAnimated) {
					reactFlowInstance.updateEdge(currentObject.object.id, {...currentObject.object, animated: isAnimated});
				} else {
					const currentEdges = reactFlowInstance.getEdges();

					// Создаем новый массив с обновленными ребрами
					const updatedEdges = currentEdges.map((edge) =>
						edge.id === currentObject.object.id
							? {...edge, animated: undefined} // Удаляем поле animated
							: edge
					);

					// Обновляем список ребер
					reactFlowInstance.setEdges(updatedEdges);
				}
			}
		},
		[reactFlowInstance, currentObject]
	);

	// Обработчик нажатия на кнопку
	const handleClickCleanCurrentObject = () => {
		if (setCurrentObject) {
			setCurrentObject(null);
		}
	}

	// Удаление объекта
	const deleteElementById = useCallback(
		() => {
			if (!reactFlowInstance || !currentObject) return;

			const elementToDelete = [
				...reactFlowInstance.getEdges(),
			].find((el) => el.id === currentObject.object.id);

			if (elementToDelete) {
				reactFlowInstance.deleteElements({edges: [{id: elementToDelete.id}]}).then();
			}
		},
		[currentObject, reactFlowInstance]
	);

	// Если изменилось selectedEdgeAnimate, то меняем состояние в графе
	useEffect(() => {
		if (selectedEdgeAnimate.id === 1) {
			handleAnimatedChange(false);
		} else if (selectedEdgeAnimate.id === 2) {
			handleAnimatedChange(true);
		}
	}, [selectedEdgeAnimate]);

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			className={stylesGraphManager.layout}
		>
			<div className={stylesGraphManager.line}>
				<h2 style={{margin: 0}}>
					Связь
				</h2>
			</div>
			<Input
				componentWrapperClassName={stylesGraphManager.inputMargin}
				inputNameText={'Название связи'}
				inputAttributes={{
					value: currentObject && 'label' in currentObject.object ? currentObject.object.label?.toString() : '',
					onChange: handleInputChange,
					placeholder: 'Введите текст'
				}}
			/>
			<div className={stylesGraphManager.line}>
				<p className={stylesGraphManager.pText}>
					ID объекта: {currentObject?.object?.id}
				</p>
			</div>
			<Dropdown
				wrapperAttributes={{
					className: stylesGraphManager.inputMargin,
				}}
				dropdownHeader={'Анимация связи'}
				selectedElement={selectedEdgeAnimate}
				setSelectedElement={setSelectedEdgeAnimate}
				elements={dropdownElements}
			/>
			<Button
				className={stylesGraphManager.buttonMarginAuto}
				onClick={handleClickCleanCurrentObject}
			>
				Очистить выбор
			</Button>
			<Button
				btnStyle={ButtonStylesEnum.RED}
				onClick={deleteElementById}
				style={{marginTop: '10px'}}
			>
				Удалить объект
			</Button>
		</motion.div>
	);
};

export default ManageEdgeLayout;