const colorsContainer = document.getElementById("colors");

// Add color picker dynamically
document.getElementById("addColor").addEventListener("click", () => {
  const colorPickerContainer = document.createElement("div");
  colorPickerContainer.className = "color-picker-container";

  const newColorInput = document.createElement("input");
  newColorInput.type = "color";
  newColorInput.className = "color-picker";
  newColorInput.value = "#ffffff";

  const removeButton = document.createElement("button");
  removeButton.className = "remove-color";
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    colorsContainer.removeChild(colorPickerContainer);
  });

  colorPickerContainer.appendChild(newColorInput);
  colorPickerContainer.appendChild(removeButton);

  colorsContainer.appendChild(colorPickerContainer);
});

// Generate background with multiple colors
document.getElementById("generate").addEventListener("click", () => {
  const colorPickers = document.querySelectorAll(".color-picker");
  const gradientType = document.getElementById("gradientType").value;
  const preview = document.getElementById("preview");

  const colors = Array.from(colorPickers)
    .map((input) => input.value)
    .join(", ");
  const gradient =
    gradientType === "linear"
      ? `linear-gradient(to right, ${colors})`
      : `radial-gradient(${colors})`;

  preview.style.background = gradient;
});

// Apply preset gradients
document.getElementById("presets").addEventListener("change", (event) => {
  const selectedPreset = event.target.value;
  const preview = document.getElementById("preview");

  if (selectedPreset) {
    preview.style.background = selectedPreset;
  }
});

// Save settings to localStorage
document.getElementById("generate").addEventListener("click", () => {
  const colorPickers = document.querySelectorAll(".color-picker");
  const gradientType = document.getElementById("gradientType").value;
  const preset = document.getElementById("presets").value;

  const colors = Array.from(colorPickers).map((input) => input.value);

  const settings = {
    colors,
    gradientType,
    preset,
  };

  localStorage.setItem("backgroundGeneratorSettings", JSON.stringify(settings));
});

// Load settings from localStorage
window.addEventListener("load", () => {
  const savedSettings = JSON.parse(
    localStorage.getItem("backgroundGeneratorSettings")
  );

  if (savedSettings) {
    const { colors, gradientType, preset } = savedSettings;

    // Apply colors
    colorsContainer.innerHTML = "";
    colors.forEach((color) => {
      const colorPickerContainer = document.createElement("div");
      colorPickerContainer.className = "color-picker-container";

      const colorInput = document.createElement("input");
      colorInput.type = "color";
      colorInput.className = "color-picker";
      colorInput.value = color;

      const removeButton = document.createElement("button");
      removeButton.className = "remove-color";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        colorsContainer.removeChild(colorPickerContainer);
      });

      colorPickerContainer.appendChild(colorInput);
      colorPickerContainer.appendChild(removeButton);

      colorsContainer.appendChild(colorPickerContainer);
    });

    // Apply gradient type
    document.getElementById("gradientType").value = gradientType;

    // Apply preset if any
    if (preset) {
      document.getElementById("presets").value = preset;
      document.getElementById("preview").style.background = preset;
    }
  }
});

// Download background as an image
document.getElementById("download").addEventListener("click", () => {
  const preview = document.getElementById("preview");

  html2canvas(preview).then((canvas) => {
    const link = document.createElement("a");
    link.download = "background.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});
