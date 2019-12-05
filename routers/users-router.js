import { Router } from 'express'
import Users from '../data/schemas/users-model'
import authRequired from '../middleware/authh-required-middleware'
import { serverError } from '../data/helpers'

const router = Router()

router
  .route('/')
  .get(authRequired, async (req, res) => {
    try {
      const users = await Users.find()
      res.status(200).json(users)
    } catch (err) {
      serverError(res, err)
    }
  })

  export default router