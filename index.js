import express from "express"
import session from "express-session"
import { fileURLToPath } from 'url';
import {dirname} from "path"
import usersRouter from "./users/users.js"



const app =express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
    cookie: {
        maxAge:269999999999
      }
}));





app.use(express.static(__dirname))




app.use('/users' ,usersRouter)


export default app;