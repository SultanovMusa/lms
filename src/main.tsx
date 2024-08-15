import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from './providers/ReduxProvider.tsx';
import MantineSettingProvider from './providers/MantineSettingProvider.tsx';
import '@mantine/core/styles.css';
// import ProtectRoute from './providers/ProtectRoute.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider>
			<MantineSettingProvider>
				<BrowserRouter>
					{/* <ProtectRoute> */}
					<App />
					{/* </ProtectRoute> */}
				</BrowserRouter>
			</MantineSettingProvider>
		</ReduxProvider>
	</React.StrictMode>
);
