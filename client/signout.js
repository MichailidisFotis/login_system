document.getElementById("logoutButton").addEventListener("click", () => {

 
    execute();
  

    
});


function execute() {
    
    const url = "/users/signout";

    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
        })
        .then((response) => {
        
        
          return response.json();
        })
        .then((data) => {
            if(!data.signout){
                
            }
        
            else
                 location.replace("/")
          
        })
        .catch((error) => {
        
            console.log(error)
        
        });

}