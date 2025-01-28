// Function to view Python code in a modal
function viewPython(fileUrl) {
  const modal = document.getElementById("pythonModal"); // Get the modal
  const codeViewer = document.getElementById("codeViewer"); // Get the code viewer element

  // Clear any existing content
  codeViewer.textContent = "Loading...";

  // Fetch the Python file
  fetch(fileUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load the file.");
      }
      return response.text(); // Parse the response as text
    })
    .then((code) => {
      codeViewer.textContent = code; // Display the fetched code in the modal
    })
    .catch((error) => {
      codeViewer.textContent = "Error: Unable to load file."; // Display an error message if the fetch fails
      console.error(error); // Log the error for debugging
    });

  // Display the modal
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("pythonModal");
  modal.style.display = "none"; // Hide the modal
}

// Close modal when clicking outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById("pythonModal");
  if (event.target === modal) {
    closeModal();
  }
};
