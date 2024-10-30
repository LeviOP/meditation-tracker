const starterModalElement = document.getElementById("starterModal")
const starterModal = new bootstrap.Modal(starterModalElement);
starterModal.show();

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
