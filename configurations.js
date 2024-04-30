const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "https://ducks-service-???.onrender.com";

function getHost() {
    // return (mode == 0) ? host_local : host_remote;
    return host_local
}

function saveTheToken(token) {
  localStorage.setItem("token", token);
  updateTheNavigationBar();
} 

function removeTheToken() {
 localStorage.removeItem("token");
 updateTheNavigationBar();
} 

function getTheToken() {
  return localStorage.getItem("token");
} 




let configuration = {
  isLoggedIn: () => isLoggedIn(), 
  host: () => getHost(), 
  token: () => getTheToken()    
};


async function login() {    
    let email = document.getElementById("email-signin").value;
    let password = document.getElementById("password-signin").value;
    let customer = {email: email, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/login", request);
        if(response.status == 200) {  
          alert("The login was successful!");
          const token = await response.text();
          saveTheToken(token);            
          location.href = "index.html";
        } else {
            console.log(`response status:${response.status}`);
            removeTheToken();            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}

async function signup() {
    let email = document.getElementById("email-signup").value;
    let password = document.getElementById("password-signup").value;
    let customer = {email:email, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/signup", request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            location.href = "login.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}

async function logout() {   
  removeTheToken();  
}

function addBasket(flowerId) {
  return;
}



async function getAll() {
  let response = await fetch(host_local + "/flowers", {
});
  let result = await response.json();
  return result;
}



