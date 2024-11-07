// apiService.js
const API_BASE_URL = 'http://localhost:5000/api/covid'; // Base URL for your API

// Function to handle the login process
export async function login(username, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);  // Store JWT token in localStorage
            return { success: true, token: data.token };
        } else {
            return { success: false, message: data.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred during login' };
    }
}

// Function to fetch all COVID-19 cases
export async function fetchCovidCases() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/cases`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json(); // Return the data if successful
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to fetch COVID cases');
        }
    } catch (error) {
        console.error('Error fetching COVID cases:', error);
        throw error;
    }
}

// Function to fetch COVID-19 cases by region
export async function fetchCovidCasesByRegion(region) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/cases/${region}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json(); // Return the data if successful
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to fetch COVID cases by region');
        }
    } catch (error) {
        console.error(`Error fetching COVID cases for ${region}:`, error);
        throw error;
    }
}

// Function to fetch hospital resources
export async function fetchHospitalResources() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/hospitals/resources`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json(); // Return the data if successful
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to fetch hospital resources');
        }
    } catch (error) {
        console.error('Error fetching hospital resources:', error);
        throw error;
    }
}

// Function to update hospital resources
export async function updateHospitalResources(region, bedsAvailable, ventilatorsAvailable, ICUCapacity) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/hospitals/resources/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                region,
                bedsAvailable,
                ventilatorsAvailable,
                ICUCapacity,
            }),
        });

        if (response.ok) {
            return await response.json(); // Return the updated resource data
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to update hospital resources');
        }
    } catch (error) {
        console.error('Error updating hospital resources:', error);
        throw error;
    }
}

// Function to fetch vaccination status
export async function fetchVaccinationStatus() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${API_BASE_URL}/vaccination-status`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return await response.json(); // Return the vaccination status data
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Failed to fetch vaccination status');
        }
    } catch (error) {
        console.error('Error fetching vaccination status:', error);
        throw error;
    }
}
