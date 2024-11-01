const starterModalElement = document.getElementById("starterModal")
const starterModal = new bootstrap.Modal(starterModalElement);
starterModal.show();

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// Data reset button
document.getElementById("data-reset").addEventListener("click", () => {
    localStorage.removeItem("mindbank");
    window.location.reload();
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
    mindBankItems.forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("border");
        element.classList.add("rounded");
        element.classList.add("p-1")
        element.classList.add("mindbank-item")
        element.innerText = item;
        mindBankItemContainer.appendChild(element);
    });
}

const mindBankModalElement = document.getElementById("mindBankModal")
const mindBankModal = new bootstrap.Modal(mindBankModalElement);

const mindBankModalForm = document.getElementById("mindBankModalForm")

mindBankModalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(mindBankModalForm);
    const text = formData.get("text")
    addMindBankItem(text);
    mindBankModal.hide();
});

mindBankModalElement.addEventListener("hidden.bs.modal", () => {
    mindBankModalForm.reset();
});

// Event listener for the yes button to show the input section//
yesBtn.addEventListener("click", () => {
    document.getElementById("taskInput").style.display = "block";
});

// Event listener for the no button to hide the modal when clicked//
noBtn.addEventListener("click", () => {
    starterModal.hide();
});

// Task input field/save button by ID//
const taskInputField = document.getElementById("taskInputField");
const saveTaskBtn = document.getElementById("saveTaskBtn");

//Save MindBank Tasks Button
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData (taskForm);
    const list = data.get("task-list");
    addMindBankItem(list);
});


//Show the input section when "Yes" button is clicked//
yesBtn.addEventListener("click", () => {
    document.getElementById("taskInput").style.display = "block";
    saveTaskBtn.style.display = "inline-block"; //Show the save button
});
