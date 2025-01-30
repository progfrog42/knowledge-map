import React, {createContext, useContext, useState} from "react";
import {GraphParametersType, NameSettingEnum} from "./modals/GraphParametersModal.tsx";

const defaultStateGraphParameters: GraphParametersType = {
	nameSetting: NameSettingEnum.FULL_NAME,
	substrate: null,
	showPromptDialog: false,
}

export const GraphContext = createContext<{
	isVisibleConnector: boolean;
	toggleVisibilityConnector: () => void,
	setVisibilityConnector: React.Dispatch<React.SetStateAction<boolean>>
	stateGraphParameters: GraphParametersType;
	setStateGraphParameters: React.Dispatch<React.SetStateAction<GraphParametersType>>
}>({
	isVisibleConnector: false,
	toggleVisibilityConnector: () => {
	},
	setVisibilityConnector: () => {
	},
	stateGraphParameters: defaultStateGraphParameters,
	setStateGraphParameters: () => {},
});

export const GraphProvider = ({children}: { children: React.ReactNode }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [stateGraphParameters, setStateGraphParameters] = useState<GraphParametersType>(defaultStateGraphParameters);

	const toggleVisibility = () => setIsVisible(prev => !prev);

	return (
		<GraphContext.Provider value={{
			isVisibleConnector: isVisible,
			toggleVisibilityConnector: toggleVisibility,
			setVisibilityConnector: setIsVisible,
			stateGraphParameters,
			setStateGraphParameters,
		}}>
			{children}
		</GraphContext.Provider>
	);
};

export const useGraph = () => useContext(GraphContext);