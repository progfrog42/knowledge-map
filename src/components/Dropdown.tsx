import React, {ReactElement, useState} from "react";
import {AnimatePresence, HTMLMotionProps, motion} from "framer-motion";
import Button from "./Button.tsx";
import styles from "../styles/components/Dropdown.module.css"
import classNames from "classnames";

export type DropdownElementType = any & {
	id: number;
	content: number | string | ReactElement;
}

interface DropdownProps {
	selectedElement: DropdownElementType;
	setSelectedElement: React.Dispatch<React.SetStateAction<DropdownElementType>>;
	elements: DropdownElementType[];
	wrapperAttributes?: React.HTMLAttributes<HTMLDivElement>;
	ulAttributes?: HTMLMotionProps<'ul'>;
	dropdownHeader: string;
}

const Dropdown: React.FC<DropdownProps> = (
	{selectedElement, setSelectedElement, dropdownHeader, wrapperAttributes, elements, ulAttributes}
) => {

	// Состояние видимости выпадающего списка
	const [isOpen, setIsOpen] = useState(false);

	// Обработчик нажатия на кнопку открытия
	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	// Обработчик нажатия на элемент списка
	const handleClickLi = (el: DropdownElementType) => {
		setSelectedElement(el);
		setIsOpen(false);
	}

	const {className, ...restWrapperAttributes} = wrapperAttributes || {};

	return (
		<div
			className={classNames(styles.dropdownWrapper, wrapperAttributes?.className || '')}
			{...restWrapperAttributes}
		>
			<span className={styles.span}>{dropdownHeader}</span>
			<Button
				className={styles.buttonStyle}
				onClick={toggleDropdown}
				aria-expanded={isOpen}
				aria-controls={'dropdown-type-edge'}
			>
				{selectedElement.content}
			</Button>
			<AnimatePresence>
				{isOpen && (
					<motion.ul
						className={styles.ulStyles}
						id={'dropdown-type-edge'}
						{...ulAttributes}
					>
						{elements.map(el =>
							<li
								onClick={() => handleClickLi(el)}
								className={styles.li}
							>
								{el.content}
							</li>
						)}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Dropdown;