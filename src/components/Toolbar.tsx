import React, {useState} from 'react';
import styles from "../styles/components/Toolbar.module.css"
import stylesToolbar from "../styles/components/Toolbar.module.css"
import Button from "./Button.tsx";
import {motion} from "framer-motion";
import classNames from "classnames";
import {useGraph} from "./GraphContext.tsx";
import {CurrentObjectType} from "../types/current-object.type.ts";
import PawnNewIcon from "./icons/PawnNewIcon.tsx";
import PawnAddIcon from "./icons/PawnAddIcon.tsx";
import TextNewIcon from "./icons/TextNewIcon.tsx";
import LinkNewIcon from "./icons/LinkNewIcon.tsx";
import DeleteGroupIcon from "./icons/DeleteGroupIcon.tsx";
import DeleteIcon from "./icons/DeleteIcon.tsx";
import BoxIcon from "./icons/BoxIcon.tsx";
import CardFullIcon from "./icons/CardFullIcon.tsx";
import FormGreenIcon from "./icons/FormGreenIcon.tsx";
import PrinterIcon from "./icons/PrinterIcon.tsx";
import ExportFileIcon from "./icons/ExportFileIcon.tsx";
import {TypeObjectEnum} from "../enums/type-object.ts";
import ToolbarButtonList from "./ToolbarButtonList.tsx";
import CardNoneIcon from "./icons/CardNoneIcon.tsx";
import FormYellowIcon from "./icons/FormYellowIcon.tsx";
import JarIcon from "./icons/JarIcon.tsx";
import DashboardIcon from "./icons/DashboardIcon.tsx";
import ToolboxIcon from "./icons/ToolboxIcon.tsx";
import {useReactFlow, Node} from "@xyflow/react";
import ELK from "elkjs";

export type ControlTabType = {
	id: number | string;
	tab: string;
	sections: React.ReactNode[][];
}

interface ToolbarProps {
	graphMainHandlers: any;
	currentObject: CurrentObjectType | null;
}

const elk = new ELK();

const Toolbar: React.FC<ToolbarProps> = ({graphMainHandlers, currentObject}) => {

	const {isVisibleConnector} = useGraph();

	const reactFlowInstance = useReactFlow();

	const applyELKLayout = async (type: string) => {
		const nodes = reactFlowInstance.getNodes();
		const edges = reactFlowInstance.getEdges();

		const elkGraph = {
			id: "root",
			children: nodes.map((node) => ({
				id: node.id,
				width: node.data.width as number || 80,
				height: node.data.height as number || 80,
			})),
			edges: edges.map((edge) => ({
				id: edge.id,
				sources: [edge.source],
				targets: [edge.target],
			})),
		};

		const options = {
			"elk.algorithm": type,
			// Ориентация графа (например, сверху вниз)
			"elk.direction": "DOWN",
			// Отступ между узлами
			"elk.spacing.nodeNode": "200",
		};

		try {
			console.log(elkGraph);

			const layout = await elk.layout(elkGraph, { layoutOptions: options });

			console.log(layout);

			// Обновляем позиции узлов
			const positionedNodes = nodes.map((node) => {
				const layoutNode = layout.children?.find(n => n.id === node.id);
				const resultNode: Node = {...node, position: {x: layoutNode?.x as number, y: layoutNode?.y as number}};
				return resultNode;
			})

			reactFlowInstance.setNodes(positionedNodes);
		} catch (e) {
			console.error(e);
		}
	}

	// Массив вкладок тулбара
	// Каждая вкладка содержит массив кнопок взаимодействия с объектами
	const controlTabs: ControlTabType[] = [
		{
			id: 1,
			tab: 'Основное',
			sections: [
				[
					<Button
						onClick={graphMainHandlers.handleAddNewNode}
						aria-label={'Кнопка для создания нового узла'}
						title={'Создать новый узел'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<PawnNewIcon className={styles.imageSize}/>
					</Button>,
					<Button
						onClick={graphMainHandlers.handleAddExistNode}
						aria-label={'Кнопка для создания нового узла'}
						title={'Создать новый узел'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<PawnAddIcon className={styles.imageSize}/>
					</Button>,
					<Button
						onClick={graphMainHandlers.handleAddObjectText}
						aria-label={'Кнопка для добавления новой подписи'}
						title={'Добавить подпись'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<TextNewIcon className={styles.imageSize}/>
					</Button>
				],
				[
					<Button
						onClick={graphMainHandlers.handleAddEdge}
						aria-label={'Кнопка для создания новой связи'}
						title={'Создать новую связь'}
						className={classNames(
							styles.controlTabButton, styles.buttonSvg, isVisibleConnector ? styles.selectedButton : ''
						)}
					>
						<LinkNewIcon className={styles.imageSize}/>
					</Button>
				],
				[
					<Button
						onClick={() => graphMainHandlers.handleDeleteObject(TypeObjectEnum.CUSTOM_NODE, currentObject?.object.id)}
						aria-label={'Кнопка для удаления элемента с карты'}
						title={'Удалить элемент с карты'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<DeleteGroupIcon className={styles.imageSize}/>
					</Button>,
					<Button
						onClick={graphMainHandlers.handleDeleteObjectFromDatabase}
						aria-label={'Кнопка для удаления элемента из базы данных'}
						title={'Удалить элемент из базы данных'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<DeleteIcon className={styles.imageSize}/>
					</Button>
				],
				[
					<ToolbarButtonList
						buttonAttributes={{
							"aria-label": 'Кнопка для добавления объектов в подборку',
							title: 'Добавить объекты в подборку',
						}}
						icon={<BoxIcon className={stylesToolbar.imageSize}/>}
					>
						<Button
							clickable={!!currentObject}
							className={styles.buttonListItem}
							onClick={() => graphMainHandlers.handleAddNodeToSelection(currentObject?.object.id)}
						>
							<BoxIcon className={styles.imageSize}/>
							Добавить объект в подборку...
						</Button>
						<Button
							onClick={graphMainHandlers.handleAddAllNodesToSelections}
							className={styles.buttonListItem}
						>
							<BoxIcon className={styles.imageSize}/>
							Добавить все объекты в подборку...
						</Button>
					</ToolbarButtonList>,
					<ToolbarButtonList
						buttonAttributes={{
							"aria-label": 'Кнопка для выбора способа размещения на графической модели',
							title: 'Выбрать способ размещения объектов',
						}}
						icon={<DashboardIcon className={stylesToolbar.imageSize}/>}
					>
						<Button
							className={styles.buttonListItem}
							onClick={() => applyELKLayout("layered")}
						>
							Иерархическая диаграмма
						</Button>
						<Button
							className={styles.buttonListItem}
							onClick={() => applyELKLayout("tree")}
						>
							Древовидная диаграмма
						</Button>
              <Button
                className={styles.buttonListItem}
								onClick={() => applyELKLayout("radial")}
              >
                  Упорядоченная по связям
              </Button>
              <Button
                className={styles.buttonListItem}
								onClick={() => applyELKLayout("force")}
              >
                  Радиальная диаграмма
              </Button>
					</ToolbarButtonList>,
				],
				[
					<ToolbarButtonList
						buttonAttributes={{
							"aria-label": 'Кнопка для открытия и закрытия карточки объекта',
							title: 'Показать карточку объекта',
						}}
						icon={<CardFullIcon className={styles.imageSize}/>}
					>
						<Button
							className={styles.buttonListItem}
						>
							<CardNoneIcon className={styles.imageSize}/>
							Не показывать
						</Button>
						<Button
							className={styles.buttonListItem}
						>
							<FormYellowIcon className={styles.imageSize}/>
							Карточка объекта
						</Button>
						<Button
							className={styles.buttonListItem}
						>
							<JarIcon  className={styles.imageSize}/>
							Данные объекта
						</Button>
					</ToolbarButtonList>
				],
				[
					<Button
						clickable={!!currentObject}
						onClick={() => graphMainHandlers.handleOpenNodeCard(currentObject?.object.id)}
						aria-label={'Кнопка для открытия и закрытия карточки объекта'}
						title={'Показать карточку объекта'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<FormGreenIcon className={styles.imageSize}/>
					</Button>,
					<Button
						onClick={graphMainHandlers.handleOpenParameters}
						aria-label={'Кнопка для открытия параметров пользовательской настройки приложения'}
						title={'Показать параметры'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<ToolboxIcon className={styles.imageSize}/>
					</Button>
				],
				[
					<Button
						onClick={graphMainHandlers.handlePrintGraph}
						aria-label={'Кнопка для печати карты'}
						title={'Печать карты'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<PrinterIcon className={styles.imageSize}/>
					</Button>,
					<Button
						onClick={graphMainHandlers.handleExportGraph}
						aria-label={'Кнопка для сохранения диаграммы локально'}
						title={'Экспорт'}
						className={classNames(styles.controlTabButton, styles.buttonSvg)}
					>
						<ExportFileIcon className={styles.imageSize}/>
					</Button>
				],
			]
		}
	]

	const [currentTabId, setCurrentTabId] = useState<string | number>(1);

	return (
		<div className={styles.controlTabs}>
			<div className={styles.controlLine}>
				{controlTabs.map(el =>
					<Button
						onClick={() => setCurrentTabId(el.id)}
						style={{fill: el.id === currentTabId ? '' : 'brightness(0.9)'}}
						className={styles.controlTabButton}
						key={`3-${el.id}`}
					>
						{el.tab}
					</Button>
				)}
			</div>
			<motion.div
				initial={{opacity: 0}}
				animate={{opacity: 1}}
				className={styles.controlLine}
				key={currentTabId}
			>
				{controlTabs.find(el => el.id === currentTabId)?.sections.map((section: any[], idx) =>
					<div
						key={`1-${idx}`}
						className={styles.controlLineSection}
					>
						{section.map((el: any, i) =>
							<>
								{React.cloneElement(el, {key: `2-${i}}`})}
							</>
						)}
					</div>
				)}
			</motion.div>
		</div>
	);
};

export default Toolbar;