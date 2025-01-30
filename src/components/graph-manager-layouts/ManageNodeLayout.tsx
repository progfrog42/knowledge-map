import {motion} from 'framer-motion';
import stylesGraphManager from '../../styles/components/GraphManager.module.css'
import {GraphManagerProps} from "../GraphManager.tsx";
import React, {useCallback} from "react";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import {ButtonStylesEnum} from "../../enums/button-styles.enum.ts";
import {useReactFlow} from "@xyflow/react";

const ManageNodeLayout = ({currentObject, setCurrentObject}: GraphManagerProps) => {

	// Состояние графа
	const reactFlowInstance = useReactFlow();

	// Обработчик изменения строки ввода
	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const newLabel = event.target.value;

			if (currentObject && reactFlowInstance) {
				reactFlowInstance.updateNodeData(currentObject.object.id, {label: newLabel});
			}
		},
		[reactFlowInstance, currentObject]
	);

	// Обработчик нажатия на кнопку (очистка выбранного элемента)
	const handleClickCleanCurrentObject = () => {
		if (setCurrentObject) {
			setCurrentObject(null);
		}
	}

	// Удаление объекта
	const deleteNodeById = useCallback(
		() => {
			if (!reactFlowInstance || !currentObject) return;

			// Поиск элемента
			const elementToDelete = [
				...reactFlowInstance.getNodes(),
			].find((el) => el.id === currentObject.object.id);

			// Поиск связей в которых он участвует
			const edgesToDelete = [
				...reactFlowInstance.getEdges(),
			].filter((el) => el.source === currentObject.object.id || el.target === currentObject.object.id);

			if (elementToDelete) {
				reactFlowInstance.deleteElements({
					nodes: [
						{id: elementToDelete.id},
					],
					edges: edgesToDelete,
				}).then();
			}
		},
		[currentObject, reactFlowInstance]
	);

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			className={stylesGraphManager.layout}
		>
			<div className={stylesGraphManager.line}>
				<h2 style={{margin: 0}}>
					Узел
				</h2>
			</div>
			<Input
				componentWrapperClassName={stylesGraphManager.inputMargin}
				inputNameText={'Название узла'}
				inputAttributes={{
					value: currentObject?.object.data?.label as string,
					onChange: handleInputChange,
					placeholder: 'Введите текст'
				}}
			/>
			<div className={stylesGraphManager.line}>
				<p className={stylesGraphManager.pText}>
					ID объекта: {currentObject?.object.id}
				</p>
			</div>
			<div className={stylesGraphManager.line}>
				<p className={stylesGraphManager.pText}>
					Позиция:
					{currentObject && 'position' in currentObject.object && (
						<>
							X:
							{currentObject.object.position.x.toFixed(0)};
							Y:
							{currentObject.object.position.y.toFixed(0)}
						</>
					)}
				</p>
			</div>
			<Button
				className={stylesGraphManager.buttonMarginAuto}
				onClick={handleClickCleanCurrentObject}
			>
				Очистить выбор
			</Button>
			<Button
				btnStyle={ButtonStylesEnum.RED}
				onClick={deleteNodeById}
				style={{marginTop: '10px'}}
			>
				Удалить объект
			</Button>
		</motion.div>
	);
};

export default ManageNodeLayout;