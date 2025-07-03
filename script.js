const summaryBody = document.getElementById("summary-body");

function toggleIMEI(select) {
  const row = select.closest(".product-row");
  const imeiContainer = row.querySelector(".imei-scan");

  if (select.value === "Mobile") {
    imeiContainer.style.display = "flex";
  } else {
    imeiContainer.style.display = "none";
    imeiContainer.querySelector(".imei").value = "";
  }

  updateSummary();
}

function updateSummary() {
  summaryBody.innerHTML = "";
  const row = document.querySelector(".product-row");

  const type = row.querySelector(".type").value;
  const name = row.querySelector(".product-name").value;
  const imei = row.querySelector(".imei").value;
  const qty = parseInt(row.querySelector(".qty").value) || 0;
  const price = parseFloat(row.querySelector(".price").value) || 0;
  const total = qty * price;

  if (name && qty && price) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${name}</td>
      <td>${type === "Mobile" ? imei : "-"}</td>
      <td>${qty}</td>
      <td>₹${price.toFixed(2)}</td>
      <td>₹${total.toFixed(2)}</td>
    `;
    summaryBody.appendChild(tr);
  }
}

function scanIMEI(button) {
  const input = button.previousElementSibling;
  const codeReader = new ZXing.BrowserBarcodeReader();

  const video = document.createElement('video');
  video.style.position = 'fixed';
  video.style.top = '50%';
  video.style.left = '50%';
  video.style.transform = 'translate(-50%, -50%)';
  video.style.zIndex = '1000';
  video.style.width = '80%';
  video.style.border = '2px solid #007bff';
  document.body.appendChild(video);

  codeReader.decodeOnceFromVideoDevice(undefined, video)
    .then(result => {
      input.value = result.text;
      codeReader.reset();
      document.body.removeChild(video);
      updateSummary();
    })
    .catch(err => {
      alert("Scan failed: " + err);
      document.body.removeChild(video);
    });
}

document.addEventListener("input", updateSummary);

document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".type");
  toggleIMEI(select);
  updateSummary();
});
