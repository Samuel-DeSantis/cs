import Protected from "../pages/components/protected"
import Feedback from "../pages/protected/feedback/page"
import Profile from "../pages/protected/profile/page"
import Projects from "../pages/protected/projects/index/page"
import Project from "../pages/protected/projects/show/page"
import NewProject from "../pages/protected/projects/new/page"

export const protectedRouter = [
	{
		path: '/',
		element: <Protected />,
		children: [
			{
				path: '/feedback',
				element: <Feedback />
			},
			{
				path: '/profile',
				element: <Profile />
			},
			{
				path: '/projects',
				element: <Projects />
			},
			{
				path: '/project/:id',
				element: <Project />
			},
			{
				path: '/project/new',
				element: <NewProject />
			},
		]
	}
]