import express from "express";
import bodyParser from "body-parser";
import db from "../database.js";
import md5 from "md5";
import { v4 as uuidv4 } from "uuid";
import requireLogin from "../middlewares/requireLogin.js";
import { fileURLToPath } from 'url';
import {dirname} from "path"


var jsonParser = bodyParser.json();



const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//*register user
router.post("/signup", jsonParser, async (req, res) => {
  var user_id = uuidv4();
  var username = req.body.username;
  var user_password = req.body.user_password;
  var verify_password = req.body.verify_password;
  var firstname = req.body.firstname;
  var surname = req.body.surname;


  //*check if two passwords match
  if (user_password !==verify_password){
    res.status(400).send({
      message:"Passwords must match",
      signup:false})
    return
  }

  var user =  await new Promise((resolve, reject) => {
    db.all(`
      SELECT * FROM USERS WHERE username = ?
    ` , username ,  (err , rows)=>{
        if(err)
          reject(err)
        else  
          resolve(rows)
    })
  })
  
  //*check if username is taken
  if(user.length>0)
  {
    res.status(400).send({message:"Username already taken",signup:false})
    return
  }


  db.run(
    `INSERT INTO USERS (user_id , username , user_password , firstname , surname)
     VALUES(?,?,?,?,?)`,
    [user_id, username, md5(user_password), firstname, surname],
    (err, result) => {
      if (err) {
        res.status(400).send({
          message: err.message
        });
      } else {
        res.status(201).send({
          message: "User created",signup:true
        });
      }
    }
  );
});

router.post("/login", jsonParser, async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;


  //* check if username exists in database
  var user = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM USERS WHERE username=?`, username, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

  if (user.length == 0) {
    res.status(400).send({ 
      logged:false,
      message: "Username not found" });
    return;
  }

  //*check if the password is correct
  var autheticate_user = await new Promise((resolve, reject) => {
    db.all(
      ` SELECT * FROM USERS WHERE username =? AND user_password=?
        `,
      [username, md5(password)],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });

  //*send answer if password is incorrect
  if (autheticate_user == 0) {
    res.status(400).send({
      logged:false,
      message: "Please check your password" });
    return;
  }

      //* create session variables
      req.session.user_id = autheticate_user[0].user_id;
      req.session.username = autheticate_user[0].username;
      req.session.firstname = autheticate_user[0].firstname;
      req.session.surname = autheticate_user[0].surname;



      res.status(200)
      .send({logged:true});


});

router.get("/users", async (req, res) => {
  var users = await new Promise((resolve, reject) => {
    db.all("SELECT * FROM USERS", (err, rows) => {
      if (err) {
        console.error(err);
        res.status(400).send({
          message: err.message,
        });
      } else {
        resolve(rows);
      }
    });
  });

  if (users.length==0)
    res.status(400).send({message:"There are not any users"})
  else
    res.status(200).send({users: users });
});

router.get("/user",requireLogin, async(req , res)=>{

  res.status(200).send({

    username:req.session.username,
    user_id:req.session.user_id,
    firstname:req.session.firstname,
    surname:req.session.surname
  })
})


router.post('/signout' , requireLogin , async(req , res)=>{
    req.session.destroy()
    
    res.send({
      signout:true
    })


})


export default router;
