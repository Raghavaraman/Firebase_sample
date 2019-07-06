import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import {notificationRouter} from './notification';

admin.initializeApp(functions.config().firebase);

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/notification',notificationRouter);

export const api = functions.https.onRequest(app);
