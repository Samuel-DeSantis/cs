import Protected from "../pages/components/Protected"
import Projects from "../pages/protected/projects/page"
import Project from "../pages/protected/project/page"
import Profile from "../pages/protected/profile/page"

export const protectedRouter = [
	{
		path: '/',
		element: <Protected />,
		children: [
			{
				path: '/projects',
				element: <Projects />
			},
			{
				path: '/project',
				element: <Project />
			},
			{
				path: '/profile',
				element: <Profile />
			},
		]
	}
]