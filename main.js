const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");

// Создаем пустой массив tasks
let tasks = [];

/*
Проверяем есть ли в нем данные по ключу tasks,
Если данные есть, тогда забираем их, парсим из JSON в маассив и записываем в массив tasks
Если данных нет, тогда оставляем переменную tasks пустым массивом
*/
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

// Рендерим задачи на странице из массива
tasks.forEach(function (item) {
    renderTask(item);
});

// Добавление новой задачи - просушка
form.addEventListener("submit", addItem);

// Удаление элемента - прослушка
itemsList.addEventListener("click", removeItem);

// Фильтрация списка дел - прослушка 
filter.addEventListener ("keyup", filterItems);

function renderTask(taskText){

    // Создаем элемент для новой задачи
    const newElement = document.createElement('li');
    newElement.className = 'list-group-item';
    // Добавим текст в новый элемент
    const newTextNode = document.createTextNode(taskText);
    newElement.appendChild(newTextNode);
    // Создаем кнопку
    const deleteBtn = document.createElement('button');
    // Добавляем текст
    deleteBtn.appendChild(document.createTextNode('Удалить'));
    // Добавляем CSS class
    deleteBtn.className = 'btn btn-light btn-sm float-right';
    // Добавляем data атрибут
    deleteBtn.dataset.action = 'delete';
    // Помещаем кнопку внутрь тега li
    newElement.appendChild(deleteBtn);
    // Добавляем новую задачу в список со всеми задачами
    itemsList.prepend(newElement);
}

// Добавление новой задачи - функция
function addItem(e){

    // Отменяем отправку формы
    e.preventDefault();

    // Находим импут с текстом для добавления новой задачи
    const newItemInput = document.getElementById("newItemText");

    // Получаем текст из инпута
    const newItemText = newItemInput.value;    

    renderTask(newItemText);

    // Добавляем задачу в массив
	tasks.push(newItemText);

    // Обновляем список задач в lokalStorage
	localStorage.setItem('tasks', JSON.stringify(tasks));

    // Очищаем импут после добавления новой задачи
    newItemInput.value = "";
}

// Удаление элемента - функция
function removeItem(e){
    if (
        e.target.hasAttribute("data-action") &&
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Действительно удалить эту задачу?")) {
            e.target.parentNode.remove();
        }

        // Получаем текст задачи которую надо удалить
        const taskText = e.target.closest('.list-group-item').firstChild.textContent;

        // Находим индекс задачи в массиве tasks
        const index = tasks.findIndex(function (item) {
            if (taskText === item) {
                return true
            }
        })

        // Удаляем задачу из массива tasks
        if (index !== -1) {
            tasks.splice(index, 1);
        }

        // Обновляем localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Фильтрация списка дел - функция
function filterItems(e){

    // Поулчаем фразу для поиска и переводим в нижний регистр
    const searchedText = e.target.value.toLowerCase();

    // 1. Получаем список всех задач
    const items = itemsList.querySelectorAll("li");

    // Перебираем циклом все найденные теги li с задачей
    items.forEach (function(item){

        // Получаем текст задачи из списка и переводим его в нижний регистр
        const itemText = item.firstChild.textContent.toLowerCase();

        // Проверяем вхождение искомой подстроки в текст задачи
        if(itemText.indexOf(searchedText) != -1){
            item.style.display = "block";
        } else{
            item.style.display = "none";
        }
    })

}



