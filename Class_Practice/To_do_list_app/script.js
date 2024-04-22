// Immediately invoked function
(() => {
    let toDolistArray = [];

    const form = document.querySelector(" .form");
    const input = form.querySelector(".form_input");
    const ul = document.querySelector(".toDoList")

    // event listener for the submit event
    form.addEventListener("submit", (e) => {
        e.preventDefault();  // prevent default behaviour on the form. 
        let itemId = String(Date.now()); // give an item a unique ID which is date
        let toDOItem = input.value;  // asign input value to the to do item variable
        addItemToDOM(itemId, toDOItem);
        addItemToArray(itemId, toDOItem);
        input.value = "";
    });

    ul.addEventListener('Click', (e) =>{
        let id = e.target.getAttribute("data-id");
        if(!id) return;

        removeItemFromDOM();
        removeItemFromArray();
    });

    function addItemToDOM(itemId, todoItem){
        const li = document.createElement("li");
        li.setAttribute("data-id", itemId);
        li.innerText = todoItem
        ul.appendChild(li);
    }

    function addItemToArray(itemId, toDoItem){
        toDolistArray.push(itemId, toDoItem);
        console.log(toDolistArray);
    }

    function removeItemFromDOM(id){
        var li = document.querySelector('[data-id="'+ id +'"]');
        ul.removeChild(li);
    }

    function removeItemFromArray(id){
        toDolistArray = toDolistArray.filter((item) => item.itemId !== id);
        console.log(toDolistArray);
    }
})();
