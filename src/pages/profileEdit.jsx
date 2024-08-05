import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function Component() {
	const { loading: isLoading, user } = useAuth();
	const { register, handleSubmit } = useForm({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
	});

	function onSubmit(data) {
		console.log(data);
	}

	return (
		<>
			{isLoading ? (
				<h2>Загрузка...</h2>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div className='grid grid-cols-4 items-center gap-2'>
						<TextField {...register('firstName')} label='First Name' defaultValue={user.firstName} />
						<TextField {...register('lastName')} label='Last Name' defaultValue={user.lastName} />
						<TextField {...register('username')} label='Username' defaultValue={user.username} />
						<TextField {...register('email')} label='Email' defaultValue={user.email} />
					</div>
					<div></div>

					<Button variant='contained' type='submit'>
						Save
					</Button>
				</form>
			)}
		</>
	);
}
