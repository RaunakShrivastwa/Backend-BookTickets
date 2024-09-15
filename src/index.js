import expres from 'express';
import dotenv from 'dotenv';
import cluster from 'cluster';
import os from 'os';
import db from './config/mongodb.config.js';
import redisClient from './config/redis.config.js';
import { pid } from 'process';
import apiRouter from './router/apiRouter.js';
import verifyToken from './auth/jwtAuthentication.js';


if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {

    dotenv.config();
    const PORT = process.env.PORT;
    const app = expres();
    app.get('/hello', (req, res) => {
        return res.json({message:'hello Shubham'})
    })
    app.use(expres.json());
    app.use('/',apiRouter);
    

    app.listen(PORT, (err) => {
        if (err) {
            return console.log("There is Error  ", err);
        }
        console.log(`Server Running...... at ${PORT} by ${pid}`);

    });

}



