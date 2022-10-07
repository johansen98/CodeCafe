
function signUp(event){
    event.preventDefault()
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const rePassword = document.getElementById("re-password").value


    if(!validateFields(name,email,password,rePassword)){

        return
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          name: name,  
          email: email,
          password: password
        })
      };

    fetch("https://nf-api.onrender.com/api/v1/social/auth/register", request)
    .then((response) => response.json())
    .then((result) => logIn(email, password))
    .catch((error) => console.log("error", error));

}


function validateFields(name,email,password,rePassword){
//vaider email til stud.noroff.no || .noroff.no
    if(!name || !email || !password || !rePassword){
        return false;

    }
    else if(password !== rePassword){
        return false;
    }
    return true;

}

function logIn(email, password) {
  
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    const request = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("https://nf-api.onrender.com/api/v1/social/auth/login", request)
      .then((response) => response.json())
      .then((result) => onResult(result))
      .catch((error) => console.log("error", error));
  }
  
  function onResult(result){
    if (result.accessToken == undefined) {
      alert(result.message);
      return;
    }
    const token = result.accessToken;
    localStorage.setItem("token", token);
    document.location = "/index.html";
  }
  
  