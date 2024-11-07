// home.js

// Check if the user is authenticated by verifying the token
function checkAuthentication() {
    const authToken = localStorage.getItem('authToken');
    
    // If the token is not found, redirect to the login page
    if (!authToken) {
        window.location.href = 'index.html';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Call checkAuthentication to verify if the user is logged in
    checkAuthentication();

    // Event listeners for navigation buttons
    const navigationButtons = [
        { id: "logoutBtn", url: "index.html" },
        { id: "resourcesBtn", url: "resources.html" },
        { id: "updateResourcesBtn", url: "update-resources.html" },
        { id: "casesBtn", url: "cases.html" },
        { id: "updateCasesBtn", url: "update-cases.html" },
        { id: "vaccinationStatusBtn", url: "vaccination-status.html" },
        { id: "flowchartBtn", url: "flowchar.html" },
    ];

    navigationButtons.forEach((button) => {
        const btn = document.getElementById(button.id);
        btn.addEventListener("click", () => {
            if (button.id === "logoutBtn") {
                localStorage.removeItem("authToken");
            }
            window.location.href = button.url;
        });
    });
});