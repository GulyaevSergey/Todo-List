const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");

// Добавление новой задачи - просушка
form.addEventListener("submit", addItem);

// Удаление элемента - прослушка
itemsList.addEventListener("click", removeItem);

// Фильтрация списка дел - прослушка 
filter.addEventListener ("keyup", filterItems);

// Добавление новой задачи - функция
function addItem(e){

    // Отменяем отправку формы
    e.preventDefault();

    // Находим импут с текстом для добавления новой задачи
    const newItemInput = document.getElementById("newItemText");

    // Получаем текст из инпута
    const newItemText = newItemInput.value;

    // Создаем элемент для новой задачи
    const newElement = document.createElement("li");
    newElement.className = "list-group-item";

    // Добавляем текст в новый элемент
    const newElementText = document.createTextNode(newItemText);
    newElement.appendChild(newElementText);
    

    // Создаем кнопку
    const deleteBtn = document.createElement("button");

    // Добавляем текст в кнопку
    deleteBtn.appendChild(document.createTextNode("Удалить"));

    // Добавляем класс для кнопки
    deleteBtn.className = "btn btn-light btn-sm float-right";

    // Добавляем дата атрибут
    deleteBtn.dataset.action = "delete";

    // Помещаем кнопку внутрь тега li
    newElement.appendChild(deleteBtn);
    console.log("newElement", newElement);

    // Добавляем новую задачу в список
    itemsList.prepend(newElement);

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



