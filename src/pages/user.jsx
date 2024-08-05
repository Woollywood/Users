import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UsersService } from '../services/UsersService';
import { useSnackbar } from 'notistack';
import UserDetail from '../components/shared/UserDetail';

export function Component() {
	const { enqueueSnackbar } = useSnackbar();
	const [user, setUser] = useState({});
	const [isLoading, setLoading] = useState(true);
	const { id } = useParams();

	async function getUser() {
		try {
			const { data } = await UsersService.getSingleUser(id);
			setUser(data);
		} catch (error) {
			enqueueSnackbar('User not found', { variant: 'error' });
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		getUser();
	}, []);

	return <>{isLoading ? <h2 className='text-2xl font-medium'>Загрузка...</h2> : <UserDetail user={user} />}</>;
}
