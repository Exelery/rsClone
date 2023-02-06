import passport from 'passport'
import { getAllUsers, signup, signin } from '../controller/userController.js'

export const routes = (app) => {
  app.route('/api/users')
  .get(passport.authenticate('jwt', { session: false }), getAllUsers)
  app.route('/api/auth/signup').post(signup)
  app.route('/api/auth/signin').get(signin)
}
