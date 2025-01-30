import '@xyflow/react/dist/style.css';
import {useState} from "react";
import Button from "./components/Button.tsx";
import GraphModal from "./components/GraphModal.tsx";
import {ReactFlowProvider} from "@xyflow/react";
import {GraphProvider} from "./components/GraphContext.tsx";

function App() {

	const [isOpengraphModal, setIsOpenGraphModal] = useState(false);

	return (
		<ReactFlowProvider>
			<GraphProvider>
				<Button
					onClick={() => setIsOpenGraphModal(true)}
				>
					Открыть граф
				</Button>
				<GraphModal
					isOpen={isOpengraphModal}
					setIsOpen={setIsOpenGraphModal}
				/>
			</GraphProvider>
		</ReactFlowProvider>
	);
}

export default App
