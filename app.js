const baseUrl = 'http://localhost:9999';

let firstSeenId = 0;
let lastSeenId = 0;

const rootEl = document.getElementById('root');
const formEl = document.createElement('form');
formEl.className = 'form-inline mb-2';
formEl.innerHTML = `
    <div class="form-group">
        <input class="form-control" data-id="content" placeholder="Введите текст или url источника" size="30">
    </div>
    <select class="custom-select" data-id="type">
        <option value="regular">Обычный</option>
        <option value="image">Изображение</option>
        <option value="audio">Аудио</option>
        <option value="video">Видео</option>
    </select>
    <button class="btn btn-info">Добавить</button>
`;
rootEl.appendChild(formEl);

const contentEl = formEl.querySelector('[data-id=content]');
contentEl.value = localStorage.getItem('content');
contentEl.addEventListener('input', e => {
    localStorage.setItem('content', contentEl.value);
});

const typeEl = formEl.querySelector('[data-id=type]');
typeEl.value = localStorage.getItem('type') || 'regular';
typeEl.addEventListener('input', e => {
    localStorage.setItem('type', typeEl.value);
});


formEl.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        content: contentEl.value,
        type: typeEl.value,
    };
    fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }).then(data => {
        contentEl.value = '';
        typeEl.value = 'regular';
        localStorage.clear();
        renderNewPosts(data);
    }
    ).catch(error => {
        console.log(error);
    });
});


const contentEl = formEl.querySelector('[data-id=content]');
contentEl.value = localStorage.getItem('content');
contentEl.addEventListener('input', e => {
    localStorage.setItem('content', contentEl.value);
});

const typeEl = formEl.querySelector('[data-id=type]');
typeEl.value = localStorage.getItem('type') || 'regular';
typeEl.addEventListener('input', e => {
    localStorage.setItem('type', typeEl.value);
});


formEl.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        content: contentEl.value,
        type: typeEl.value,
    };
    fetch(`${baseUrl}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }).then(data => {
        contentEl.value = '';
        typeEl.value = 'regular';
        localStorage.clear();
        renderNewPosts(data);
    }
    ).catch(error => {
        console.log(error);
    });
});

rootEl.appendChild(formEl);


function renderNewPosts(data) {
    if (data.length === 0) {
        return;
    }
    if (Array.isArray(data)) {
        firstSeenId = data[0].id;
        for (const item of data) {
            postsEl.insertBefore(rebuildList(item), postsEl.children[0]);
        }
    } else {
        firstSeenId = data.id;
        postsEl.insertBefore(rebuildList(data), postsEl.children[0]);
    }
}

unction rebuildList(item) {
    const el = document.createElement('div');
    el.className = 'card-posts';

    if (item.type === 'regular') {
        el.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">${item.content}</p>
                <button class="btn btn-primary" data-action="like">👍🏼 ${item.likes}</button>
                <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                <button class="btn btn-danger" data-action="delete">X</button>
            </div>
        </div>
        `;
    } else if (item.type === 'image') {
        el.innerHTML = `
        <div class="card">
            <img src="${item.content}" class="card-img-top">
            <div class="card-body">
                <button class="btn btn-primary" data-action="like">👍🏼 ${item.likes}</button>
                <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                <button class="btn btn-danger" data-action="delete">X</button>
            </div>
        </div>
        `;
    } else if (item.type === 'video') {
        el.innerHTML = `
        <div class="card">
            <div class="embed-responsive embed-responsive-16by9">
                 <iframe class="embed-responsive-item" src="${item.content}"></iframe>
            </div>
            <div class="card-body">
                <button class="btn btn-primary" data-action="like">👍🏼 ${item.likes}</button>
                <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                <button class="btn btn-danger" data-action="delete">X</button>
            </div>
        </div>
        `;
    } else if (item.type === 'audio') {
        el.innerHTML = `
        <div class="card">
            <div class="card-img-top">
                <audio src="${item.content}" controls></audio>
            </div>
            <div class="card-body">
                <button class="btn btn-primary" data-action="like">👍🏼 ${item.likes}</button>
                <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                <button class="btn btn-danger" data-action="delete">X</button>
            </div>
        </div>
        `;
    }
};