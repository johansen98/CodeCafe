const token = localStorage.getItem("token");



if(!token){
    document.location = "/login.html";
}

function logOut(event){
    event.preventDefault();
    localStorage.removeItem("token")
    document.location = "/login.html";

}
