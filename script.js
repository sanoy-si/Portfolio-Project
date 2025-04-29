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
  
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      })
    }
  
    // Typing effect for hero subtitle
    const typedTextSpan = document.querySelector(".typed-text")
    const cursorSpan = document.querySelector(".cursor")
  
    const textArray = ["Web Developer", "UI/UX Designer", "Backend Developer", "Problem Solver"]
    const typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000 // Delay between current and next text
    let textArrayIndex = 0
    let charIndex = 0
  
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
        charIndex++
        setTimeout(type, typingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        setTimeout(erase, newTextDelay)
      }
    }
  
    function erase() {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
        charIndex--
        setTimeout(erase, erasingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        textArrayIndex++
        if (textArrayIndex >= textArray.length) textArrayIndex = 0
        setTimeout(type, typingDelay + 1100)
      }
    }
  
    if (textArray.length) setTimeout(type, newTextDelay + 250)
  })