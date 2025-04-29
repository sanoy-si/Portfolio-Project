// Theme toggle functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")
  
    // Function to set the theme
    const setTheme = (theme) => {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
    }
  
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem("theme")
  
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDarkScheme.matches) {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"
      setTheme(newTheme)
    })
  
    // Listen for changes in system theme preference
    prefersDarkScheme.addEventListener("change", (e) => {
      // Only update if the user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light"
        setTheme(newTheme)
      }
    })
  
    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        hamburger.classList.toggle("active")
      })
    }
  })