import connection from "../db/dataBase.js";

async function validUser(req, res, next) {
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '')

    if(!token){
        return res.sendStatus(422)
    }

    try {
        
        const user = connection.query(`
        SELECT * FROM sessions WHERE token = $1
        `, [token])

        if(!user){
            return res.sendStatus(401)
        }

        res.locals.user = user
        next()

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export default validUser