// we copied the parameters from the firebase app
firebase.initializeApp({
  apiKey: "AIzaSyDnK1ZqvOcYyZRASxbKlA7vrbELMi4UQnE",
  authDomain: "plp-apps-2cdbd.firebaseapp.com",
  projectId: "plp-apps-2cdbd",
  storageBucket: "plp-apps-2cdbd.appspot.com",
  messagingSenderId: "1095423367183",
  appId: "1:1095423367183:web:a02794a63e3df8e761ab7a",
});
// database in firebase is called firestore
const db = firebase.firestore();

function Addtask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    // avoid storage of empty values
    if (task !== "") {
        // adds to our database in firebase
        db.collection("tasks").add({
            // columns in database eg NAME
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        // resets input element
        taskInput.value = "";
        console.log("Task added.");
    }
}
// fetch them from database and display them
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    // creation of a button for deleting
    // $ used for refrencing
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}
// listener for the above function to work
db.collection("tasks")
.orderBy("timestamp", "desc")
// listens for events on the firebase database
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    // looks through on the changes made
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});
// to activate delete button
function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}
