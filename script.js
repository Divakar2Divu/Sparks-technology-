// Function to load and display PDF in modal with copyable text
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
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        const renderContext = { canvasContext: context, viewport: viewport };

        page.render(renderContext).promise.then(() => {
          pdfViewer.appendChild(canvas);
        });

        // Extract text content
        page.getTextContent().then((textContent) => {
          textContent.items.forEach((item) => {
            const span = document.createElement("span");
            span.textContent = item.str + " ";
            textContainer.appendChild(span);
          });
        });
      });
    }

    // Add a copy button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy Text";
    copyButton.style.marginTop = "20px";
    copyButton.style.padding = "10px 15px";
    copyButton.style.backgroundColor = "#6c63ff";
    copyButton.style.color = "white";
    copyButton.style.border = "none";
    copyButton.style.borderRadius = "5px";
    copyButton.style.cursor = "pointer";

    copyButton.addEventListener("click", () => {
      const textToCopy = textContainer.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Text copied to clipboard!");
      });
    });

    pdfViewer.appendChild(textContainer);
    pdfViewer.appendChild(copyButton);
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
