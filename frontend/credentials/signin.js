document.addEventListener("DOMContentLoaded", function () {
    // Initialize Supabase
    const supabaseUrl = "https://prwgvnyjkeeblrliaffy.supabase.co"; // Your Supabase URL
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd2d2bnlqa2VlYmxybGlhZmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNDIxMzQsImV4cCI6MjA2ODkxODEzNH0.1yWTyG29KCrWpNNovBssRHLcHcvpdE8IbndtNAquSVU"; // Your Supabase anon key
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const signinForm = document.getElementById("signinForm");
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const successMessage = document.getElementById("successMessage");

    // Toggle password visibility
    togglePassword.addEventListener("click", function () {
        const type =
            passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        this.textContent = type === "password" ? "Show" : "Hide";
    });

    // Form validation
    signinForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        emailError.style.display = "none";
        passwordError.style.display = "none";
        successMessage.style.display = "none";

        // Email validation
        if (!emailField.value || !emailField.value.includes("@")) {
            emailError.style.display = "block";
            isValid = false;
        }

        // Password validation
        if (!passwordField.value) {
            passwordError.style.display = "block";
            isValid = false;
        }

        // If valid, attempt to sign in
        if (isValid) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: emailField.value,
                    password: passwordField.value,
                });

                if (error) {
                    throw error;
                }

                successMessage.style.display = "block";
                signinForm.reset();

                // Simulate redirection after 2 seconds
                setTimeout(function () {
                    successMessage.style.display = "none";
                    // Go up one directory to find index.html
                    window.location.href = '../index.html';
                }, 2000);

            } catch (error) {
                console.error("Sign-in error:", error);
                passwordError.textContent = "Invalid login credentials.";
                passwordError.style.display = "block";
            }
        }
    });
});