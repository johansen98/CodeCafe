
function getPosts(){
    const headers = new Headers();
    const token = localStorage.getItem("token");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token)
  
    const request = {
      method: "GET",
      headers: headers
    };

    fetch('https://nf-api.onrender.com/api/v1/social/posts', request)
    .then((response) => response.json())
    .then((data) => onResponse(data))
}

function onResponse(data){
    const postConatiner = document.getElementById('postContainer');

    const postCard = create

}