var form = document.getElementById("addForm");


form.addEventListener("submit", addItem);

function addItem(e){
    e.preventDefault();

    var newItemInput = document.getElementById("newItemText");
    
    var newItemText = newItemInput.value;
    console.log("newItemText", newItemText);
    
    
}

