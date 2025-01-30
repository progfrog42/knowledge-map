import {motion} from "framer-motion";
import stylesGraphManager from "../../styles/components/GraphManager.module.css"
import React, {useCallback, useState} from "react";
import Input from "../Input.tsx";
import Button from "../Button.tsx";
import {useReactFlow} from "@xyflow/react";

const CreateNodeLayout = () => {

	// Состояние графа
	const reactFlowInstance = useReactFlow();

	const [nodeLabel, setNodeLabel] = useState<string>('');

	// Обработчик изменения строки ввода
	const handleChangeNodeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNodeLabel(e.target.value);
	}

	// Обработчик нажатия на кнопку "Создать узел"
	// Создание нового узла в центре видимой области графа
	const handleAddNode = useCallback(() => {
		const nodes = reactFlowInstance.getNodes();

		// Получаем текущие координаты центра
		const viewport = reactFlowInstance.getViewport();

		// Позиция для нового узла (центр + смещение)
		const centerScreen = {x: window.innerWidth / 2, y: window.innerHeight / 2};

		// Учитываем масштаб для преобразования в координаты canvas
		const centerCanvas = {
			x: (centerScreen.x - viewport.x) / viewport.zoom, // Учитываем масштаб по X
			y: (centerScreen.y - viewport.y) / viewport.zoom, // Учитываем масштаб по Y
		};

		const newNode = {
			id: (nodes.length + 1).toString(), // Уникальный ID
			position: {x: centerCanvas.x, y: centerCanvas.y}, // Позиция
			data: {label: nodeLabel}, // Данные узла
			type: 'customNode',
			measured: {width: 80, height: 106},
		};

		reactFlowInstance.addNodes(newNode); // Добавляем новую ноду

		setNodeLabel('');
	}, [reactFlowInstance]);

	return (
		<motion.div
			className={stylesGraphManager.layout}
			initial={{opacity: 0}}
			animate={{opacity: 1}}
		>
			<div className={stylesGraphManager.line}>
				<h2 style={{margin: 0}}>
					Новый узел
				</h2>
			</div>
			<Input
				componentWrapperClassName={stylesGraphManager.inputMargin}
				inputNameText={'Название узла'}
				inputAttributes={{
					value: nodeLabel,
					onChange: handleChangeNodeLabel,
					placeholder: 'Введите текст'
				}}
			/>
			<Button
				className={stylesGraphManager.buttonMarginAuto}
				onClick={handleAddNode}
			>
				Создать узел
			</Button>
		</motion.div>
	);
};

export default CreateNodeLayout;