import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import App from './App';
import './styles/styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<DndProvider backend={HTML5Backend}>
		<App />
	</DndProvider>
);
