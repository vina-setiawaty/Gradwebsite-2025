window.onload = () => {
    animateScroll();

    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    mobileMenuButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (mobileMenuButton.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    })

    const mobileMenuOptions = document.querySelectorAll(".mobile-menu-options")
    mobileMenuOptions.forEach((option) => {
        option.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("clicked option")
            closeMenu();
        })
    })
}

function animateScroll() {
    offset -= 1;
    images.forEach(img => {
        img.style.transform = `translateX(${offset}px)`;
    });

    // Loop back when the first image has moved out of view
    if (Math.abs(offset) >= imageWidth) {
        offset = 0;
    }

    requestAnimationFrame(animateScroll);
}

function closeMenu() {
    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    const menuButton = document.querySelector("#menu-button");
    const exitButton = document.querySelector("#exit-button");
    const logo = document.querySelector("#main-logo");
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenuButton.classList.remove("active")
    menuButton.classList.remove("hidden")
    exitButton.classList.add("hidden")
    logo.classList.remove("hidden")
    mobileMenu.classList.add("hidden")
    console.log("menu closed")
}

function openMenu() {
    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    const menuButton = document.querySelector("#menu-button");
    const exitButton = document.querySelector("#exit-button");
    const logo = document.querySelector("#main-logo");
    const mobileMenu = document.querySelector("#mobile-menu");
    mobileMenuButton.classList.add("active")
    menuButton.classList.add("hidden")
    exitButton.classList.remove("hidden")
    logo.classList.add("hidden")
    mobileMenu.classList.remove("hidden")
    console.log("menu opened")
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
