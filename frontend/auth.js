document.addEventListener('DOMContentLoaded', () => {
    // Initialize Supabase Client
    const supabaseUrl = "https://prwgvnyjkeeblrliaffy.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd2d2bnlqa2VlYmxybGlhZmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNDIxMzQsImV4cCI6MjA2ODkxODEzNH0.1yWTyG29KCrWpNNovBssRHLcHcvpdE8IbndtNAquSVU";
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const authContainer = document.getElementById('auth-container');

    // Function to update UI based on session
    const updateUserUI = (user) => {
        // Clear previous content
        authContainer.innerHTML = ''; 

        if (user) {
            // User is logged in
            const fullName = user.user_metadata?.full_name || user.email;

            // Create welcome message and logout button
            authContainer.innerHTML = `
                <li class="nav-item">
                    <a class="nav-link" href="#">Welcome, ${fullName}</a>
                </li>
                <li class="nav-item">
                    <button id="logoutButton" class="btn btn-outline-danger btn-sm">Logout</button>
                </li>
            `;

            // Add event listener for the logout button
            const logoutButton = document.getElementById('logoutButton');
            logoutButton.addEventListener('click', async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) {
                    // Refresh UI after logout
                    updateUserUI(null); 
                } else {
                    console.error('Logout failed:', error);
                }
            });

        } else {
            // User is not logged in
            authContainer.innerHTML = `
                <div class="auth-buttons">
                    <a href="./credentials/signin.html" class="btn btn-success">Login / Signup</a>
                </div>
            `;
        }
    };

    // Check the session and update the UI when the page loads
    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        updateUserUI(session?.user);
    };

    // Listen for authentication state changes
    supabase.auth.onAuthStateChange((_event, session) => {
        updateUserUI(session?.user);
    });

    // Initial check
    checkSession();
});