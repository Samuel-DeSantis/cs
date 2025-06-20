import Layout from "../pages/layouts/layout";
import Home from "../pages/public/home/page";
import PageNotFound from '../pages/public/pagenotfound/page';
import SignIn from "../pages/public/signin/page";
import SignUp from "../pages/public/signup/page";

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