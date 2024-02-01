const cardFullname = document.getElementById("Fullname card")
const tableFirstname = document.getElementById("Firstname Table")
const tableSurname =  document.getElementById("Surname Table")
const tableUsername = document.getElementById("Username Table")



const url = "/users/user"  



fetch(url)
  .then(response => {
    //handle response            
    return response.json()
})
  .then(data => {
    //handle data
    cardFullname.innerHTML = ""+data.firstname+" "+data.surname
    tableFirstname.innerHTML=""+data.firstname
    tableSurname.innerHTML=""+data.surname
    tableUsername.innerHTML=""+data.username

})
  .catch(error => {
    //handle error
  });