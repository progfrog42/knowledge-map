import React from 'react';
import stylesModal from "../../styles/components/modals/Modal.module.css"
import styles from "../../styles/components/modals/ManageGraphNodeModal.module.css"
import {AnimatePresence, motion} from "framer-motion";
import classNames from "classnames";
import Close from "../svg/Close.tsx";
import Button from "../Button.tsx";
import Input from "../Input.tsx";

const ManageGraphNodeModal: React.FC = (props) => {

	return (
		<AnimatePresence>
			{props && (
				<motion.div
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					className={classNames(stylesModal.overlay, styles.overlay)}
				>
					<motion.div
						className={classNames(stylesModal.modalComponent, styles.modal)}
						initial={{transform: 'translateY(-4rem)'}}
						animate={{transform: 'translateY(0)'}}
						exit={{transform: 'translateY(-4rem)'}}
					>
						<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
							<h3 className={stylesModal.headerText}>Настройки узла</h3>
							<Button
								className={stylesModal.closeButton}
								aria-label={'Кнопка для закрытия окна'}
								title={'Закрыть окно'}
							>
								<Close className={stylesModal.closeSvg}/>
							</Button>
						</div>
						<Input/>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ManageGraphNodeModal;