// Intro modal code
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Event listener for the yes button to show the input section
yesBtn.addEventListener("click", () => {
    document.getElementById("taskInput").style.display = "block";
});

// Event listener for the no button to hide the modal when clicked//
noBtn.addEventListener("click", () => {
    introModal.hide();
});

// Task input field/save button by ID//
const taskInputField = document.getElementById("taskInputField");
const saveTaskBtn = document.getElementById("saveTaskBtn");

// Save MindBank Tasks Button
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData (taskForm);
    const list = data.get("task-list");
    addMindBankItem(list);
});

// Show the input section when "Yes" button is clicked
yesBtn.addEventListener("click", () => {
    document.getElementById("taskInput").style.display = "block";
    saveTaskBtn.style.display = "inline-block"; //Show the save button
});
const introModalElement = document.getElementById("introModal")
const introModal = new bootstrap.Modal(introModalElement);

const introCompleted = localStorage.getItem("introCompleted");
if (introCompleted === null) introModal.show();

introModalElement.addEventListener("hide.bs.modal", () => {
    localStorage.setItem("introCompleted", "true");
});

// Data reset button
document.getElementById("data-reset").addEventListener("click", () => {
    localStorage.removeItem("mindbank");
    localStorage.removeItem("log");
    localStorage.removeItem("reminder");
    localStorage.removeItem("introCompleted");
    window.location.reload();
});

// Reminder code
let reminderTimeout = null;

function startReminderTimeout(reminderDate) {
    const time = new Date(reminderDate).getTime();
    if (time < Date.now()) return console.log("too late...");
    console.log("setting...", time - Date.now());
    reminderTimeout = setTimeout(showReminder, time - Date.now());
}

const storedReminder = localStorage.getItem("reminder");
if (storedReminder !== null) startReminderTimeout(storedReminder);

function showReminder() {
    reminderModal.show();
    console.log("Reminder!");
    reminderTimeout = null;
}

const reminderSetModalElement = document.getElementById("reminderSetModal");
const reminderSetModal = new bootstrap.Modal(reminderSetModalElement);

const reminderModalElement = document.getElementById("reminderModal");
const reminderModal = new bootstrap.Modal(reminderModalElement);

const reminderSetForm = document.getElementById("reminderSetModalForm");
reminderSetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(reminderSetForm);
    const reminder = formData.get("reminder");
    localStorage.setItem("reminder", reminder);
    if (reminderTimeout !== null) clearTimeout(reminderTimeout);
    startReminderTimeout(reminder);
    reminderSetModal.hide();
});

reminderSetModalElement.addEventListener("show.bs.modal", (e) => {
    const datetime = e.target.querySelector("#reminder");
    const reminder = localStorage.getItem("reminder");
    if (reminder !== null) return datetime.value = reminder;

    const date = new Date();
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    datetime.value = date.toISOString().slice(0,16);
});


// MindBank code
const mindBankItems = getMindBankItems();
const mindBankItemContainer = document.getElementById("mindBankItems");
renderMindBankItems();

function getMindBankItems() {
    const result = localStorage.getItem("mindbank");
    if (result === null) return [];
    return JSON.parse(result);
}

function addMindBankItem(item) {
    mindBankItems.push(item);
    localStorage.setItem("mindbank", JSON.stringify(mindBankItems));
    renderMindBankItems();
}

function renderMindBankItems() {
    mindBankItemContainer.innerHTML = "";
    mindBankItems.forEach((item, index) => {
        const container = document.createElement("div");
        container.classList.add("d-flex");
        container.classList.add("border");
        container.classList.add("rounded");
        container.classList.add("p-1")
        container.classList.add("list-item")

        const text = document.createElement("span")
        text.style.flexGrow = "1";
        text.innerText = item;
        container.appendChild(text);

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "🗑️";
        deleteButton.addEventListener("click", () => {
            deleteMindBankItem(index);
        });
        container.appendChild(deleteButton);

        const completeButton = document.createElement("button");
        completeButton.innerText = "✅";
        completeButton.addEventListener("click", () => {
            completeMindbankItem(index);
        });
        container.appendChild(completeButton);

        mindBankItemContainer.appendChild(container);
    });
}

function deleteMindBankItem(index) {
    if (!confirm("Are you sure you want to remove this item?")) return;
    mindBankItems.splice(index, 1);
    localStorage.setItem("mindbank", JSON.stringify(mindBankItems));
    renderMindBankItems();
}

function completeMindbankItem(index) {
    addLogEntry({
        type: "mindBankItem",
        name: mindBankItems[index],
        date: Date.now()
    });
    mindBankItems.splice(index, 1);
    localStorage.setItem("mindbank", JSON.stringify(mindBankItems));
    renderMindBankItems();
}

const mindBankModalElement = document.getElementById("mindBankModal")
const mindBankModal = new bootstrap.Modal(mindBankModalElement);

const mindBankModalForm = document.getElementById("mindBankModalForm")

mindBankModalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(mindBankModalForm);
    const text = formData.get("text").trim();
    if (text !== "") addMindBankItem(text);
    mindBankModal.hide();
});

mindBankModalElement.addEventListener("hidden.bs.modal", () => {
    mindBankModalForm.reset();
});

// Log code
const logEntries = getLogEntries();
const logEntryContainer = document.getElementById("logEntries");
renderLog();

function getLogEntries() {
    const result = localStorage.getItem("log");
    if (result === null) return [];
    return JSON.parse(result);
}

function addLogEntry(entry) {
    logEntries.unshift(entry);
    localStorage.setItem("log", JSON.stringify(logEntries));
    renderLog();
}

function renderLog() {
    logEntryContainer.innerHTML = "";
    logEntries.forEach((logEntry) => {
        if (logEntry.type === "logEntry") {
            const { title, content, date } = logEntry;
            const container = document.createElement("div");
            container.classList.add("border");
            container.classList.add("rounded");
            container.classList.add("p-1")
            container.classList.add("list-item")

            const titleElement = document.createElement("h2");
            titleElement.innerText = title;
            container.appendChild(titleElement);

            const contentElement = document.createElement("p");
            contentElement.innerText = content;
            container.appendChild(contentElement);

            const dateElement = document.createElement("time");
            const dateObj = new Date(date);
            dateElement.value = dateObj.toISOString();
            dateElement.innerText = dateObj.toLocaleString();
            container.appendChild(dateElement);

            logEntryContainer.appendChild(container);
        } else if (logEntry.type === "mindBankItem") {
            const { name, date } = logEntry;
            const container = document.createElement("div");
            container.classList.add("border");
            container.classList.add("rounded");
            container.classList.add("p-1")
            container.classList.add("list-item")

            const contentElement = document.createElement("h5");
            contentElement.innerText = "MindBank item compelted: ";
            const nameElement = document.createElement("b");
            nameElement.innerText = name;
            contentElement.appendChild(nameElement);
            container.appendChild(contentElement);

            const dateElement = document.createElement("time");
            const dateObj = new Date(date);
            dateElement.value = dateObj.toISOString();
            dateElement.innerText = dateObj.toLocaleString();
            container.appendChild(dateElement);

            logEntryContainer.appendChild(container);
        }
    });
}

const logModalElement = document.getElementById("logModal");
const logModal = new bootstrap.Modal(logModalElement);

const logModalForm = document.getElementById("logModalForm");

logModalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(logModalForm);
    const title = formData.get("title");
    const content = formData.get("content");
    const date = formData.get("date")
    addLogEntry({ type: "logEntry", title, content, date });
    logModal.hide();
});

logModalElement.addEventListener("show.bs.modal", (e) => {
    const date = e.target.querySelector('[name="date"]');
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    date.value = now.toISOString().slice(0,16);
});

logModalElement.addEventListener("hidden.bs.modal", () => {
    logModalForm.reset();
});
