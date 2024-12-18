document.addEventListener('DOMContentLoaded', function() {
    const postAction = document.getElementById('post-action');
    const postSelect = document.getElementById('post-select');
    const titleInput = document.getElementById('title');
    const contentTextarea = document.getElementById('content');
    
    postAction.addEventListener('change', function() {
        switch (postAction.value) {
            case 'edit':
            case 'delete':
                postSelect.style.display = 'block';
                titleInput.style.display = postAction.value === 'edit' ? 'block' : 'none';
                contentTextarea.style.display = postAction.value === 'edit' ? 'block' : 'none';
                loadPostOptions();
                break;
            case 'new':
            default:
                postSelect.style.display = 'none';
                titleInput.style.display = 'block';
                contentTextarea.style.display = 'block';
                titleInput.value = '';
                contentTextarea.value = '';
                break;
        }
    });

    document.getElementById('post-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const action = postAction.value;
        const title = titleInput.value;
        const content = contentTextarea.value;
        
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        
        if (action === 'new') {
            const newPost = {
                id: new Date().getTime(),
                title: title,
                content: content
            };
            posts.push(newPost);
        } else if (action === 'edit') {
            const selectedPostId = parseInt(postSelect.value);
            posts = posts.map(post => post.id === selectedPostId ? { ...post, title: title, content: content } : post);
        } else if (action === 'delete') {
            const selectedPostId = parseInt(postSelect.value);
            posts = posts.filter(post => post.id !== selectedPostId);
        }
        
        localStorage.setItem('blogPosts', JSON.stringify(posts));
        alert(`Beitrag ${action === 'new' ? 'hinzugefügt' : action === 'edit' ? 'bearbeitet' : 'gelöscht'}!`);
        document.getElementById('post-form').reset();
        if (action !== 'new') {
            postSelect.style.display = 'none';
        }
        titleInput.style.display = 'block';
        contentTextarea.style.display = 'block';
        loadPostOptions();
    });

    function loadPostOptions() {
        let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        postSelect.innerHTML = posts.map(post => `<option value="${post.id}">${post.title}</option>`).join('');
    }
});
