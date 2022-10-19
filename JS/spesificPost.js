const deleteBtn = document.getElementById("deleteBtn");


getPost(

)
function getPost(){
    const headers = new Headers();
    const token = localStorage.getItem("token");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token)
    const params = new URLSearchParams(window.location.search)
    const postId = params.get('postId');
  
    const request = {
      method: "GET",
      headers: headers
    };

    fetch('https://nf-api.onrender.com/api/v1/social/posts/'+ postId + '?_author=true&include=', request )
    .then(response => {return response.json()})
    .then (data => {
        const post = data;
        const postConatiner = document.getElementById('postContainer');
        const postEmail = post.author.email;
        const loginUserEmail = localStorage.getItem("email")
        if(postEmail !== loginUserEmail){
          deleteBtn.classList.add("invisible");
        }
       
        console.log()
        
        const postCardContainer = document.createElement('div');
        const postCard = document.createElement('div');
        const postImg = document.createElement('img');
        const postBody = document.createElement('div');
        const postTittle = document.createElement('h2');
        const postContent = document.createElement('p');
        const postFooter = document.createElement('div');
        const postFooterRight = document.createElement('div');
        const postFooterLeft = document.createElement('div');
        const authorImg = document.createElement('img');
        const authorName = document.createElement('small')
        const postCreatedDate = document.createElement('small')

        const commentContainer = document.createElement('div');
        

        postCardContainer.classList.add('col');
        postCardContainer.classList.add('mb-5');
        postCard.classList.add('h-100')
        postCard.classList.add('card')
        postContent.contentEditable = true;
        
        postImg.src = post.media
        postImg.classList.add('card-img-top')
        postImg.classList.add('w-50')
        postImg.classList.add('mx-auto')
        

        postBody.classList.add('card-body')

        postTittle.innerHTML = post.title 
        postTittle.classList.add('card-title')
        postTittle.classList.add('text-center')

        postContent.innerHTML = post.body
        postContent.classList.add('card-text')
        postContent.classList.add('text-center')

        postFooter.classList.add('card-footer')
        postFooter.classList.add('d-flex')
        postFooter.classList.add('justify-content-between')
        

        if(!post.author.avatar){
          authorImg.src = '/src/sass/img/missingImg.webp'
          authorImg.classList.add('footer-image')
        }else{
          authorImg.src = post.author.avatar
          authorImg.classList.add('footer-image')
        }

        authorName.innerHTML = post.author.name
        authorName.classList.add('text-muted')

        postCreatedDate.innerHTML = post.created
        postCreatedDate.classList.add('text-muted')

        postCardContainer.appendChild(postCard)
        postCard.appendChild(postImg)
        postCard.appendChild(postBody)
        postCard.appendChild(postTittle)
        postCard.appendChild(postContent)
        postCard.appendChild(postFooter)
        postFooterRight.appendChild(authorImg)
        postFooterRight.appendChild(authorName)
        postFooterLeft.appendChild(postCreatedDate)
        postFooter.appendChild(postFooterRight)
        postFooter.appendChild(postFooterLeft)
        
        postConatiner.appendChild(postCardContainer)

    
    })
}

function deletePost(){
  const headers = new Headers();
  const token = localStorage.getItem("token");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token)

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const postID = urlParams.get("postId");
  const deleteUrl = "https://nf-api.onrender.com/api/v1/social/posts/" + postID
  
  fetch(deleteUrl, {method: "DELETE",headers: headers})
  .then(response => response.json())
  .then(deleted => {
    window.location.href="/index.html";
  })

  




}