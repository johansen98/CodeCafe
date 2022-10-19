let postData = [];
const searchForm = document.getElementById('search');
searchForm.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      search()
  }
});

getPosts();
function search(){
    const searchValue = searchForm.value;
    let filterData = postData.filter(p => {
      return p.title.toLowerCase().includes(searchValue.toLowerCase()) ||
             p.body.toLowerCase().includes(searchValue.toLowerCase()) ||
             p.author.name.toLowerCase().includes(searchValue.toLowerCase())
      
    });

    onResponse(filterData);


 
}


function getPosts(){
  
    const headers = new Headers();
    const token = localStorage.getItem("token");
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token)
  
    const request = {
      method: "GET",
      headers: headers
    };

    fetch('https://nf-api.onrender.com/api/v1/social/posts?_author=true&limit=100', request)
    .then((response) => response.json())
    .then((data) => {
      postData = data;
    onResponse(data)
    
    })
}

function onResponse(data){

    const posts = data;
    const postConatiner = document.getElementById('postContainer');
    postConatiner.innerHTML = "";
    posts.forEach(post => {
      
          const postCardContainer = document.createElement('div');
          const postCard = document.createElement('div');
          const postImg = document.createElement('img');
          const postBody = document.createElement('div');
          const postTittle = document.createElement('h3');
          const postContent = document.createElement('p');
          const postFooter = document.createElement('div');
          const authorImg = document.createElement('img');
          const authorName = document.createElement('small')
          const postCreatedDate = document.createElement('small')

          postCardContainer.addEventListener('click', () => {
          window.location.href = '/spesific.html?postId=' + post.id
          })

          postCardContainer.classList.add('col');
          postCardContainer.classList.add('mb-5');
          postCard.classList.add('h-100')
          postCard.classList.add('card')
          
          postImg.src = post.media
          postImg.classList.add('card-img-top')
          

          postBody.classList.add('card-body')

          postTittle.innerHTML = post.title 
          postTittle.classList.add('card-title')
          postTittle.classList.add('text-center')

          postContent.innerHTML = post.body
          postContent.classList.add('card-text')
          postContent.classList.add('text-center')

          postFooter.classList.add('card-footer')


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
          postFooter.appendChild(authorImg)
          postFooter.appendChild(authorName)
          postFooter.appendChild(postCreatedDate)
          
          postConatiner.appendChild(postCardContainer)     
    });
}


/*this create posts*/
var form = document.getElementById("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

function createPost(e){
  const headers = new Headers();
  const token = localStorage.getItem("token");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + token)
  const createTittle = document.getElementById('title').value;
  const createImg = document.getElementById('imgUrl').value;
  const createBody = document.getElementById('body').value

  const create = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({"title": createTittle, "body": createBody, "media": createImg})
  }

  fetch('https://nf-api.onrender.com/api/v1/social/posts', create)
  .then(response => response.json())
  .then(created => {
    document.getElementById('title').value = "";
    document.getElementById('imgUrl').value = "";
    document.getElementById('body').value = "";
    getPosts()
  })

}





