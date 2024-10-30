const starterModalElement = document.getElementById("starterModal")
const starterModal = new bootstrap.Modal(starterModalElement);
starterModal.show();

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");


// MindBank code
const mindBankItems = [];
const mindBankItemContainer = document.getElementById("mindBankItems");

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
    mindBankItems.push(text);
    renderMindBankItems();
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

// An array to store the mindbank tasks//
let mindBank = [];

// Task input field/save button by ID//
const taskInputField = document.getElementById("taskInputField");
const saveTaskBtn = document.getElementById("saveTaskBtn");

//Save MindBank Tasks Button
const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data= new FormData (taskForm);
    const list= data.get("task-list");
mindBankItems.push(list);
renderMindBankItems();
});


//Show the input section when "Yes" button is clicked//
yesBtn.addEventListener("click", () => {
    document.getElementById("taskInput").style.display ="block";
    saveTaskBtn.style.display = "inline-block"; //Show the save button
});

//Event listener for the "Save Task" button
saveTaskBtn.addEventListener("click", () => {
    // Get the value entered by the user
    const task = taskInputField.ariaValueMax.trim();

    //Check if the input is not empty
    if (task) {
        //Add task to MindBank array
        mindBank.push(task);

        //Log the MindBank to the console (for testing purposes)
        console.log("Current MindBank:", mindBank);

        // Clear the input field for the next entry
        taskInputField.value ="";
    } else {
        alert("Please enter a task before saving.");
    }
});


