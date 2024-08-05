import { useEffect, useState } from 'react';
import { UsersService } from '../../services/UsersService';
import { useSnackbar } from 'notistack';
import PostList from './PostList';
import TodoList from './TodoList';

export default function UserDetail({ user }) {
	const { enqueueSnackbar } = useSnackbar();
	const [posts, setPosts] = useState([]);
	const [isPostsLoading, setPostsLoading] = useState(true);
	const [todos, setTodos] = useState([]);
	const [isTodosLoading, setTodosLoading] = useState(true);

	const fullName = `${user.firstName} ${user.lastName}`;

	async function getPosts() {
		try {
			const { data } = await UsersService.getPosts(user.id);
			setPosts(data.posts);
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
		} finally {
			setPostsLoading(false);
		}
	}

	async function getTodos() {
		try {
			const { data } = await UsersService.getTodos(user.id);
			setTodos(data.todos);
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
		} finally {
			setTodosLoading(false);
		}
	}

	useEffect(() => {
		getPosts();
	}, []);

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className='space-y-12'>
			<div className='flex items-center gap-4'>
				<img src={user.image} alt='avatar' />
				<div>
					<h2 className='text-4xl font-medium mb-2'>
						{fullName} ({user.username})
					</h2>
					<p className='text-xl text-gray-400'>{user.email}</p>
				</div>
			</div>
			{isPostsLoading ? <h2>Загрузка...</h2> : <PostList posts={posts} />}
			{isTodosLoading ? <h2>Загрузка...</h2> : <TodoList todos={todos} />}
		</div>
	);
}
