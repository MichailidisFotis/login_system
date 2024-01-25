import request from 'supertest'
import makeApp from "../index.js"


const app = makeApp

const data={
    firstname:"testingFirstname",
    surname:"testingSurname",
    username:"testingUsername",
    user_password:"1234",
    verifyPassword:"1234"
}

const login_data = {
    username : "testingUsername",
    password : "1234"
}




test("Registration is done correctly",async()=>{
    var response =  await request(app)
    .post("/users/signup")
    .send(data)
  
      expect(response.body.message).toBe("User created")
      expect(response.status).toBe(201)
  })

test("Login is done correctly" , async()=>{
    var response = await request(app)
    .post("/users/login")
    .send(login_data)

    expect(response.status).toBe(200)

})