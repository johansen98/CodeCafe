const token = localStorage.getItem("token");
if(token){
    document.location = "/index.html";
}

function logIn(event) {
  event.preventDefault();

    
   const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;


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
  localStorage.setItem("email", result.email)
  document.location = "/index.html";

}


