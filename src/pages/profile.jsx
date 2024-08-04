import { useAuth } from '../contexts/AuthContext';
import Profile from '../components/shared/Profile';

export function Component() {
	const { loading: isLoading, user } = useAuth();

	return <div>{isLoading ? <h2>Загрузка...</h2> : <Profile user={user} />}</div>;
}
