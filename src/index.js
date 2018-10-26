const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const serve = require('koa-static');
const path = require('path');

const router = require('./routes');
const db = require('./db');

const PORT = process.env.PORT || 8080;
const app = new Koa();

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
app.use(serve(path.join(__dirname, '../../build')));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

function startServer() {
    return new Promise((resolve, reject) => {
        app.listen(
            PORT, err => (err ? reject(err) : resolve(PORT))
        );
    });
}

(async function () {
    await db.connect();
    console.log('connected to the db');
    console.log('listening on port ', await startServer());
}());
