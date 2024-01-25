import  sqlite3  from "sqlite3";



const db = new sqlite3.Database('application.db', (err) => {

    if (err) {
        console.error(err.message)
    }
    else{

        db.run(`DELETE FROM USERS` , err=>{
            if (err) {
                console.error(err)
            }

        })

        db.run(` CREATE TABLE IF NOT EXISTS users(
                user_id varchar(255) PRIMARY KEY,
                username varchar(255),
                user_password varchar(255),
                firstname varchar(255),
                surname varchar(255)
        )
        ` , err=>{
            if (err) {
                console.log(err.message)
            }
        })

    }


})


export default db;