import React, {HTMLAttributes} from 'react';
import {motion, MotionProps} from "framer-motion";
import classNames from "classnames";
import stylesModal from "../../styles/components/modals/Modal.module.css";

type MotionDivProps = MotionProps & HTMLAttributes<HTMLDivElement>;

interface ModalWrapperProps {
	children?: React.ReactNode;
	overlayAttrs?: MotionDivProps;
	modalAttrs?: MotionDivProps;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({children, overlayAttrs, modalAttrs}) => {

	const overlayClassName = overlayAttrs?.className || '';
	const modalClassName = modalAttrs?.className || '';

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			{...overlayAttrs}
			className={classNames(stylesModal.overlay, overlayClassName)}
		>
			<motion.div
				initial={{transform: 'translateY(-4rem)'}}
				animate={{transform: 'translateY(0)'}}
				exit={{transform: 'translateY(-4rem)'}}
				{...modalAttrs}
				className={classNames(stylesModal.modalComponent, modalClassName)}
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default ModalWrapper;