import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/tailwind.css';
import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<SnackbarProvider maxSnack={3}>
				<App />
			</SnackbarProvider>
		</AuthProvider>
	</React.StrictMode>
);
