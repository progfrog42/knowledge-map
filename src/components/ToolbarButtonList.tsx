import React, {useEffect, useRef, useState} from 'react';
import stylesToolbar from '../styles/components/Toolbar.module.css'
import styles from "../styles/components/ToolbarButtonList.module.css";
import Button, {ButtonProps} from "./Button.tsx";
import classNames from "classnames";
import {AnimatePresence, motion} from "framer-motion";

interface ToolbarButtonListProps {
	buttonAttributes?: ButtonProps;
	children?: React.ReactNode;
	icon?: React.ReactNode;
}

const ToolbarButtonList: React.FC<ToolbarButtonListProps> = ({buttonAttributes, children, icon}) => {

	const className = buttonAttributes?.className;

	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const [isListOpen, setIsListOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (buttonRef.current && !buttonRef.current.contains(event.target)) {
				setTimeout(() => setIsListOpen(false), 100);
			}
		}

		document.addEventListener("pointerdown", handleClickOutside);

		return () => {
			document.removeEventListener("pointerdown", handleClickOutside);
		};
	}, [buttonRef.current]);

	return (
		<div className={styles.listButtonWrapper}>
			<Button
				onClick={() => setIsListOpen(!isListOpen)}
				{...buttonAttributes}
				className={classNames(stylesToolbar.controlTabButton, stylesToolbar.buttonSvg, className)}
				ref={buttonRef}
			>
				{icon}
			</Button>
			<AnimatePresence>
				{isListOpen && (
					<motion.div
						initial={{opacity: 0, height: 0}}
						animate={{opacity: 1, height: 'auto'}}
						exit={{opacity: 0, height: 0}}
						className={styles.buttonList}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ToolbarButtonList;