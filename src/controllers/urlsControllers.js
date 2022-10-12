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

async function getUrlById (req, res){
    const {id} = req.params
    const reg = /^\d+$/

    if(!reg.test(id)){
       return res.sendStatus(422)
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

async function getUrlByShortUrl (req, res){
    const {shortUrl} = req.params

    try {
        const url = await connection.query(`
        SELECT * FROM "usersUrls" WHERE "shortUrl" = $1
        `, [shortUrl])

        if(!url.rows[0]){
            return res.sendStatus(404)
        }

        await connection.query(`
        INSERT INTO "visitCount" ("urlId") VALUES ($1)
        `, [url.rows[0].id])

        res.redirect(url.rows[0].url)

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

}

async function deleteUrl (req, res){
    const { userId } = res.locals.user
    const {id} = req.params
    const reg = /^\d+$/

    if(!reg.test(id)){
        return res.sendStatus(422)
     }

    try {
        const isUserUrl = await connection.query(`
        SELECT * FROM "usersUrls" WHERE id = $1
        `, [id])

        if(!isUserUrl.rows[0]){
            return res.sendStatus(404)
        }

        if(isUserUrl.rows[0].userId !== userId){
            return res.sendStatus(401)
        }

        await connection.query(`
        DELETE FROM "visitCount" WHERE "urlId" = $1
        `, [id])

        await connection.query(`
        DELETE FROM "usersUrls" WHERE id = $1
        `, [id]) 

        res.sendStatus(204)

     } catch (error) {
        console.log(error)
        return res.sendStatus(500)
     }


}

export{
    shortenUrl,
    getUrlById,
    getUrlByShortUrl,
    deleteUrl
}