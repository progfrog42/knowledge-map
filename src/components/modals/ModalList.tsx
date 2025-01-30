import React from 'react';
import styles from "../../styles/components/modals/ModalList.module.css";
import stylesModal from "../../styles/components/modals/Modal.module.css"
import {AnimatePresence, motion} from "framer-motion";
import Button from "../Button.tsx";
import Close from "../svg/Close.tsx";
import classNames from "classnames";

export type ModalListStateType = {
	isOpen: boolean;
	listText: string;
	listItems?: { text: string, onClick?: () => void };
}

export interface ModalListProps {
	stateModalList: ModalListStateType;
	closeModal: () => void;
}

const ModalList: React.FC<ModalListProps> = ({stateModalList, closeModal}) => {
	return (
		<AnimatePresence>
			{stateModalList.isOpen && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					className={classNames(stylesModal.overlay, styles.overlay)}
				>
					<motion.div
						initial={{transform: 'translateY(2rem)'}}
						animate={{transform: 'translateY(0)'}}
						exit={{transform: 'translateY(2rem)'}}
						className={styles.modal}
					>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
							<h3 className={stylesModal.headerText}>
								{stateModalList.listText}
							</h3>
							<Button
								onClick={closeModal}
								className={stylesModal.closeButton}
								aria-label={'Кнопка для закрытия окна выбора'}
								title={'Закрыть окно'}
							>
								<Close className={stylesModal.closeSvg}/>
							</Button>
						</div>
						<ul className={styles.list}>
							{[1, 2, 3, 4, 5, 6, 7, 8].map(el =>
								<li className={styles.listItem} role='list'>
									<Button className={styles.listItemButton}>
										Элемент {el}
									</Button>
								</li>
							)}
						</ul>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ModalList;