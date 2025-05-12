import { DESIGNER_DATA } from "./data.js";

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    let index = 0;

    if (params.get("designer")) {
       index = parseInt(params.get("designer").split("-")[1]);
    }

    loadContent(index);

    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    mobileMenuButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (mobileMenuButton.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    })

    const arrowBtn = document.getElementById("page-arrow-img");
    const targetSection = document.getElementById("designer-projects");
    let pointingDown = true; // initial state

    // IntersectionObserver to watch if target section is in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If target is in view, arrow points UP
                arrowBtn.classList.remove("rotate-0");
                arrowBtn.classList.add("rotate-180");
                
                pointingDown = false;
                console.log("Arrow pointing UP");
            } else {
                // Else, arrow points DOWN
                arrowBtn.classList.remove("rotate-180");
                arrowBtn.classList.add("rotate-0");
                pointingDown = true;
            }
        });
    });

    observer.observe(targetSection);

    // Click behavior
    arrowBtn.addEventListener("click", () => {
        if (pointingDown) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

}


function closeMenu() {
    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    const menuButton = document.querySelector("#menu-button");
    const exitButton = document.querySelector("#exit-button");
    const logo = document.querySelector("#main-logo");
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenuButton.classList.remove("active")
    // menuButton.classList.remove("hidden")
    // exitButton.classList.add("hidden")

    exitButton.classList.remove("opacity-100", "scale-100");
    exitButton.classList.add("opacity-0", "scale-20");

    menuButton.classList.remove("opacity-0", "scale-20");
    menuButton.classList.add("opacity-100", "scale-100");

    logo.classList.remove("hidden")
    mobileMenu.classList.remove("h-[100svh]")
    mobileMenu.classList.remove("opacity-100")
    mobileMenu.classList.add("h-[0svh]")
    mobileMenu.classList.add("opacity-0")
    console.log("menu closed")
}

function openMenu() {
    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    const menuButton = document.querySelector("#menu-button");
    const exitButton = document.querySelector("#exit-button");
    const logo = document.querySelector("#main-logo");
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenuButton.classList.add("active")
    // menuButton.classList.add("hidden")
    // exitButton.classList.remove("hidden")

    exitButton.classList.remove("opacity-0", "scale-20");
    exitButton.classList.add("opacity-100", "scale-100");

    menuButton.classList.remove("opacity-100", "scale-100");
    menuButton.classList.add("opacity-0", "scale-20");

    logo.classList.add("hidden")
    mobileMenu.classList.remove("h-[0svh]")
    mobileMenu.classList.remove("opacity-0")
    mobileMenu.classList.add("h-[100svh]")
    mobileMenu.classList.add("opacity-100")
    console.log("menu opened")
}

function loadContent(index) {
    const name_container = document.querySelector("#designer-name");
    name_container.innerHTML = DESIGNER_DATA[index].PreferredName; 

    const intro_container = document.querySelector("#intro-text");
    intro_container.innerHTML = DESIGNER_DATA[index]["Personal Description"];

    const icon_intro_container = document.querySelector("#icon-intro-text");
    icon_intro_container.innerHTML = DESIGNER_DATA[index]["Icon Description"];
}

document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is in the viewport
    };

    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        // Check if the element is already in the viewport
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        } else {
            observer.observe(element);
        }
    });
});
