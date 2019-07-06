import * as express from 'express';
import * as admin from 'firebase-admin';

const notificationRouter = express.Router();

notificationRouter.get('/', (req, res) => {
    res.send("HI testing");
});

notificationRouter.post('/', (req, res) => {
    console.log("sending notification",req)
    const data = req.body.data;
    const token = req.header("token");
    console.log("token is",token);
    const message = {
        data: {
            "payload": JSON.stringify(data)
        },
        token: token
    };
    // Send a message to the device corresponding to the provided
    // registration token.
    const promise = admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            throw new Error("Error sending message")
        });
    return promise;
});
export { notificationRouter };

