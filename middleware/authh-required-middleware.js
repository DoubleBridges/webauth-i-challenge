import users from '../data/schemas/users-model'
import bcrypt from 'bcryptjs'
import { serverError } from '../data/helpers';

const authRequired = async (req, res) => {
  const { username, password } = req.headers

  if (!(username && password)) {
    res.status(401).json({
      errorMessage: "Invalid Credentials"
    })
  } else {
    try {
      const user = await users.findBy({ username }).first()
      if (user && bcrypt.compareSync(password, user.password)) {
        next()
      } else {
        res.status(401).json({
          errorMessage: "Invalis Credentials"
        })
      }
    } catch (err) {
      serverError(res, err)
    }
  }
}

export default authRequired