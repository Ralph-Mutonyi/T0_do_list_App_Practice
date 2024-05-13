// initialize Firebase with your config

firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
});

const db = firebase.firestore();

// Function to add a task
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = task.Input.value.trim();

    if (task !== ""){
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = ""
    }
}

// function to render tasks
function rendertasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick = "deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

// Real-time listener for tasks

db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === "added"){
                rendertasks(change.doc);
            }
        });
    });

// function to delete task
function deleteTask (id) {
    db.collection("tasks").doc(id).delete();
}

