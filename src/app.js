import express from 'express';
import { env } from './config/env';
import logger from 'morgan';

import { cronInit } from './cron';
import publicRoutes from './routes/public/index.routes';
import privateRoutes from './routes/private/index.routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());

//config cors 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.use('/', publicRoutes);
app.use('/', privateRoutes);


app.listen(env.server.port || 3000, () => {
    console.log('Server running on http://localhost:'+env.server.port);
    cronInit();
});

 