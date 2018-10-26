const Router = require('koa-router');
const Player = require('../models/Player');

const router = new Router();

router.get('/api/players-stats', async (ctx, next) => {
    ctx.body = await Player.find();
    await next();
});

module.exports = router;
