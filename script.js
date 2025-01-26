function viewPDF(pdfUrl) {
  const modal = document.getElementById("pdfModal");
  const pdfViewer = document.getElementById("pdfViewer");

  // Clear any existing content
  pdfViewer.innerHTML = "";

  // Load the PDF document using PDF.js
  pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
    const pageCount = pdf.numPages;

    // Loop through each page and render it
    for (let i = 1; i <= pageCount; i++) {
      pdf.getPage(i).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });

        // Create a canvas element for rendering
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        // Render the page onto the canvas
        page.render(renderContext).promise.then(() => {
          pdfViewer.appendChild(canvas);
        });
      });
    }
  });

  // Display the modal
  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("pdfModal");
  modal.style.display = "none";
  const pdfViewer = document.getElementById("pdfViewer");
  pdfViewer.innerHTML = ""; // Clear content on close
}

// Close modal when clicking outside the modal content
window.onclick = function (event) {
  const modal = document.getElementById("pdfModal");
  if (event.target == modal) {
    closeModal();
  }
};
