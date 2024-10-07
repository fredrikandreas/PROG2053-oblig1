const fetchedPosts = [];

fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        for (i = 0; i < json.length; i++) {
            fetchedPosts.push(json[i]);
        }
        addNewPosts();
      })

function addNewPosts() {
    for (i = 0; i < 4; i++) {
        try {
            const section = document.createElement('section');
            section.classList.add('post-section');
            for (j = 0; j < 3; j++) {
                const currentPost = fetchedPosts.pop();
                const post = document.createElement('div');
                post.classList.add('post');
                const title = document.createElement('h2');
                title.innerText = currentPost.title;
                const body = document.createElement('p');
                body.innerText = currentPost.body;
                post.appendChild(title);
                post.appendChild(body);
                section.appendChild(post);
            }
            const footer = document.querySelector('footer');
            document.body.insertBefore(section, footer);
        }
        catch(err) {
            window.removeEventListener('scroll', scrollHandler);
        }
    }
}

function scrollHandler() {
    if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
        addNewPosts();
    }
}

window.addEventListener('scroll', scrollHandler, false);