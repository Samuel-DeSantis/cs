import Protected from "../pages/components/protected"
import Feedback from "../pages/protected/feedback/page"
import Profile from "../pages/protected/profile/page"
import Projects from "../pages/protected/projects/index/page"
import Project from "../pages/protected/projects/show/page"
import NewProject from "../pages/protected/projects/new/page"
import Equipment from "../pages/protected/projects/show/equipment/page"
import Circuits from "../pages/protected/projects/show/circuits/page"
import Raceways from "../pages/protected/projects/show/raceways/page"
import ProjectLayout from "../pages/protected/projects/show/layout"
import ProjectPage from "../pages/protected/projects/show/page"

export const protectedRouter = [
	{
		path: '/',
		element: <Protected />,
		children: [
			{
				path: 'feedback',
				element: <Feedback />
			},
			{
				path: 'profile',
				element: <Profile />
			},
			{
				path: 'projects',
				element: <Projects />
			},
			{
				path: 'project/new',
				element: <NewProject />
			},
			{
				path: 'project/:id',
				element: <ProjectLayout />,
				children: [
					{
						index: true,
						element: <Project />
					},
					{
						path: 'equipment',
						element: <Equipment />
					},
					{
						path: 'circuits',
						element: <Circuits />
					},
					{
						path: 'raceways',
						element: <Raceways />
					},
				]
			},
		]
	}
]