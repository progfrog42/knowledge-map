import {AnimatePresence, motion} from "framer-motion";
import styles from "../styles/components/GraphModal.module.css"
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    addEdge,
    Background,
    BackgroundVariant,
    Connection,
    Edge,
    Node,
    OnSelectionChangeParams,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
} from "@xyflow/react";
import Button from "./Button.tsx";
import {CurrentObjectType} from "../types/current-object.type.ts";
import CustomNode from "./nodes/CustomNode.tsx";
import {useGraph} from './GraphContext.tsx';
import {TypeObjectEnum} from "../enums/type-object.ts";
import AnnotationNode from "./nodes/AnnotationNode.tsx";
import ManageAnnotationModal, {ManageAnnotationProps} from "./modals/ManageAnnotationModal.tsx";
import Toolbar from "./Toolbar.tsx";
import ContextMenu, {ContextMenuType, ContextType} from "./ContextMenu.tsx";
import NodeParametersModal, {NodeParametersModalType} from "./modals/NodeParametersModal.tsx";
import AddToSelectionsModal, {AddToSelectionsModalProps} from "./modals/AddToSelectionsModal.tsx";
import {getDataForNewNode, transformCoordinatesWithViewport} from "../functions/nodeGeneration.ts";
import GraphParametersModal from "./modals/GraphParametersModal.tsx";

interface GraphModalProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const rfStyle = {
	backgroundColor: '#E1F5FE',
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const GraphModal: React.FC<GraphModalProps> = ({isOpen, setIsOpen}) => {

	// Состояние графа
	const reactFlowInstance = useReactFlow();

	// Узлы
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	// Отношения
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

	const nodeTypes = useMemo(() => ({
		customNode: CustomNode,
		annotationNode: AnnotationNode,
	}), []);

	// Референс на модальное окно
	const modalRef = useRef<HTMLDivElement | null>(null);

	const [currentObject, setCurrentObject] = useState<CurrentObjectType | null>(null);

	// Состояние контекстного меню
	const [stateContextMenu, setStateContextMenu] = useState<ContextMenuType | null>(null);
	// Состояние модального окна для управления узлом на графе
	const [stateNodeParametersModal, setStateNodeParametersModal] = useState<NodeParametersModalType>(null);
	// Состояние модального окна для управления выбранной аннотацией
	const [stateAnnotationModal, setStateAnnotationModal] = useState<ManageAnnotationProps>(null);
	//
	const [stateSelectionsModal, setStateSelectionsModal] = useState<AddToSelectionsModalProps>(null);
	// Состояние модального окна параметров
	const [isOpenParametersModal, setIsOpenParametersModal] = useState(false);

	const {setVisibilityConnector, toggleVisibilityConnector} = useGraph();

	// Обработчик нажатия на кнопку "Создать узел"
	// Создание нового узла в центре видимой области графа
	const handleAddNewNode = useCallback(() => {
		const {maxId, centerOfVisibleCanvas} = getDataForNewNode(reactFlowInstance);

		let x = centerOfVisibleCanvas.x, y = centerOfVisibleCanvas.y;

		if (stateContextMenu) {

			const viewport = reactFlowInstance.getViewport();

			const coordinates = transformCoordinatesWithViewport(
				stateContextMenu.x - 40, stateContextMenu.y - 40, viewport
			);

			x = coordinates.x;
			y = coordinates.y;
		}

		const newNode = {
			id: (maxId + 1).toString(), // Уникальный ID
			position: {x, y}, // Позиция
			data: {imageLink: 'https://random.imagecdn.app/300/200'}, // Данные узла
			type: 'customNode',
		};

		reactFlowInstance.addNodes(newNode); // Добавляем новую ноду
	}, [reactFlowInstance, stateContextMenu]);

	const handleAddExistNode = () => {

	}

	const handleAddEdge = () => {
		toggleVisibilityConnector();
	}

	// Обработка нажатия на кнопку удаления выбранного объекта
	const handleDeleteObject = useCallback((typeObject: TypeObjectEnum, objectId: string | null | undefined) => {
		// Удаление выбранной ноды
		const deleteCurrentNode = () => {
			if (!reactFlowInstance) return;

			// Поиск элемента
			const elementToDelete = [
				...reactFlowInstance.getNodes(),
			].find((el) => el.id === objectId);

			// Поиск связей в которых он участвует
			const edgesToDelete = [
				...reactFlowInstance.getEdges(),
			].filter((el) => el.source === objectId || el.target === objectId);

			if (elementToDelete) {
				reactFlowInstance.deleteElements({
					nodes: [
						{id: elementToDelete.id},
					],
					edges: edgesToDelete,
				}).then();
			}
		};

		// Удаление выбраной связи
		const deleteCurrentEdge = () => {
			if (!reactFlowInstance) return;

			// Поиск элемента
			const elementToDelete = [
				...reactFlowInstance.getEdges(),
			].find((el) => el.id === objectId);

			if (elementToDelete) {
				reactFlowInstance.deleteElements({edges: [{id: elementToDelete.id}]}).then();
			}
		}

		if (objectId) {
			switch (typeObject) {
				case TypeObjectEnum.ANNOTATION_NODE:
				case TypeObjectEnum.CUSTOM_NODE:
					deleteCurrentNode();
					break;
				case TypeObjectEnum.EDGE:
					deleteCurrentEdge();
					break;
				default:
					break;
			}
			setCurrentObject(null);
		}
	}, [reactFlowInstance]);

	// Открыть модальное окно для редактирования подписи узла
	const handleAddObjectText = useCallback(() => {
		if (currentObject && currentObject.typeObject === TypeObjectEnum.ANNOTATION_NODE) {
			setStateAnnotationModal({
				closeModal: () => setStateAnnotationModal(null),
				nodeId: currentObject.object.id,
			})
		} else {
			setStateAnnotationModal({
				closeModal: () => setStateAnnotationModal(null),
				nodeId: null,
			})
		}
	}, [currentObject]);

	const handleDeleteNodeFromDatabase = useCallback(() => {

	}, [])

	const handleAddNodeToSelection = useCallback((id: string | undefined) => {
		if (id) {
			setStateSelectionsModal({
				closeModal: () => setStateSelectionsModal(null),
				nodeId: id,
			});
		}
	}, []);

	const handleAddAllNodesToSelections = useCallback(() => {
		setStateSelectionsModal({
			closeModal: () => setStateSelectionsModal(null),
		});
	}, []);

	const handleOpenNodeCard = useCallback((nodeId: string | undefined) => {
		if (nodeId) {
			setStateNodeParametersModal({
				nodeId,
				closeModal: () => setStateNodeParametersModal(null),
			})
		}
	}, []);

	const handleOpenParameters = useCallback(() => {
		setIsOpenParametersModal(true);
	}, []);

	const handlePrintGraph = useCallback(() => {

	}, []);

	const handleExportGraph = useCallback(() => {

	}, [])

	const onConnect = useCallback(
		(connection: Connection | Edge) => {

			const isEdgeExist = !!edges.find((el: Edge) =>
				(el.target === connection.source && el.source === connection.target) ||
				(el.target === connection.target && el.source === connection.source)
			);

			// Проверяем, есть ли уже связь между элементами
			if (isEdgeExist) {
				return;
			}

			// Проверка условия, например, предотвращение соединения с самой собой
			if (connection.source === connection.target) {
				alert('Невозможно соединить ноду с самой собой');
				return; // Прекращаем создание связи
			}

			// Если проверка пройдена, добавляем связь
			const newConnection = {...connection, type: 'straight'};
			setEdges((eds: Edge[]) => addEdge(newConnection, eds));
			setVisibilityConnector(false);
		},
		[edges, setEdges]
	)

	const handleSelectionChange = useCallback((event: OnSelectionChangeParams) => {
		const {nodes: selectedNodes, edges: selectedEdges} = event;

		// Если выбрана хотя бы одна нода
		if (selectedNodes.length > 0 && selectedEdges.length === 0) {
			const selectedNodeId = selectedNodes[0].id;

			selectNode(null, selectedNodes[0]);

			// Убираем выделение со всех связей
			setEdges((eds) =>
				eds.map((edge) => {
					const {selected, ...rest} = edge;
					return rest;
				})
			);

			// Выделяем только выбранную ноду
			setNodes((nds) =>
				nds.map((node) =>
					node.id === selectedNodeId
						? {...node, selected: true}
						: (() => {
							const {selected, ...rest} = node;
							return rest;
						})()
				)
			);
		}
		// Если выбрана хотя бы одна связь
		else if (selectedEdges.length > 0 && selectedNodes.length === 0) {
			const selectedEdgeId = selectedEdges[0].id;

			selectEdge(null, selectedEdges[0]);

			// Убираем выделение со всех нод
			setNodes((nds) =>
				nds.map((node) => {
					const {selected, ...rest} = node;
					return rest;
				})
			);

			// Выделяем только выбранную связь
			setEdges((eds) =>
				eds.map((edge) =>
					edge.id === selectedEdgeId
						? {...edge, selected: true}
						: (() => {
							const {selected, ...rest} = edge;
							return rest;
						})()
				)
			);
		} else {
			clearCurrentObject();

			// Если ничего не выбрано, убираем выделение со всех объектов
			setNodes((nds) =>
				nds.map((node) => {
					const {selected, ...rest} = node;
					return rest;
				})
			);

			setEdges((eds) =>
				eds.map((edge) => {
					const {selected, ...rest} = edge;
					return rest;
				})
			);
		}
	}, []);

	// Обработчик открытия контекстного меню на графе
	const handleGraphContextMenu = (event: any) => {
		event.preventDefault();
		setStateContextMenu({x: event.clientX - 75, y: event.clientY - 20, type: ContextType.GRAPH});
	};

	// Обработчик открытия контекстного меню на узле
	const handleNodeContextMenu = (event: any, node: Node) => {
		if (node.type === TypeObjectEnum.CUSTOM_NODE) {
			event.preventDefault();
			setStateContextMenu({x: event.clientX - 75, y: event.clientY - 20, type: ContextType.NODE, objectId: node.id});
		}
		event.stopPropagation();
	};

	// Обработка выбора ноды
	const selectNode = (_: any, node: Node) => {
		setCurrentObject({
			object: node,
			typeObject: node.type as TypeObjectEnum,
		});
	}

	// Обработка выбора связи
	const selectEdge = (_: any, edge: Edge) => {
		setCurrentObject({
			object: edge,
			typeObject: TypeObjectEnum.EDGE,
		});
	}

	// Сбрасываем состояние выбранного объекта
	const clearCurrentObject = () => {
		setCurrentObject(null);
	}

	// Закрытие окна с графом
	const closeModal = () => {
		setIsOpen(false);
	}

	// Объект с обработчиками нажатий кнопок,
	// которые есть одновременно в тулбаре и в контекстном меню
	const graphMainHandlers = {
		handleAddNewNode,
		handleAddExistNode,
		handleAddObjectText,
		handleAddEdge,
		handleDeleteObject,
		handleDeleteNodeFromDatabase,
		handleAddNodeToSelection,
		handleAddAllNodesToSelections,
		handleOpenNodeCard,
		handleOpenParameters,
		handlePrintGraph,
		handleExportGraph,
	}

	// Следим за тем, чтобы selected было максимум у одного объекта на графе
	useEffect(() => {
		setNodes((nds) =>
			nds.map((node) => {
				if (node.id === currentObject?.object.id) {
					return {...node, selected: true};
				}
				const {selected, ...rest} = node; // Удаляем свойство selected
				return rest;
			})
		);
		setEdges((eds) =>
			eds.map((edge) => {
				if (edge.id === currentObject?.object.id) {
					return {...edge, selected: true};
				}
				const {selected, ...rest} = edge; // Удаляем свойство selected
				return rest;
			})
		);
	}, [currentObject, setNodes, setEdges]);

	return (
		<AnimatePresence>
			{isOpen && (
				<div className={styles.contentWrapper}>
					<motion.div
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						exit={{opacity: 0}}
						transition={{
							duration: 0.4,
						}}
						className={styles.background}
					/>
					<motion.div
						className={styles.modal}
						ref={modalRef}
						initial={{opacity: 0, scale: 0.95}}
						animate={{opacity: 1, scale: 1}}
						exit={{opacity: 0, scale: 0.95}}
						transition={{
							duration: 0.4,
							type: 'spring'
						}}
					>
						<div className={styles.graphWrapper}>
							<GraphParametersModal
								props={{
									isOpenParametersModal,
									closeModal: () => setIsOpenParametersModal(false),
								}}
							/>
							<AddToSelectionsModal
								props={stateSelectionsModal}
							/>
							<ManageAnnotationModal props={stateAnnotationModal}/>
							<NodeParametersModal props={stateNodeParametersModal}/>
							<ContextMenu
								graphMainHandlers={graphMainHandlers}
								contextMenuState={stateContextMenu}
								closeMenu={() => setStateContextMenu(null)}
								modalRef={modalRef}
							/>
							<Toolbar
								graphMainHandlers={graphMainHandlers}
								currentObject={currentObject}
							/>
							<Button
								aria-label={'Кнопка для закрытия модального окна с картой'}
								title={'Закрыть карту'}
								className={styles.closeModal}
								onClick={closeModal}
							>
								Закрыть карту
							</Button>
							<ReactFlow
								nodes={nodes}
								edges={edges}
								onNodesChange={onNodesChange}
								onEdgesChange={onEdgesChange}
								style={rfStyle}
								nodeTypes={nodeTypes}
								onConnect={onConnect}
								onSelectionChange={handleSelectionChange}
								onNodeContextMenu={handleNodeContextMenu}
								onContextMenu={handleGraphContextMenu}
							>
								<Background
									variant={BackgroundVariant.Dots}    /* тип фона - "dots" для точек */
									gap={20}          /* расстояние между точками */
									size={1}          /* размер точек */
									color="#000"      /* цвет точек */
								/>
							</ReactFlow>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default GraphModal;