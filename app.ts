import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import 'dotenv/config';

import { rootRouter } from './routes';
import { configureLogging, startServer, initialiseSentry, attachErrorHandlers, port } from './app-config';

const app = express();

configureLogging();
initialiseSentry();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', rootRouter);

attachErrorHandlers();

startServer(port);

export { app };
