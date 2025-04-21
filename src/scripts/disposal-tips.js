// Waste disposal tips based on type
const disposalInstructions = {
    "Recyclable": "Place it in the recycling bin (blue bin). Make sure it's clean and dry!",
    "Organic": "Compost it if possible. Otherwise, place it in the green waste bin.",
    "E-waste": "Do NOT throw in trash. Drop it off at your nearest e-waste center.",
    "Non-recyclable": "Dispose of it in the regular garbage bin (black bin). Try to reduce such waste!"
};

// Fetch the prediction from localStorage
const wasteType = localStorage.getItem("wasteType");

// Display prediction
document.getElementById("wasteType").innerText = `Detected: ${wasteType}`;

// Display disposal tip
document.getElementById("disposalTip").innerText = disposalInstructions[wasteType] || "Please dispose responsibly!";
