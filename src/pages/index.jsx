import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthService } from '../services/AuthService';
import { useAuth, useAuthDispatch } from '../contexts/AuthContext';

export function Component() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { loading: isLoading, user } = useAuth();
	const dispatch = useAuthDispatch();

	console.log(user);

	useEffect(() => {
		dispatch({ type: 'SET_LOADING', payload: true });
		AuthService.getMe()
			.then(({ data: user }) => {
				dispatch({ type: 'SET_USER', payload: user });
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', payload: false });
			});
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		dispatch({ type: 'SET_LOADING', payload: true });
		try {
			const user = await AuthService.login(username, password);
			dispatch({ type: 'SET_USER', payload: user });
		} catch (error) {
			console.log(error);
		} finally {
			dispatch({ type: 'SET_LOADING', payload: false });
		}
	}

	return (
		<div>
			{isLoading ? (
				<h1>Загрузка...</h1>
			) : (
				<>
					{user && <div>{user.username}</div>}
					<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
						<TextField
							label='username'
							variant='standard'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<TextField
							label='password'
							variant='standard'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button variant='contained' type='submit'>
							Submit
						</Button>
					</form>
				</>
			)}
		</div>
	);
}
