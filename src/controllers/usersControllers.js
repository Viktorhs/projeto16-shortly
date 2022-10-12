import connection from "../db/dataBase.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid';
import {userSignInSchema, userSignUpSchema} from "../schemas/authSchema.js"

async function singUp(req, res) {
    const {name, email, password, confirmPassword} = req.body
    const isValid = userSignUpSchema.validate({name, email, password, confirmPassword}, {abortEarly: false})
    if(isValid.error) {
        return res.status(422).send(isValid.error.message)
    }

    try {
        const checkEmail = await connection.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])

        console.log(checkEmail.rows[0])

        if(checkEmail.rows[0]){
            return res.sendStatus(409)
        }

        const passwordHash = bcrypt.hashSync(password, 10)

        await connection.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        `, [name, email, passwordHash])

        res.sendStatus(201)
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

async function signIn(req, res) {
    const {email , password} = req.body
    const isValid = userSignInSchema.validate({email, password} , {abortEarly: false})
    if(isValid.error) {
        return res.status(422).send(isValid.error.message)
    }

    try {

        const isValidUser = await connection.query(`
        SELECT * FROM users WHERE email = $1
        `, [email])

        if(!isValidUser.rows[0]){
            return res.sendStatus(401)
        }

        const isValidPassword = bcrypt.compareSync(password, isValidUser.rows[0].password)

        if(!isValidPassword){
            return res.sendStatus(401)
        }

        const userSessions = await connection.query(`
        SELECT * FROM sessions WHERE "userId" = $1
        `, [isValidUser.rows[0].id])

        if(userSessions.rows[0]){
            await connection.query(`
            DELETE FROM sessions WHERE "userId" = $1
            `, [isValidUser.rows[0].id])
        }

        const token = uuid()

        await connection.query(`
        INSERT INTO sessions ("userId", token) VALUES ($1, $2)
        `, [isValidUser.rows[0].id, token])

        res.status(200).send({
            token
        })
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}

export {
    singUp,
    signIn
}