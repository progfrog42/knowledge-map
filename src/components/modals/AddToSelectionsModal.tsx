import React, {useState} from 'react';
import {AnimatePresence} from "framer-motion";
import ModalWrapper from "./ModalWrapper.tsx";
import styles from "../../styles/components/modals/AddToSelectionsModal.module.css";
import stylesModal from "../../styles/components/modals/Modal.module.css";
import Button from "../Button.tsx";
import Close from "../svg/Close.tsx";
import BoxIcon from "../icons/BoxIcon.tsx";
import classNames from "classnames";
import Arrow from "../svg/Arrow.tsx";
import FolderIcon from "../icons/FolderIcon.tsx";

export type AddToSelectionsModalProps = {
	closeModal: () => void;
	nodeId?: string;
} | null;

type ItemType = {
	id: string;
	name: string;
	folders: { id: string, name: string }[];
}

const AddToSelectionsModal: React.FC<{ props: AddToSelectionsModalProps }> = ({props}) => {

	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [openSublist, setOpenSublist] = useState<{ [key: string]: boolean }>({});

	const addId = (id: string) => {
		if (selectedIds.indexOf(id) === -1) {
			setSelectedIds(prevState => [...prevState, id]);
		}
	}

	const removeId = (id: string) => {
		setSelectedIds(prevState => prevState.filter(el => el !== id));
	}

	const onChange = (item: ItemType, event: any) => {
		if (event.target.checked) {
			const ids = item.folders.map(el => el.id);
			setSelectedIds(prevState => [...prevState, ...ids]);
		} else {
			const ids = item.folders.map(el => el.id);
			setSelectedIds(prevState => prevState.filter(el => !ids.includes(el)));
		}
	}

	const toggleSublist = (id: string) => {
		setOpenSublist(prevState => ({
			...prevState,
			[id]: !prevState[id],
		}));
	};

	const closeModal = () => {
		setOpenSublist({});
		setSelectedIds([]);
		props?.closeModal();
	}

	const mockList: ItemType[] = [
		{
			id: '1',
			name: '0. SRC Solutions Ltd.',
			folders: [
				{id: '1-1', name: 'Курьеры'},
				{id: '1-2', name: 'Сотрудники'},
				{id: '1-3', name: 'Технологии'},
			]
		},
		{
			id: '2',
			name: '1. Для ознакомления',
			folders: [
				{id: '2-1', name: 'Меню'}
			],
		},
		{
			id: '3',
			name: '2. Карты знаний',
			folders: [
				{id: '3-1', name: 'Меню'}
			],
		},
		{
			id: '4',
			name: '3. Проекты',
			folders: [
				{id: '4-1', name: 'Меню'}
			],
		},
		{
			id: '5',
			name: '4. Досье субъекта',
			folders: [
				{id: '5-1', name: 'Меню'}
			],
		},
		{
			id: '6',
			name: '5. Архив',
			folders: [
				{id: '6-1', name: 'Меню'}
			],
		},
		{
			id: '7',
			name: 'Моя подборка',
			folders: [
				{id: '7-1', name: 'Меню'}
			],
		}
	]

	return (
		<AnimatePresence>
			{props && (
				<ModalWrapper modalAttrs={{className: styles.modal}}>
					<div className={stylesModal.headerLine}>
						<h3 className={stylesModal.headerText}>
							Подборки
						</h3>
						<Button
							onClick={closeModal}
							className={stylesModal.closeButton}
							aria-label={'Кнопка для закрытия окна'}
							title={'Закрыть окно'}
						>
							<Close className={stylesModal.closeSvg}/>
						</Button>
					</div>
					<div className={styles.selectionsList}>
						{mockList.map(item => {

							const isOpenSublist = openSublist[item.id] || false;

							return (
								<div className={styles.selectionBlock}>
									<div key={item.id} className={styles.itemLine} style={{gap: 0}}>
										<Button
											onClick={() => toggleSublist(item.id)}
											className={styles.arrowButton}
										>
											<Arrow
												dir={isOpenSublist ? 'bottom' : 'right'}
												className={styles.arrowSvg}
											/>
										</Button>
										<label className={styles.itemLine}>
											<input
												type="checkbox"
												onChange={(event) => onChange(item, event)}
												checked={item.folders.every(folder => selectedIds.includes(folder.id))}
											/>
											<BoxIcon className={styles.icon}/>
											<p className={styles.selectionName}>
												{item.name}
											</p>
										</label>
									</div>
									{isOpenSublist && (
										<NestedListItem
											items={item.folders}
											selectedIds={selectedIds}
											addId={addId}
											removeId={removeId}
										/>
									)}
								</div>
							)
						})}
					</div>
					<Button
						onClick={closeModal}
					>
						Сохранить
					</Button>
				</ModalWrapper>
			)}
		</AnimatePresence>
	);
};

interface NestedListItemProps {
	items: { id: string, name: string }[];
	selectedIds: string[];
	addId: (id: string) => void;
	removeId: (id: string) => void;
}

const NestedListItem: React.FC<NestedListItemProps> = ({items, addId, removeId, selectedIds}) => {

	const onChange = (id: string, event: any) => {
		if (event.target.checked) {
			addId(id);
		} else {
			removeId(id);
		}
	}

	return items.map((item) =>
		<label
			key={item.id}
			className={classNames(styles.itemLine, styles.sublistLine)}
		>
			<input
				checked={selectedIds.includes(item.id)}
				onChange={(event) => onChange(item.id, event)}
				type="checkbox"
			/>
			<FolderIcon className={styles.icon}/>
			<p className={styles.selectionName}>
				{item.name}
			</p>
		</label>
	)
}

export default AddToSelectionsModal;