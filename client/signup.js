document.getElementById("submitButton").addEventListener("click", () => {

  
    execute();
  

    
});

document.addEventListener("keypress" , (event)=>{

  if (event.key==="Enter") {
      execute();
  }

})


  
  function execute() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const verify_password =  document.getElementById("verifyPassword").value;
    const firstname =  document.getElementById("firstname").value
    const surname = document.getElementById("surname").value

  
    const responseLabel =  document.getElementById("Response");
    const messageBox = document.getElementById("message")
  
  
  
    const url = "/users/signup";
  
    const data = {
      username: username,
      user_password: password,
      verify_password:verify_password,
      firstname:firstname,
      surname:surname
    };
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
  
       }
        return response.json();
      })
      .then((data) => {
          if(data.signup==false){
              const message =  data.message
              messageBox.style.display="block"
              responseLabel.style.color = "#aa0436"
              responseLabel.innerHTML='<i class="fa-solid fa-triangle-exclamation"></i>  '+message
          }
          else {

                const message =  data.message
                messageBox.style.display="block"
                responseLabel.style.color = "#04aa6d"
                responseLabel.innerHTML='<i class="fa-regular fa-circle-check"></i>  '+message
            }
          
        
      })
      .catch((error) => {
  
          console.log(error)
  
      });
  }
