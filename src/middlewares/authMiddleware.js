import connection from "../db/dataBase.js";

async function validUser(req, res, next) {
    const {authorization} = req.headers
    const token = authorization?.replace('Bearer ', '')

    if(!token){
        return res.sendStatus(401)
    }

    try {
        
        const user = await connection.query(`
        SELECT
		    users.id AS "userId", users.name
		    FROM sessions
		    JOIN users ON users.id = sessions."userId"
		    WHERE sessions.token = $1;
        `, [token])

        if(!user.rows[0]){
            return res.sendStatus(401)
        }

        res.locals.user = user.rows[0]
        next()

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export default validUser