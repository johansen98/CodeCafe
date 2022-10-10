let page = 0;
getPosts(page);

window.onscroll = function(e) {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      getPosts(page++)
  }
};

function getPosts(page){
    const headers = new Headers();
    const token = localStorage.getItem("token");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token)
  
    const request = {
      method: "GET",
      headers: headers
    };

    fetch('https://nf-api.onrender.com/api/v1/social/posts?_author=true&limit=20&offset=' + page, request)
    .then((response) => response.json())
    .then((data) => onResponse(data))
}

function onResponse(data){

    const posts = data;
    const postConatiner = document.getElementById('postContainer');
    posts.forEach(post => {
      
          const postCardContainer = document.createElement('div');
          const postCard = document.createElement('div');
          const postImg = document.createElement('img');
          const postBody = document.createElement('div');
          const postTittle = document.createElement('h5');
          const postContent = document.createElement('p');
          const postFooter = document.createElement('div');
          const authorImg = document.createElement('img');
          const authorName = document.createElement('small')
          const postCreatedDate = document.createElement('small')

          postCardContainer.classList.add('col');
          postCardContainer.classList.add('mb-2');
          postCard.classList.add('h-100')
          postCard.classList.add('card')
          
          postImg.src = post.media
          postImg.classList.add('card-img-top')
          postImg.classList.add('w-50')

          postBody.classList.add('card-body')

          postTittle.innerHTML = post.tittle 
          postTittle.classList.add('card-title')
          postTittle.classList.add('text-center')

          postContent.innerHTML = post.body
          postContent.classList.add('card-text')

          postFooter.classList.add('card-footer')

          authorImg.src = post.author.avatar
          authorImg.classList.add('footer-image')

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
          postFooter.appendChild(authorImg)
          postFooter.appendChild(authorName)
          postFooter.appendChild(postCreatedDate)
          
          postConatiner.appendChild(postCardContainer)



          
      
    });

    




}