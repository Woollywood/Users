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
						path: '/users',
						lazy: () => import('../pages/users'),
					},
					{
						path: '/users/:slug',
						lazy: () => import('../pages/user'),
					},
				],
			},
		],
	},
];
