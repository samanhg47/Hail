const { User } = require('../models')
const middleware = require('../middleware')
const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(
        user.password_digest,
        req.body.password
      ))
    ) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    return error
  }
}

const Register = async (req, res) => {
  try {
    const { email, username, password, city_state, country } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      admin: false,
      email,
      password_digest: passwordDigest,
      username,
      city_state,
      country
    })
    return res.send(user)
  } catch (error) {
    throw error
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        req.body.oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(req.body.newPassword)

      await user.update({ passwordDigest })
      return res.send({ status: 'Success', msg: 'Password Updated' })
    }
    return res.status(401).send({ status: 'Error', msg: 'Invalid Credentials' })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals
    return res.send(payload)
  } catch (error) {
    return res.send(false)
  }
}
module.exports = {
  Login,
  Register,
  UpdatePassword,
  CheckSession
}
