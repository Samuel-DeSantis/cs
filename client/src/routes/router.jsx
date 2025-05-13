import { createBrowserRouter } from 'react-router-dom'

import { publicRouter } from './public'
import { protectedRouter } from './protected'

const router = createBrowserRouter(publicRouter.concat(protectedRouter))

export default router