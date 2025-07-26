document.addEventListener("DOMContentLoaded", function () {
  // Initialize Supabase
  const supabaseUrl = "https://prwgvnyjkeeblrliaffy.supabase.co"; // Your Supabase URL
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd2d2bnlqa2VlYmxybGlhZmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNDIxMzQsImV4cCI6MjA2ODkxODEzNH0.1yWTyG29KCrWpNNovBssRHLcHcvpdE8IbndtNAquSVU"; // Your Supabase anon key
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const form = document.getElementById("signupForm");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const successMessage = document.getElementById("successMessage");
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword"
  );
  const submitButton = document.getElementById("submitButton");

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    password.type = password.type === "password" ? "text" : "password";
    togglePassword.textContent = password.type === "password" ? "Show" : "Hide";
  });

  toggleConfirmPassword.addEventListener("click", function () {
    confirmPassword.type =
      confirmPassword.type === "password" ? "text" : "password";
    toggleConfirmPassword.textContent =
      confirmPassword.type === "password" ? "Show" : "Hide";
  });

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    successMessage.style.display = "none";

    // Validate name
    if (fullName.value.trim() === "") {
      nameError.style.display = "block";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailError.style.display = "block";
      isValid = false;
    }

    // Validate password
    if (password.value.length < 8) {
      passwordError.style.display = "block";
      isValid = false;
    }

    // Validate confirm password
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.style.display = "block";
      isValid = false;
    }

    if (isValid) {
      try {
        submitButton.disabled = true;
        submitButton.textContent = "Creating Account...";

        const { data, error } = await supabase.auth.signUp({
          email: email.value.trim(),
          password: password.value,
          options: {
            data: {
              full_name: fullName.value.trim(),
            }
          }
        });

        if (error) {
          throw error;
        }

        successMessage.textContent = `Welcome to Revive Wheels, ${fullName.value.trim()}! Please check your email to confirm your account.`;
        successMessage.style.display = "block";
        form.reset();

        setTimeout(() => {
          window.location.href = "signin.html";
        }, 3000);
      } catch (error) {
        console.error("Signup error:", error);
        if (error.message.includes("already registered")) {
            emailError.textContent = "This email is already registered";
            emailError.style.display = "block";
        } else {
            successMessage.textContent = `Error: ${error.message}`;
            successMessage.style.color = "#ff4444";
            successMessage.style.display = "block";
        }
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create Account";
      }
    }
  });
});