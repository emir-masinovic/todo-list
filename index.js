let tasks = JSON.parse(localStorage.getItem("TODO_LIST")) || [];
let userInputHTML = document.getElementById("form-text-input");
let addButtonHTML = document.getElementsByClassName("button")[0];
let tasksLeftHTML = document.querySelector(".todo-body div");
let taskAdded = false;

addButtonHTML.addEventListener("click", handleAddButtonClick);
tasksLeftHTML.innerText = "Tasks left: " + tasks.length;

updateFooterTasks();

function handleAddButtonClick(event) {
  event.preventDefault();
  if (event.target.innerText === "+" && userInputHTML.value !== "") {
    const maxId = Math.max(...tasks.map((task) => task.id));

    taskAdded = !taskAdded;
    tasks.unshift({ text: userInputHTML.value, id: maxId + 1 });
    userInputHTML.value = "";
    updateFooterTasks();
    updateTasksLeft();
    saveTasksToLocalStorage();
  }
}

function updateTasksLeft() {
  tasksLeftHTML.innerText = "Tasks left: " + tasks.length;
}

function updateFooterTasks() {
  let todoFooterHTML = document.querySelector(".todo-footer");
  todoFooterHTML.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskRow = document.createElement("div");
    taskRow.className = "todo-footer-task";

    if (index === 0 && taskAdded) {
      taskRow.classList.add("fade-in");
      // taskAdded = !taskAdded;
      setTimeout(() => {
        taskRow.classList.remove("fade-in");
      }, 1500);
    }

    if (index > 0 && taskAdded) {
      taskRow.classList.add("push-down");
      setTimeout(() => {
        taskRow.classList.remove("push-down");
      }, 1500);
      if (index === tasks.length - 1) {
        taskAdded = !taskAdded;
      }
    }

    const taskText = document.createElement("div");
    taskText.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "button bi bi-trash";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      taskRow.className = "todo-footer-task fade-out";
      setTimeout(() => {
        removeTaskById(task.id);
        updateFooterTasks();
        updateTasksLeft();
        saveTasksToLocalStorage();
      }, 1000);
    });

    taskRow.appendChild(taskText);
    taskRow.appendChild(deleteButton);

    todoFooterHTML.appendChild(taskRow);
  });
}

function removeTaskById(taskId) {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    console.error("Task not found");
    return;
  }
  tasks.splice(taskIndex, 1);
}

function saveTasksToLocalStorage() {
  localStorage.setItem("TODO_LIST", JSON.stringify(tasks));
}
