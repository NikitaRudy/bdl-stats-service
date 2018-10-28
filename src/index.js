const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const util = require('util');

const router = require('./routes');
const db = require('./db');

process.env.NODE_ENV === 'production' || require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = new Koa();
const listen = util.promisify(app.listen.bind(app));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = (err && err.status) || 500;
        ctx.body = err && err.message;
        console.error('Smth went wrong: ', err);
    }
});

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

async function startServer() {
    await listen(PORT);
    return PORT;
}

(async function () {
    try {
        await db.connect();
        console.log('connected to the db');
        console.log('listening on port ', await startServer());
    } catch (error) {
        console.error('an error occured during boot: ', error);
    }
}());
