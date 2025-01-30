import styles from '../styles/components/GraphManager.module.css'
import {CurrentObjectType} from "../types/current-object.type.ts";
import React, {useState} from "react";
import {TypeObjectEnum} from "../enums/type-object.ts";
import CreateNodeLayout from "./graph-manager-layouts/CreateNodeLayout.tsx";
import ManageEdgeLayout from "./graph-manager-layouts/ManageEdgeLayout.tsx";
import ManageNodeLayout from "./graph-manager-layouts/ManageNodeLayout.tsx";
import {AnimatePresence, motion} from "framer-motion";
import Button from "./Button.tsx";

export interface GraphManagerProps {
	currentObject: CurrentObjectType | null,
	setCurrentObject: (value: (((prevState: (CurrentObjectType | null)) => (CurrentObjectType | null)) | CurrentObjectType | null)) => void
}

const GraphManager: React.FC<GraphManagerProps> = ({currentObject, setCurrentObject}) => {

	const [isOpenManger, setIsOpenManager] = useState(true);

	// Перерисовка компонентов в зависимости от состояния currentObject
	const renderLayout = () => {
		switch (currentObject?.typeObject) {
			case TypeObjectEnum.CUSTOM_NODE:
				return <ManageNodeLayout
					currentObject={currentObject}
					setCurrentObject={setCurrentObject}
				/>
			case TypeObjectEnum.EDGE:
				return <ManageEdgeLayout
					currentObject={currentObject}
					setCurrentObject={setCurrentObject}
				/>
			default:
				return <CreateNodeLayout/>
		}
	}

	// Открытие / закрытие панели управления объектом графа
	const handleChangeOpenManager = () => {
		setIsOpenManager(prevState => !prevState);
	}

	return (
		<div className={styles.managerWrapper}>
			<motion.div
				className={styles.graphMangerBlock}
			>
				<Button
					className={styles.buttonOpen}
					onClick={handleChangeOpenManager}
					style={{
						borderTopRightRadius: isOpenManger ? 0 : '',
						borderBottomRightRadius: isOpenManger ? 0 : ''
					}}
				>
				</Button>
				<AnimatePresence>
					{isOpenManger && (
						<motion.div
							style={{display: 'flex'}}
							initial={{width: 0}}
							animate={{width: 'auto'}}
							exit={{width: 0}}
							transition={{
								duration: 0.7,
								type: 'spring'
							}}
						>
							<div
								className={styles.layouts}
								key={currentObject?.object.id}
							>
								{renderLayout()}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}

export default GraphManager;