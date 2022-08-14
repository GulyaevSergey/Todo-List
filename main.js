const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");

// Добавление новой задачи - просушка
form.addEventListener("submit", addItem);

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

// Удаление элемента - прослушка
itemsList.addEventListener("click", removeItem);

// Удаление элемента - функция
function removeItem (e) {
    if (
        e.target.hasAttribute("data-action") &&
        e.target.getAttribute("data-action") == "delete"
    ) {
        if (confirm("Действительно удалить эту задачу?")) {
            e.target.parentNode.remove();
        }
    }
}



