( () => {
    // declare empty toDoList Array
    let toDoListArray = [];

    // variables refrenced from the html DOC
    const form = document.querySelector(".form");
    const input = form.querySelector(".form_input");
    const ul= document.querySelector(".toDoList")
    

    // event Listener for submit / enter

    form.addEventListener('submit', (e) => {
        // prevent default behaviour -- Page Reload 
        e.preventDefault();
        // give the added item an UniqueID

        let itemId = String(Date.now());

        // get / assign input Value
        let toDoItem = input.value;

        // pass the ID and item into two function

        addItemToDOM(itemId, toDoItem);
        addItemToArray(itemId, toDoItem );

        // clear the input box ( default behaviour gotten rid in line 15)
        input.value = '';
    });

    ul.addEventListener('click', (e) => {
        let id = e.target.getAttribute('data-id');

        if(!id) return; // user clicked in something else

        // pass the id through to function
        removeItemFromDOM(id);
        removeItemFromArray(id);
    });

    function addItemToDOM(itemId, toDoItem){
        // create a li 
        const li = document.createElement('li');
        li.setAttribute('data-id', itemId);

        // add toDoItem text to li
        li.innerText = toDoItem
        // add li to the DOM
        ul.appendChild(li);
    }

    function addItemToArray(itemId, toDoItem){
        // adds item to array as an object with an ID so we can find and delete it later
        toDoListArray.push({itemId, toDoItem});
        // output the array to the console
        console.log(toDoListArray);
    }

    function removeItemFromDOM(id) {
        // get the list item by data ID
        var li = document.querySelector('[data-id="' + id + '"]');
        // remove list item
        ul.removeChild(li);
    }

    function removeItemFromArray(id) {
        // create a new toDoListArray with all li's that don't match the ID
        toDoListArray = toDoListArray.filter((item) => item.itemId !== id);
        console.log(toDoListArray);
    }
}) ();