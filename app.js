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