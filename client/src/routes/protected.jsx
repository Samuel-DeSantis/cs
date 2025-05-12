export const protectedRouter = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			// {
			// 	path: '/',
			// 	element:
			// },
		]
	}
]