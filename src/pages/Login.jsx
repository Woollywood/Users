import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthService } from '../services/AuthService';
import { useAuthDispatch } from '../contexts/AuthContext';

export function Component() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const dispatch = useAuthDispatch();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const data = await AuthService.login(username, password);
			dispatch({ type: 'SET_USER', payload: data });
			navigate('/', { replace: true });
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className='flex items-center justify-center h-full'>
			<form onSubmit={handleSubmit} className='flex flex-col items-center gap-8'>
				<div className='flex flex-col items-center gap-4'>
					<TextField
						label='Username'
						variant='standard'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<TextField
						label='Password'
						variant='standard'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<Button variant='contained' type='submit'>
					Войти
				</Button>
			</form>
		</div>
	);
}
