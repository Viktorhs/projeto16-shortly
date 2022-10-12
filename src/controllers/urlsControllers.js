import connection from "../db/dataBase.js"
import { nanoid } from 'nanoid'

async function shortenUrl(req, res){
    const { userId } = res.locals.user
    const { url } = req.body
    const isValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(url)

    if(!isValidUrl){
        return res.sendStatus(422)
    }

    try {
        const shortUrl = nanoid(10)

        await connection.query(`
        INSERT INTO "usersUrls" ("userId", "shortUrl", url) VALUES ($1, $2, $3)
        `, [userId, shortUrl, url])

        res.send({shortUrl})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

async function getUrlById(req, res){
    const {id} = req.params

    if(!id){
        res.sendStatus(422)
    }

    try {

        const shortUrl = await connection.query(`
        SELECT id, "shortUrl", url FROM "usersUrls" WHERE id = $1
        `, [id])

        if(!shortUrl.rows[0]){
            return res.sendStatus(404)
        }

        res.status(200).send(shortUrl.rows[0])

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export{
    shortenUrl,
    getUrlById
}