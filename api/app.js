import express from 'express';  

const app = express();

app.use(express.json({
    limit: '5mb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '5mb'
}))


// routes   

import userRouter from './routers/user.router.js';

app.use('/api/v1/users', userRouter);


export default app;