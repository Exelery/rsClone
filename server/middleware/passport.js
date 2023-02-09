import {Strategy, ExtractJwt } from 'passport-jwt';
import { authDb} from '../databases/authDb.js'
import { config } from 'dotenv';
config()


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT 
}

export const jwtPass = (passport) => {
  passport.use(
      new Strategy(options, (payload, done) => {
          try {
            authDb.query(`SELECT id, email FROM users WHERE id = "${payload.userId}"`, (error, rows, fields) => {
                  if(error) {
                      console.log(error)
                  } else {
                      const user = rows
                      if(user) {
                          done(null, user)
                      } else {
                          done(null, false)
                      }
                  }
              })
          } catch(e) {
              console.log(e);
          }
      })
  )
}