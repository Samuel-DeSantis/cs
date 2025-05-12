import Layout from "../pages/layout";
import Home from "../pages/public/home/page";
import PageNotFound from '../pages/public/PageNotFound';
import SignIn from "../pages/public/signin/page";
import SignUp from "../pages/public/signup/page";

// To be moved to protected routes
import Project from "../pages/protected/project/page";
import Projects from "../pages/protected/projects/page";

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
				path: '/sign_in',
				element: <SignIn />,
			},
			{
				path: '/sign_up',
				element: <SignUp />,
			},
			// TODO: Move to protected routes
			{
				path: '/project',
				element: <Project />,
			},
			{
				path: '/projects',
				element: <Projects />,
			},
		]
	}
]