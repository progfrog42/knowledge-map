import React, {useState} from 'react';
import stylesModal from "../../styles/components/modals/Modal.module.css";
import styles from "../../styles/components/modals/GraphParametersModal.module.css"
import {AnimatePresence} from "framer-motion";
import ModalWrapper from "./ModalWrapper.tsx";
import Button from "../Button.tsx";
import Close from "../svg/Close.tsx";
import {useGraph} from "../GraphContext.tsx";

export enum NameSettingEnum {
	FULL_NAME = 'FULL_NAME',
	FIRST_50_SYMBOLS = 'FIRST_50_SYMBOLS',
	HIDE_NAME = 'HIDE_NAME',
}

export type GraphParametersType = {
	nameSetting: NameSettingEnum;
	substrate: string | null;
	showPromptDialog: boolean;
}

interface GraphParametersModalProps {
	isOpenParametersModal: boolean;
	closeModal: () => void;
}

const GraphParametersModal: React.FC<{ props: GraphParametersModalProps }> = ({props}) => {

	const { stateGraphParameters, setStateGraphParameters } = useGraph();

	const [state, setState] = useState<GraphParametersType>(stateGraphParameters);

	const selectNameSetting = (nameSetting: NameSettingEnum) => {
		setState({...state, nameSetting});
	}

	const setShowPromptDialog = (showPromptDialog: boolean) => {
		setState({...state, showPromptDialog});
	}

	const handleSaveAndCloseModal = () => {
		setStateGraphParameters(state);
		props.closeModal();
	}

	return (
		<AnimatePresence>
			{props.isOpenParametersModal && (
				<ModalWrapper modalAttrs={{className: styles.modal}}>
					<div className={stylesModal.headerLine}>
						<h3 className={stylesModal.headerText}>
							Параметры карты знаний
						</h3>
						<Button
							onClick={props.closeModal}
							className={stylesModal.closeButton}
							aria-label={'Кнопка для закрытия окна'}
							title={'Закрыть окно'}
						>
							<Close className={stylesModal.closeSvg}/>
						</Button>
					</div>
					<div className={styles.block}>
						<p className={styles.blockName}>Наименование объектов</p>
						<span className={styles.inputCheckLine}>
							<input
								type="radio"
								id="full_name"
								name="name"
								checked={state.nameSetting === NameSettingEnum.FULL_NAME}
								onClick={() => selectNameSetting(NameSettingEnum.FULL_NAME)}
							/>
							<label htmlFor="full_name">Показывать полное наименование</label>
						</span>
						<span className={styles.inputCheckLine}>
							<input
								type="radio"
								id="50_symbols"
								name="name"
								checked={state.nameSetting === NameSettingEnum.FIRST_50_SYMBOLS}
								onClick={() => selectNameSetting(NameSettingEnum.FIRST_50_SYMBOLS)}
							/>
							<label htmlFor="50_symbols">Показывать первые 50 символов полного наименования</label>
						</span>
						<span className={styles.inputCheckLine}>
							<input
								type="radio"
								id="hide_name"
								name="name"
								checked={state.nameSetting === NameSettingEnum.HIDE_NAME}
								onClick={() => selectNameSetting(NameSettingEnum.HIDE_NAME)}
							/>
							<label htmlFor="hide_name">Не показывать полное наименование</label>
						</span>
					</div>
					<div className={styles.block}>
						<p className={styles.blockName}>Подложка карты знаний</p>
						Тут что то должно быть
					</div>
					<span className={styles.inputCheckLine}>
						<input
							type="checkbox"
							id="show-dialog-prompt"
							checked={state.showPromptDialog}
							onChange={(e) => setShowPromptDialog(e.target.checked)}
						/>
						<label htmlFor="show-dialog-prompt">Показывать диалог с подсказкой о том как выполняется связывание</label>
					</span>
					<Button
						onClick={handleSaveAndCloseModal}
						aria-label={'Кнопка для закрытия модального окна'}
						title={'Сохранить и закрыть окно'}
					>
						Сохранить
					</Button>
				</ModalWrapper>
			)}
		</AnimatePresence>
	);
};

export default GraphParametersModal;