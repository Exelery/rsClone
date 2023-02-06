import { status } from '../response.js'
import { authDb } from '../databases/authDb.js'
import  bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config()

export const getAllUsers = (req, res) => {
  authDb.query(`SELECT id, email, FROM users WHERE email = ${req.body.email}`, (error, rows, fields) => {
    if (error) {
      status(400, error, res);
    } else {
      status(200, rows, res)
    }
  })

}

export const signup = (req, res) => {
  const email = req.body.email
  const salt = bcrypt.genSaltSync(15)
  const password = bcrypt.hashSync(req.body.password, salt)
  const sqlCheck = `SELECT id, email, password FROM users WHERE email = "${email}"`;
  authDb.query(sqlCheck, (error, rows, fields,) => {
    if (error) {
      status(400, error, res);
    } else if (typeof rows !== 'undefined' && rows.length > 0) {

      const row = JSON.parse(JSON.stringify(rows))
      row.map(rw => {
        status(302, { message: `User with name - ${rw.email} already exist` }, res)
        return true
      })
    } else {

      const sql = `INSERT INTO users(email, password) VALUES("${email}", "${password}")`;
      authDb.query(sql, (error, results) => {
        if (error) {
          status(400, error, res)
        } else {
          status(200, { message: `Registration is successful`, results }, res)
        }
      })

    }
  })
}

export const signin = (req, res) => {

  authDb.query(`SELECT id, email, password FROM users WHERE email = "${req.body.email}"`, (error, rows, fields) => {
    if (error) {
      status(400, error, res)
    } else if (rows.length <= 0) {
      status(401, { message: `Пользователь с email - ${req.body.email} не найден. Пройдите регистрацию.` }, res)
    } else {
      const row = JSON.parse(JSON.stringify(rows))
      row.map(rw => {
        const password = bcrypt.compareSync(req.body.password, rw.password)
        if (password) {
          //Если true мы пускаем юзера и генерируем токен
          const token = jwt.sign({
            userId: rw.id,
            email: rw.email
          }, process.env.JWT, { expiresIn: 120 * 120 })

          status(200, { token: `Bearer ${token}` }, res)

        } else {
          //Выкидываем ошибку что пароль не верный
          status(401, { message: `Пароль не верный.` }, res)

        }
        return true
      })
    }
  })

}