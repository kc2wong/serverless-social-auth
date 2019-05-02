
import { Router, Request, Response } from 'express';
import { auth } from '../config/auth';
import { userRepository } from '../repo/repoFactory';

const router: Router = Router()

router.get('/current', auth.required, async (req: Request, res: Response) => {
    const payload = req['payload']
    console.log("api/users/current, payload = " + JSON.stringify(payload))
    return userRepository.getById(payload['id'])
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }
            return res.json(user)
        })
})

export { router }
