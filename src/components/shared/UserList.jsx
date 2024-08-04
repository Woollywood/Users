import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { UsersService } from '../../services/UsersService';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import User from './User';

export default function UserList() {
	const { enqueueSnackbar } = useSnackbar();
	const [users, setUsers] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(0);
	const [isFirstLoading, setFirstLoading] = useState(true);
	const [isLoading, setLoading] = useState(true);

	const limit = 30;
	const pages = Math.ceil(total / limit);

	async function fetchUsers(page = 0) {
		const skip = page * limit;
		setLoading(true);
		try {
			const { data } = await UsersService.getAllUsers({ limit, skip });
			setUsers(data.users);
			setTotal(data.total);
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchUsers().finally(() => setFirstLoading(false));
	}, []);

	useEffect(() => {
		fetchUsers(page);
	}, [page]);

	function handleChange(event, value) {
		setPage(value - 1);
	}

	return (
		<div>
			{isFirstLoading ? (
				<h2 className='text-2xl font-medium'>Загрузка...</h2>
			) : users.length ? (
				<div>
					{isLoading ? (
						<h2 className='text-2xl font-medium'>Загрузка...</h2>
					) : (
						<div className='grid grid-cols-3 gap-2'>
							{users.map((user) => (
								<User key={user.id} {...user} />
							))}
						</div>
					)}
					<div className='flex justify-center py-6'>
						<Pagination count={pages} onChange={handleChange} />
					</div>
				</div>
			) : (
				<h2 className='text-2xl font-medium text-center'>Не найдено...</h2>
			)}
		</div>
	);
}
