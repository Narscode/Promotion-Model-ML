const features = [
    { name: "Feature 1", id: "feature1" },
    { name: "Feature 2", id: "feature2" },
    { name: "Feature 3", id: "feature3" }
  ];
  
  // Populate the table with input fields
  const featuresTable = document.getElementById('features-table');
  features.forEach(feature => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${feature.name}</td>
      <td><input type="number" id="${feature.id}" placeholder="Enter value"></td>
    `;
    featuresTable.appendChild(row);
  });
  
  async function predict() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Loading...';
  
    // Collect input values
    const inputValues = features.map(feature => {
      const value = document.getElementById(feature.id).value;
      return parseFloat(value) || 0; // Default to 0 if empty
    });
  
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: inputValues }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch prediction');
      }
  
      const data = await response.json();
      resultDiv.textContent = `Prediction: ${data.prediction}`;
    } catch (error) {
      console.error('Error:', error);
      resultDiv.textContent = 'Error fetching prediction';
    }
  }
