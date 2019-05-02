import { Router } from 'express';

import { router as usersRouter } from './user';
import { router as oauth2Router } from './oauth2';
import { router as aboutRouter } from './about';

const router: Router = Router()

router.use('/api/users', usersRouter)
router.use('/oauth2', oauth2Router)
router.use('/about', aboutRouter)

export { router }