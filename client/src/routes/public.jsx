import Layout from "../pages/layouts/layout";
import Home from "../pages/public/home/page";
import PageNotFound from '../pages/public/pagenotfound/page';
import SignIn from "../pages/public/sign_in/page";
import SignUp from "../pages/public/sign_up/page";

export const publicRouter = [
	{
		path: '/',
		element: <Layout />,
		errorElement: <PageNotFound />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: 'sign_in',
				element: <SignIn />,
			},
			{
				path: 'sign_up',
				element: <SignUp />,
			},
			// {
			// 	path: 'pricing',
			// 	element: <Pricing />,
			// },
			// {
			// 	path: 'product',
			// 	element: <Product />,
			// },
		]
	}
]