import connection from "../db/dataBase.js"
import bcrypt from "bcrypt"
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

export {
    singUp
}