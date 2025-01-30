import React, {useEffect, useRef, useState} from 'react';
import styles from "../styles/components/ContextMenu.module.css"
import {AnimatePresence, motion} from "framer-motion";
import Button from "./Button.tsx";
import PawnAddIcon from "./icons/PawnAddIcon.tsx";
import PawnNewIcon from "./icons/PawnNewIcon.tsx";
import TextNewIcon from "./icons/TextNewIcon.tsx";
import LinkNewIcon from "./icons/LinkNewIcon.tsx";
import BranchIcon from "./icons/BranchIcon.tsx";
import KnowledgeBaseArticleIcon from "./icons/KnowledgeBaseArticleIcon.tsx";
import DeleteIcon from "./icons/DeleteIcon.tsx";
import DeleteGroupIcon from "./icons/DeleteGroupIcon.tsx";
import FormYellowIcon from "./icons/FormYellowIcon.tsx";
import BoxIcon from "./icons/BoxIcon.tsx";
import FormGreenIcon from "./icons/FormGreenIcon.tsx";
import PrinterIcon from "./icons/PrinterIcon.tsx";
import ExportFileIcon from "./icons/ExportFileIcon.tsx";
import {TypeObjectEnum} from "../enums/type-object.ts";
import ToolboxIcon from "./icons/ToolboxIcon.tsx";

export enum ContextType {
	GRAPH = "GRAPH",
	NODE = "NODE",
}

export type ContextMenuType = {
	x: number;
	y: number;
	type: ContextType;
	objectId?: string;
}

export type MenuButtonType = {
	id: number;
	text: string;
	image: React.ReactNode,
	onClick?: () => void;
}

interface ContextMenuProps {
	graphMainHandlers: any;
	contextMenuState: ContextMenuType | null;
	closeMenu: () => void;
	modalRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const MENU_WIDTH = 240;
export const MENU_HEIGHT = 424;

const ContextMenu: React.FC<ContextMenuProps> = ({graphMainHandlers, contextMenuState, closeMenu, modalRef}) => {

	const [position, setPosition] = useState<{ x: number, y: number } | null>(null);

	// Референс на контекстное меню
	const contextMenuRef = useRef<HTMLDivElement | null>(null);

	// Id кнопок контекстного меню
	const buttonIds = {
		createNewObject: 1,
		addExitsObject: 2,
		addAnnotation: 3,
		addEdge: 4,
		expand: 5,
		originalSource: 6,
		deleteFromGraph: 7,
		deleteFromDatabase: 8,
		card: 9,
		universalCard: 10,
		addToSelection: 11,
		addAllToSelection: 12,
		cardNode: 13,
		parameters: 14,
		print: 15,
		export: 16,
	}

	// ID отключенных кнопок
	const disabledButtonsByType = {
		// Отключённые кнопки при нажатии на узел
		[ContextType.NODE]: [
			buttonIds.originalSource,
		],
		// Отключённые кнопки при нажатии на граф
		[ContextType.GRAPH]: [
			buttonIds.expand,
			buttonIds.originalSource,
			buttonIds.deleteFromGraph,
			buttonIds.deleteFromDatabase,
			buttonIds.card,
			buttonIds.universalCard,
			buttonIds.addToSelection,
			buttonIds.cardNode,
		]
	};

	// Объекты кнопок контекстного меню
	const menuButtons: MenuButtonType[][] = [
		[
			{
				id: buttonIds.createNewObject,
				text: "Новый объект...",
				image: <PawnNewIcon/>,
				onClick: graphMainHandlers.handleAddNewNode,
			},
			{
				id: buttonIds.addExitsObject,
				text: "Существующий объект...",
				image: <PawnAddIcon/>,
				onClick: graphMainHandlers.handleAddExistNode,
			},
			{
				id: buttonIds.addAnnotation,
				text: "Добавить текст...",
				image: <TextNewIcon/>,
				onClick: graphMainHandlers.handleAddObjectText,
			}
		],
		[
			{
				id: buttonIds.addEdge,
				text: "Связать...",
				image: <LinkNewIcon/>,
				onClick: graphMainHandlers.handleAddEdge,
			},
			{
				id: buttonIds.expand,
				text: "Расшириться...",
				image: <BranchIcon/>,
			},
			{
				id: buttonIds.originalSource,
				text: "Первоисточник...",
				image: <KnowledgeBaseArticleIcon/>,
			}
		],
		[
			{
				id: buttonIds.deleteFromDatabase,
				text: "Удалить из карты...",
				image: <DeleteGroupIcon/>,
				onClick: () => graphMainHandlers.handleDeleteObject(TypeObjectEnum.CUSTOM_NODE, contextMenuState?.objectId),
			},
			{
				id: buttonIds.deleteFromGraph,
				text: "Удалить",
				image: <DeleteIcon/>,
				onClick: graphMainHandlers.handleDeleteNodeFromDatabase,
			},
		],
		[
			{
				id: buttonIds.card,
				text: "Карточка...",
				image: <FormYellowIcon/>,
			},
			{
				id: buttonIds.universalCard,
				text: "Универсальная карточка...",
				image: <FormYellowIcon/>,
			},
		],
		[
			{
				id: buttonIds.addToSelection,
				text: "Добавить объект в подборку...",
				image: <BoxIcon/>,
				onClick: () => graphMainHandlers.handleAddNodeToSelection(contextMenuState?.objectId),
			},
			{
				id: buttonIds.addAllToSelection,
				text: "Добавить все объекты в подборку...",
				image: <BoxIcon/>,
				onClick: graphMainHandlers.handleAddAllNodesToSelections,
			},
		],
		[
			{
				id: buttonIds.cardNode,
				text: "Карточка узла модели...",
				image: <FormGreenIcon/>,
				onClick: () => graphMainHandlers.handleOpenNodeCard(contextMenuState?.objectId),
			},
			{
				id: buttonIds.parameters,
				text: "Параметры...",
				image: <ToolboxIcon/>,
				onClick: graphMainHandlers.handleOpenParameters,
			},
		],
		[
			{
				id: buttonIds.print,
				text: "Печать карты...",
				image: <PrinterIcon/>,
				onClick: graphMainHandlers.handlePrintGraph,
			},
			{
				id: buttonIds.export,
				text: "Экспорт...",
				image: <ExportFileIcon/>,
				onClick: graphMainHandlers.handleExportGraph,
			},
		]
	];

	const buttonClick = (onClick?: () => void) => {
		if (onClick) {
			onClick();
		}
		closeMenu();
	}

	const handlePositionComputed = (
		clickX: number, clickY: number, menuWidth: number, menuHeight: number
	) => {
		if (modalRef.current) {
			const modalCurrent = modalRef.current;

			const modalWidth = modalCurrent.getBoundingClientRect().width;
			const modalHeight = modalCurrent.getBoundingClientRect().height;

			let adjustedX = clickX;
			let adjustedY = clickY;

			if (clickX + menuWidth > modalWidth) {
				adjustedX = modalWidth - menuWidth - 10;
			}

			if (clickY + menuHeight > modalHeight) {
				adjustedY = modalHeight - menuHeight - 10;
			}

			return {x: adjustedX, y: adjustedY};
		}

		return {x: clickX, y: clickY};
	}

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
				closeMenu();
			}
		};

		if (contextMenuState) {
			document.addEventListener("pointerdown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, [contextMenuState]);

	// TODO: Доработать позиционирование контекстного меню на краях модального окна
	useEffect(() => {
		if (contextMenuState) {
			const {x, y} = handlePositionComputed(contextMenuState.x, contextMenuState.y, MENU_WIDTH, MENU_HEIGHT);

			setPosition({x, y})
		} else {
			setPosition(null);
		}
	}, [contextMenuState]);

	return (
		<AnimatePresence>
			{contextMenuState && position && (
				<motion.div
					ref={contextMenuRef}
					className={styles.contextMenuAnimationWrapper}
					initial={{opacity: 0, height: 0}}
					animate={{opacity: 1, height: "auto"}}
					exit={{opacity: 0, height: 0}}
					style={{
						top: position.y,
						left: position.x,
					}}
				>
					<div className={styles.contextMenu}>
						{menuButtons.map((buttons, idx) =>
							<>
								{buttons.map(button =>
									<Button
										onClick={() => buttonClick(button.onClick)}
										clickable={!disabledButtonsByType[contextMenuState.type].includes(button.id)}
										className={styles.menuButton}
										key={button.id}
									>
										{React.cloneElement(button.image as JSX.Element, {className: styles.image})}
										{button.text}
									</Button>
								)}
								{idx !== menuButtons.length - 1 && (
									<div key={`div-${idx}`} className={styles.separator}/>
								)}
							</>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ContextMenu;