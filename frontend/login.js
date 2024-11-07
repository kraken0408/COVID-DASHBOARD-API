// login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    
    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Make API call to authenticate user
        try {
            const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Save token to localStorage and redirect to home
                localStorage.setItem('authToken', data.token);
                window.location.href = 'home.html';
            } else {
                // Show error message if login fails
                loginError.textContent = data.message || 'Invalid username or password';
            }
        } catch (err) {
            loginError.textContent = 'An error occurred, please try again.';
        }
    });
});
