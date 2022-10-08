
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

    const posts = data;
    posts.forEach(post => {
      
          const postConatiner = document.getElementById('postContainer');
      
          const postCardContainer = document.createElement('div');
          const postCard = document.createElement('div');
          const postImg = document.createElement('img');
          const postBody = document.createElement('div');
          const postTittle = document.createElement('h5');
          const postContent = document.createElement('p');
          const postFooter = document.createElement('div');
          const authorImg = document.createElement('img');
          const authorName = document.createElement('small')
          const authorDOB = document.createElement('small')

          postImg.src = post.media[0]

          console.log(postImg)

      
    });

    




}