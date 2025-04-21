let model, labelContainer, maxPredictions;

// Load the model
async function init() {
    const modelURL = "model/model.json";
    const metadataURL = "model/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

// Run the image through the model
async function predict() {
    const image = document.getElementById("uploaded-image");
    const prediction = await model.predict(image, false);

    prediction.sort((a, b) => b.probability - a.probability);
    const topPrediction = prediction[0];

    labelContainer.innerHTML = `<h2>${topPrediction.className}</h2><p>Confidence: ${(topPrediction.probability * 100).toFixed(2)}%</p>`;

    showDisposalTips(topPrediction.className);
}

// Show disposal tips based on result
function showDisposalTips(className) {
    const tipsContainer = document.getElementById("tips-container");
    let tips = "";

    switch (className) {
        case "Recyclable":
            tips = "♻️ Put in Dry Waste bin. Wash before recycling.";
            break;
        case "Organic":
            tips = "🌱 Compost it or put in Wet Waste bin.";
            break;
        case "E-waste":
            tips = "🖥️ Take it to an authorized E-waste center.";
            break;
        case "Non-recyclable":
            tips = "🚯 Put in General Trash. Avoid littering.";
            break;
        default:
            tips = "Unknown waste type.";
    }

    tipsContainer.innerHTML = `<p>${tips}</p>`;
}

// Preview uploaded image
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('uploaded-image');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
