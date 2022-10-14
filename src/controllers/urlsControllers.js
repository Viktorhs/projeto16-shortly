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
        const visit = Number(url.rows[0].visitCount) + 1;
        await connection.query(`
        UPDATE "usersUrls" SET "visitCount" = $1 WHERE id = $2
        `, [visit, url.rows[0].id])

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
        DELETE FROM "usersUrls" WHERE id = $1
        `, [id]) 

        res.sendStatus(204)

     } catch (error) {
        console.log(error)
        return res.sendStatus(500)
     }


}

async function listUrlsUser (req, res){
    const { userId, name } = res.locals.user

    try {
        
        const userInf = await connection.query(`
        SELECT 
            u.id, u."shortUrl", u.url, u."visitCount"
        FROM "usersUrls" u
        WHERE u."userId" = $1
        ORDER BY u.id
        `, [userId])

        if(!userInf.rows[0]){
            return res.sendStatus(404)
        }

        let sum = 0
        userInf.rows.forEach((item) => {
            sum += Number(item.visitCount)
            item.visitCount = Number(item.visitCount)
        })
        
        res.status(200).send({
            id: userId,
            name: name,
            visitCount: sum,
            shortenedUrls:userInf.rows})

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

async function ranking (req, res){
    try {
        
        const rankingList = await connection.query(`
        SELECT 
            users.id, 
            users.name, 
            COUNT(a."userId") AS "linksCount", 
            COALESCE(SUM(a."visitCount"),0) AS "visitCounts"
        FROM users
        LEFT JOIN "usersUrls" a ON users.id = a."userId"
        GROUP BY users.id
        ORDER BY "visitCounts" DESC
        LIMIT 10;
        `)

        res.send(rankingList.rows)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export{
    shortenUrl,
    getUrlById,
    getUrlByShortUrl,
    deleteUrl,
    listUrlsUser,
    ranking
}