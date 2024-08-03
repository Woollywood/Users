import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthService } from '../services/AuthService';
import { useAuthDispatch } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

export function Component() {
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const dispatch = useAuthDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	async function onSubmit({ username, password }) {
		try {
			const data = await AuthService.login(username, password);
			dispatch({ type: 'SET_USER', payload: data });
			navigate('/', { replace: true });
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
		}
	}

	return (
		<div className='flex items-center justify-center h-full'>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-8'>
				<div className='flex flex-col items-center gap-4'>
					<TextField
						label='Username'
						variant='standard'
						type='text'
						{...register('username', {
							required: true,
						})}
					/>
					{errors.username && <h2 className='text-red-700 text-sm font-medium self-start'>Required*</h2>}
					<TextField
						label='Password'
						variant='standard'
						type='password'
						{...register('password', {
							required: true,
						})}
					/>
					{errors.password && <h2 className='text-red-700 text-sm font-medium self-start'>Required*</h2>}
				</div>

				<Button variant='contained' type='submit'>
					Войти
				</Button>
			</form>
		</div>
	);
}
