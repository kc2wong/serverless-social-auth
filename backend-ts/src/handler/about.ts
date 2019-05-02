import { Router, Response } from 'express';

const router = Router()

router.get('/', async ({}, res: Response) => {
    res.status(200).send('Hello Serverless!') 
})

export { router }
