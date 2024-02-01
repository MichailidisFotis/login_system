import request from 'supertest'
import makeApp from "../index.js"

import requireLogin from '../middlewares/requireLogin.js'
import {jest} from '@jest/globals'

const app = makeApp



const data={
    firstname:"testingFirstname",
    surname:"testingSurname",
    username:"testingUsername",
    user_password:"1234",
    verify_password:"1234"
}

const login_data = {
    username : "testingUsername",
    password : "1234"
}

test("Get logged in user is not completed when no one is logged in" , async()=>{
    var response  = await request(app)
    .get("/users/user")
    
    expect(response.body.message).toBe("Unauthorized")
    expect(response.status).toBe(401)
})

test("Registration is done correctly",async()=>{
    var response =  await request(app)
    .post("/users/signup")
    .send(data)
  
      expect(response.body.message).toBe("User created")
      expect(response.status).toBe(201)
  })



test("Registrarion is not completed if passwords don't match" , async()=>{
    var response  = await request(app)
    .post("/users/signup")
    .send({
        firstname:"testingFirstname",
        surname:"testingSurname",
        username:"testingUsername",
        user_password:"1234",
        verify_password:"12345"
    })

    expect(response.body.message).toBe("Passwords must match")
    expect(response.status).toBe(400)

})



test("Registrarion is not completed if username is already taken" , async()=>{
    var response  = await request(app)
    .post("/users/signup")
    .send({
        firstname:"testingFirstname",
        surname:"testingSurname",
        username:"testingUsername",
        user_password:"1234",
        verify_password:"1234"
    })

    expect(response.body.message).toBe("Username already taken")
    expect(response.status).toBe(400)

})



test("Login is not completed if the inserted username is not found" , async()=>{
    var response  = await request(app)
    .post("/users/login")
    .send({
        
        username:"testingUsernam",
        password:"1234"
        
    })

    expect(response.body.message).toBe("Username not found")
    expect(response.status).toBe(400)

})



test("Login is not completed if password is incorrect" , async()=>{
    var response  = await request(app)
    .post("/users/login")
    .send({
        
        username:"testingUsername",
        password:"12345"
        
    })

    expect(response.body.message).toBe("Please check your password")
    expect(response.status).toBe(400)

})

test("Login is done correctly" , async()=>{
    var response = await request(app)
    .post("/users/login")
    .send(login_data)

    expect(response.status).toBe(200)

})

