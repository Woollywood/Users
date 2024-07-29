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
						lazy: () => import('../pages/index'),
					},
				],
			},
		],
	},
];
