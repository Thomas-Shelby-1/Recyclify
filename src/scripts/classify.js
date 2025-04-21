// Define model URL (inside public/model/)
const URL = "public/model/";

// Variables to store model and uploaded image
let model;

// Load the model when page loads
async function loadModel() {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("✅ Model loaded");
}

// Handle prediction when button is clicked
async function predictWaste() {
    const fileInput = document.getElementById("imageUpload");

    if (!fileInput.files.length) {
        alert("Please upload an image first!");
        return;
    }

    // Create an image element to use for prediction
    const uploadedImage = document.createElement("img");
    const file = fileInput.files[0];
    const imageURL = URL.createObjectURL(file);
    uploadedImage.src = imageURL;
    await uploadedImage.decode();

    // Predict using the model
    const predictions = await model.predict(uploadedImage);
    const sorted = predictions.sort((a, b) => b.probability - a.probability);
    const bestPrediction = sorted[0];

    console.log("Prediction:", bestPrediction.className, bestPrediction.probability);

    // Save necessary details to localStorage for result.html
    localStorage.setItem("wasteType", bestPrediction.className);
    localStorage.setItem("confidence", (bestPrediction.probability * 100).toFixed(2));
    localStorage.setItem("imagePreview", imageURL);

    // Redirect to result page
    window.location.href = "result.html";
}

// Attach event listener
document.getElementById("predictButton").addEventListener("click", predictWaste);

// Load model on page load
loadModel();
