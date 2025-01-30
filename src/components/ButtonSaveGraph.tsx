import Button from "./Button.tsx";
import styles from "../styles/components/ButtonSaveGraph.module.css"
import React, {useEffect, useState} from "react";
import {Edge, Node,} from "@xyflow/react";
import {AnimatePresence, motion} from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	nodes: Node[],
	savedNodes: Node[];
	edges: Edge[];
	savedEdges: Edge[];
	setSavedNodes: React.Dispatch<React.SetStateAction<Node[]>>,
	setSavedEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
}

const ButtonSaveGraph = ({
													 nodes,
													 edges,
													 savedNodes,
													 savedEdges,
													 setSavedNodes,
													 setSavedEdges,
													 ...rest
												 }: ButtonProps) => {

	// Видимость кнопки
	const [buttonVisibility, setButtonVisibility] = useState(false);

	// Сохраняем граф
	const handleClick = () => {

	}

	// Удаление поля selected из объекта
	function removeSelectedField(obj: Node | Edge): Node | Edge {
		const {selected, ...rest} = obj;
		return rest;
	}

	// Функция для проверки, что все элементы массива A есть в массиве B
	function arraysHaveSameIds(array1: Node[] | Edge[], array2: Node[] | Edge[]) {
		const ids1 = array1.map(node => node.id);
		const ids2 = array2.map(node => node.id);

		// Проверка, что каждый id из ids1 есть в ids2 и наоборот
		return ids1.every(id => ids2.includes(id)) && ids2.every(id => ids1.includes(id));
	}

	// Функция для сравнения объектов по id и их содержимого без поля selected
	function areArraysEqual(array1: Node[] | Edge[], array2: Node[] | Edge[]) {
		if (!arraysHaveSameIds(array1, array2)) {
			return false; // Массивы не содержат одинаковые id
		}

		// Сравниваем содержимое объектов с одинаковыми id без учета поля selected
		return array1.every(node1 => {
			const node2 = array2.find(node => node.id === node1.id);
			return node2 && JSON.stringify(removeSelectedField(node1)) === JSON.stringify(removeSelectedField(node2));
		});
	}

	// Если текущий граф отличается от сохранённого, то кнопка появляется
	useEffect(() => {
		setButtonVisibility(
			!areArraysEqual(nodes, savedNodes) || !areArraysEqual(edges, savedEdges)
		);
	}, [nodes, edges]);

	return (
		<AnimatePresence>
			{buttonVisibility && (
				<motion.div
					className={styles.buttonWrapper}
					initial={{transform: 'translateY(150%)'}}
					animate={{transform: 'translateY(0)'}}
					exit={{transform: 'translateY(150%)'}}
					transition={{
						duration: 0.4,
					}}
				>
					<Button
						onClick={handleClick}
						className={styles.buttonSaveGraph}
						{...rest}
					>
						Сохранить граф
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ButtonSaveGraph;