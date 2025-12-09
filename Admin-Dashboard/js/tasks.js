let taskInput = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");

let tasks = []; // Task store (temporary memory)

// ADD TASK
addBtn.addEventListener("click", function () {
    let value = taskInput.value.trim();

    if (value === "") {
        alert("Task cannot be empty!");
        return;
    }

    let task = {
        id: Date.now(),
        text: value,
        completed: false
    };

    tasks.push(task);
    displayTasks();

    taskInput.value = "";
});

// DISPLAY TASKS
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        let card = document.createElement("div");
        card.className = "task-card";
        if (task.completed) card.classList.add("completed");

        card.innerHTML = `
            <span>${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn">✔</button>
                <button class="edit-btn">✏</button>
                <button class="delete-btn">🗑</button>
            </div>
        `;

        // COMPLETE TASK
        card.querySelector(".complete-btn").addEventListener("click", () => {
            task.completed = !task.completed;
            displayTasks();
        });

        // EDIT TASK
        card.querySelector(".edit-btn").addEventListener("click", () => {
            let newText = prompt("Edit task:", task.text);
            if (newText !== null && newText.trim() !== "") {
                task.text = newText;
                displayTasks();
            }
        });

        // DELETE TASK
        card.querySelector(".delete-btn").addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            displayTasks();
        });

        taskList.appendChild(card);
    });
}
