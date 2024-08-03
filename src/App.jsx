import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAuthDispatch } from './contexts/AuthContext';
import { AuthService } from './services/AuthService';

export default function App() {
	const dispatch = useAuthDispatch();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch({ type: 'SET_LOADING', payload: true });
			AuthService.getMe()
				.then(({ data: user }) => {
					dispatch({ type: 'SET_USER', payload: user });
				})
				.finally(() => {
					dispatch({ type: 'SET_LOADING', payload: false });
				});
		} else {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	}, []);

	return <RouterProvider router={router} />;
}
