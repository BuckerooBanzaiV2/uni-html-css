document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('blog-posts');
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postsContainer.appendChild(postElement);
    });
});
