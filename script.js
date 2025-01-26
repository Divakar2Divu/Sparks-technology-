function viewPDF(pdfUrl) {
  const modal = document.getElementById("pdfModal");
  const pdfViewer = document.getElementById("pdfViewer");

  // Clear previous content
  pdfViewer.innerHTML = "";

  // Load PDF using PDF.js
  pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
    let pageCount = pdf.numPages;

    // Create a div for copyable text
    const textContainer = document.createElement("div");
    textContainer.setAttribute("id", "textContent");
    textContainer.style.padding = "10px";
    textContainer.style.fontFamily = "Arial, sans-serif";

    for (let i = 1; i <= pageCount; i++) {
      pdf.getPage(i).then((page) => {
        // Extract text content
        page.getTextContent().then((textContent) => {
          const pageDiv = document.createElement("div");
          pageDiv.style.marginBottom = "20px";

          textContent.items.forEach((item) => {
            const span = document.createElement("span");
            span.textContent = item.str + " ";
            pageDiv.appendChild(span);
          });

          textContainer.appendChild(pageDiv);
        });
      });
    }

    pdfViewer.appendChild(textContainer);
  });

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
