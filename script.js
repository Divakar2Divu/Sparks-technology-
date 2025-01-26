// Function to load and display PDF in modal
function viewPDF(pdfUrl) {
  const modal = document.getElementById("pdfModal");
  const pdfViewer = document.getElementById("pdfViewer");

  // Clear previous content
  pdfViewer.innerHTML = "";

  // Load PDF using PDF.js
  pdfjsLib.getDocument(pdfUrl).promise.then((pdf) => {
    let pageCount = pdf.numPages;

    for (let i = 1; i <= pageCount; i++) {
      pdf.getPage(i).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        const renderContext = { canvasContext: context, viewport: viewport };

        page.render(renderContext).promise.then(() => {
          pdfViewer.appendChild(canvas);
        });
      });
    }
  });

  modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("pdfModal");
  modal.style.display = "none";
}
