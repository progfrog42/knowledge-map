// Функция возвращает максимальный id среди всех узлов,
// И координаты центра видимой области графа
import {ReactFlowInstance, Viewport} from "@xyflow/react";

export const transformCoordinatesWithViewport = (x: number, y: number, viewport: Viewport) => {
	return {
		x: (x - viewport.x) / viewport.zoom,
		y: (y - viewport.y) / viewport.zoom,
	}
}

export const getDataForNewNode = (reactFlowInstance: ReactFlowInstance) => {

	// Получаем вьюпорт
	const viewport = reactFlowInstance.getViewport();

	// Учитываем масштаб для преобразования в координаты canvas
	const centerOfVisibleCanvas = transformCoordinatesWithViewport(
		window.innerWidth / 2, window.innerHeight / 2, viewport
	);

	const nodes = reactFlowInstance.getNodes();

	let maxId = Math.max(...nodes.map(el => Number(el.id)));

	if (maxId < 0) maxId = 0;

	return {
		maxId,
		centerOfVisibleCanvas,
	}
}