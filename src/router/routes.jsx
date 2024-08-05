import Layout from '../layouts/Default';
import ErrorElement from '../components/ErrorElement';

export const routes = [
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorElement />,
		children: [
			{
				errorElement: <ErrorElement />,
				children: [
					{
						index: true,
						lazy: () => import('../pages/onBoard'),
					},
					{
						path: '/login',
						lazy: () => import('../pages/login'),
					},
					{
						path: '/profile',
						lazy: () => import('../pages/profile'),
					},
					{
						path: '/profile/edit',
						lazy: () => import('../pages/profileEdit'),
					},
					{
						path: '/users',
						lazy: () => import('../pages/users'),
					},
					{
						path: '/users/:id',
						lazy: () => import('../pages/user'),
					},
				],
			},
		],
	},
];
