// Open Modal
document.getElementById("openModalBtn").addEventListener("click", function() {
    document.getElementById("exampleModal").style.display = "block";
});

// Close Modal Function
function closeModal() {
    document.getElementById("exampleModal").style.display = "none";
}

// Yes Button Functionality
document.getElementById("yesBtn").addEventListener("click", function() {
    document.getElementById("taskInput").style.display = "block";
    document.getElementById("saveTaskBtn").style.display = "inline-block";
});

// No Button Functionality
document.getElementById("noBtn").addEventListener("click", function() {
    console.log("No button clicked!"); // For debugging
});