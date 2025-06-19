const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const taskItem = createTaskItem(task, task.completed);
    (task.completed ? completedList : pendingList).appendChild(taskItem);
  });
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  if (!title || !date || !time) {
    alert("Please fill in the title, date, and time.");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    date,
    time,
    createdAt: new Date().toLocaleString(),
    completed: false
  };

  tasks.push(task);
  saveTasks();
  loadTasks();
  clearForm();
}

function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDescription").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";
}

function createTaskItem(task, isCompleted) {
  const li = document.createElement("li");

  li.innerHTML = `
    <div>
      <strong>${task.title}</strong><br>
      <small>📝 ${task.description || "No description"}</small><br>
      <small>📅 ${task.date} ⏰ ${task.time}</small><br>
      <small>🕒 Created: ${task.createdAt}</small>
    </div>
    <div class="task-buttons">
      ${!isCompleted ? `<button onclick="markComplete(${task.id})">✔</button>` : ""}
      <button onclick="editTask(${task.id})">✏️</button>
      <button onclick="deleteTask(${task.id})">🗑️</button>
    </div>
  `;

  return li;
}

function markComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    saveTasks();
    loadTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  loadTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const newTitle = prompt("Edit Title", task.title);
  const newDesc = prompt("Edit Description", task.description);
  const newDate = prompt("Edit Date (yyyy-mm-dd)", task.date);
  const newTime = prompt("Edit Time (hh:mm)", task.time);

  if (newTitle && newDate && newTime) {
    task.title = newTitle;
    task.description = newDesc;
    task.date = newDate;
    task.time = newTime;
    task.createdAt = new Date().toLocaleString();
    saveTasks();
    loadTasks();
  }
}

function checkNotifications() {
  const now = new Date();

  tasks.forEach(task => {
    if (!task.completed) {
      const taskTime = new Date(`${task.date}T${task.time}`);
      const timeDiff = (taskTime - now) / (1000 * 60); // in minutes

      if (timeDiff > 0 && timeDiff < 60) {
        notify(`Reminder: "${task.title}" is due at ${task.time} today!`);
      }
    }
  });
}

function notify(message) {
  if (Notification.permission === "granted") {
    new Notification("⏰ To-Do Alert", { body: message });
  }
}

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

// Ask permission for notifications on load
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

loadTasks();
setInterval(checkNotifications, 60000); // Check every minute
