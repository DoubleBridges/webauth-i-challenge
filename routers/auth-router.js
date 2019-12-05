import { Router } from 'express'
import bcrypt from 'bcryptjs'

import auth from '../middleware/authh-required-middleware'
import Users from '../data/schemas/users-model'
import { serverError } from '../data/helpers';

const router = Router()

router
  .route('/register')
  .post(async (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    try {
      const newUser = await Users.add(user)
      res.status(201).json(newUser)
    } catch (err) {
      serverError(res, err)
    }
  })
  
router
  .route('/login')
  .post(auth, async (req, res) => {
    let { username, password } = req.body
    try {
      const user = await Users.findBy({ username }).first()
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "You again" })
      } else {
        res.status(401).json({ errorMessage: "Invalid Credentials Yo"})
      } 
    } catch (err) {
     serverError(res, err)
    }
  })

  export default router