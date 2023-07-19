const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

const fontSize = 12; 
const fontColor = "#FF0000"; 
const font = `${fontSize}px Arial`;

// Function to draw the character in the center of the canvas
function drawCharacter() {
  const char = "F"; 
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = fontColor;
  ctx.fillText(char, centerX, centerY);
}

// Function to get pixel data and create the download link
function createDownloadLink() {
  const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  let hexData = "";

  // Convert RGBA pixel data to hex format
  for (let i = 0; i < pixelData.length; i += 4) {
    const hex = rgbToHex(pixelData[i], pixelData[i + 1], pixelData[i + 2]);
    hexData += hex + "\n";
  }

  // Create a Blob containing the pixel data and generate the download link
  const blob = new Blob([hexData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.href = url;
}

// Helper function to convert RGB to hex
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Draw the character on the canvas
drawCharacter();

// Createe the download link when the page loads
createDownloadLink();
