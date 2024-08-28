const postsMetadata = [
    { title: "Hello World!", date: "2024-08-27", file: "hello-world.md" }
];

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function createArticleElement(post) {
    const article = document.createElement('div');
    article.className = 'article';
    
    const title = document.createElement('h2');
    const link = document.createElement('a');
    link.href = `#${post.file}`;
    link.textContent = post.title;
    link.onclick = () => loadPost(post.file);
    title.appendChild(link);
    
    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = formatDate(post.date);
    
    article.appendChild(title);
    article.appendChild(date);
    
    return article;
}

function displayArticles() {
    const articlesContainer = document.getElementById('articles');
    postsMetadata.forEach(post => {
        articlesContainer.appendChild(createArticleElement(post));
    });
}

async function loadPost(filename) {
    const response = await fetch(`posts/${filename}`);
    const markdown = await response.text();
    const html = marked.parse(markdown);
    
    // Find the corresponding post metadata
    const post = postsMetadata.find(p => p.file === filename);
    
    document.body.innerHTML = `
        <div class="nav">
            <a href="index.html">Home</a>
            <a href="writing.html">Writing</a>
            <a href="experience.html">Experience</a>
        </div>
        <article class="post-content">
            <p class="date">${formatDate(post.date)}</p>
            
            ${html}
        </article>
    `;
}

window.onload = displayArticles;

// Handle direct links to posts
if (window.location.hash) {
    loadPost(window.location.hash.slice(1));
}