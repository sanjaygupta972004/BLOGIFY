import express from 'express';  
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware.js';    

const app = express();

app.use(express.json({
    limit: '5mb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '5mb'
}))

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    origin: true
}));


app.use(cookieParser());


// routes   

import userRouter from './routers/user.router.js';
import postRouter from './routers/post.router.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.use(errorMiddleware);


export default app;