firebase.initializeApp({
    // configuration from firebase .. enables initialization of firebase app
});

// variable to map to database

const db = firebase.firestore();

// function to add Task
function addTask(){
    // declare variable and map to task input
    const taskInput = document.getElementById("task-input");
    // trim any space 
    const task = taskInput.value.trim();

    // store value in db

    // use if conditional
    // if task isnt empty add task to db
    if (task !== ""){
        db.collection("tasks").add({
            task: task,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value ="";
        // print out task has been added to console
        console.log("Task Added.");
    }
}

// Function to render tasks
// fetch the task from database and display them on html file

function renderTask(){
    const taskList = document.getElementById("task-list");
    // list doesnt have a li element so we create it
    const taskItem = document.createElement("li");
    // assign the class to our task item

    taskItem.className = "task-item";
    // firebase stores records as documents
    // gets the task from db and provides a button to delete
    taskItem.innerHTML = `
    <span>${doc.data().task}</span> 
    <button onclick = "deleteTask('${doc.id}')">Delete</button>
    `;
    // add the task to the ul 
    taskList.appendChild(taskItem);
}

// Realtime Listener for tasks

db.collection("tasks")
    .orderBy("timestamp","desc")
    .onSnapshot(onSnapshot => {
        const changes = snapshot.docChanges();  // listening out for changes in the record stored as documents
        changes.forEach(change => {
            if(change.type === "added"){
                rendesrTasks(change.doc);
            }
        });
    });

// function to delete tasks

function deleteTask(id){
    db.collection("tasks").doc(id).delete();
    location.reload();
}