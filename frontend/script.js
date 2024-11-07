// script.js

// Utility function to check if the user is authenticated
const checkAuth = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        window.location.href = "index.html"; // Redirect to login page if not authenticated
    }
    return token;
};

// Utility function to show messages (success or error)
const showMessage = (message, isSuccess = true) => {
    alert(message); // You can implement custom message UI (success or error) here
};

// Function to handle logout
const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "index.html"; // Redirect to login page after logout
};

// Function to handle fetching data from an API and displaying it
const fetchData = async (url, displayFunction, errorMessage) => {
    const token = checkAuth();

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (response.ok) {
            displayFunction(data); // Call the function to display data
        } else {
            showMessage(errorMessage, false); // Show error message
        }
    } catch (error) {
        showMessage(`Error: ${errorMessage}`, false); // Show error message
        console.error(error);
    }
};

// Function to handle updating data on the server
const updateData = async (url, updatedData, successMessage, errorMessage) => {
    const token = checkAuth();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        if (response.ok) {
            showMessage(successMessage); // Show success message
        } else {
            showMessage(errorMessage, false); // Show error message
        }
    } catch (error) {
        showMessage(`Error: ${errorMessage}`, false); // Show error message
        console.error(error);
    }
};

// Function to display COVID cases in widgets
const displayCovidCases = (data) => {
    const casesContainer = document.getElementById("casesContainer");
    casesContainer.innerHTML = ""; // Clear previous data

    data.forEach((caseData) => {
        const caseWidget = document.createElement("div");
        caseWidget.classList.add("widget");
        caseWidget.innerHTML = `
            <h3>Region: ${caseData.region}</h3>
            <p>Active Cases: ${caseData.activeCases}</p>
            <p>Recovered Cases: ${caseData.recoveredCases}</p>
            <p>Deaths: ${caseData.deaths}</p>
        `;
        casesContainer.appendChild(caseWidget);
    });
};

// Function to display hospital resources in widgets
const displayHospitalResources = (data) => {
    const resourcesContainer = document.getElementById("resourcesContainer");
    resourcesContainer.innerHTML = ""; // Clear previous data

    data.forEach((resource) => {
        const resourceWidget = document.createElement("div");
        resourceWidget.classList.add("widget");
        resourceWidget.innerHTML = `
            <h3>Region: ${resource.region}</h3>
            <p>Beds Available: ${resource.bedsAvailable}</p>
            <p>Ventilators Available: ${resource.ventilatorsAvailable}</p>
            <p>ICU Capacity: ${resource.ICUCapacity}</p>
        `;
        resourcesContainer.appendChild(resourceWidget);
    });
};

// Function to display vaccination status in widgets
const displayVaccinationStatus = (data) => {
    const vaccinationContainer = document.getElementById("vaccinationContainer");
    vaccinationContainer.innerHTML = ""; // Clear previous data

    data.forEach((status) => {
        const statusWidget = document.createElement("div");
        statusWidget.classList.add("widget");
        statusWidget.innerHTML = `
            <h3>State: ${status.state}</h3>
            <p>Doses Administered: ${status.dosesAdministered}</p>
            <p>Population Vaccinated: ${status.populationVaccinated}</p>
        `;
        vaccinationContainer.appendChild(statusWidget);
    });
};

// Fetch COVID cases
const fetchCovidCases = () => {
    fetchData("http://localhost:5000/api/covid/cases", displayCovidCases, "Failed to fetch COVID cases.");
};

// Fetch hospital resources
const fetchHospitalResources = () => {
    fetchData("http://localhost:5000/api/covid/hospitals/resources", displayHospitalResources, "Failed to fetch hospital resources.");
};

// Fetch vaccination status
const fetchVaccinationStatus = () => {
    fetchData("http://localhost:5000/api/covid/vaccination-status", displayVaccinationStatus, "Failed to fetch vaccination status.");
};

// Update COVID cases
const updateCovidCases = (region, updatedData) => {
    updateData("http://localhost:5000/api/covid/cases/update", { region, ...updatedData }, "COVID cases updated successfully.", "Failed to update COVID cases.");
};

// Update hospital resources
const updateHospitalResources = (region, updatedData) => {
    updateData("http://localhost:5000/api/covid/hospitals/resources/update", { region, ...updatedData }, "Hospital resources updated successfully.", "Failed to update hospital resources.");
};

// Event listener for logout
document.getElementById("logoutBtn").addEventListener("click", handleLogout);

// Example usage of fetch functions when corresponding containers are available
if (document.getElementById("casesContainer")) {
    fetchCovidCases();
}

if (document.getElementById("resourcesContainer")) {
    fetchHospitalResources();
}

if (document.getElementById("vaccinationContainer")) {
    fetchVaccinationStatus();
}
