const express = require('express')
const router = express.Router()
const sequelize = require('../utils/database')

router.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId

    const search_query = `
        SELECT id, createdAt, userAId as 'userId', itemAId as 'itemId', userBId as 'otherUserId', itemBId as 'otherItemId'
        FROM trades
        WHERE userAId=${userId};
      `
    try {
        const results = await sequelize.query(search_query, {
            type: sequelize.QueryTypes.SELECT
        })
        res.status(200).send(JSON.stringify(results))
    } catch (err) {
        console.error(err)
        next()
    }
})

module.exports = router
