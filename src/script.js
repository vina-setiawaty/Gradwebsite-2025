import { DESIGNER_DATA } from "./data.js";

let offset = 0;

let slideIndex = 0;
const wrapper = document.querySelector('#scrolling-icons-wrapper');
const images = wrapper.querySelectorAll('img');
wrapper.style.width = `${wrapper.getBoundingClientRect().height * 5463 / 135}px`;
let imageWidth = wrapper.getBoundingClientRect().width;

window.onload = () => {
    animateScroll();
    const prevButton = document.querySelector("#prev-button")
    prevButton.addEventListener("click", (e) => { plusSlides(-1) })
    const nextButton = document.querySelector("#next-button")
    nextButton.addEventListener("click", (e) => { plusSlides(1) })
    showSlides(slideIndex);
    createDesignerCards();

    const mobileMenuButton = document.querySelector("#mobile-menu-button");
    mobileMenuButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (mobileMenuButton.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    })

    const batchIntroduction = document.querySelector("#batch-introduction")

    const option = document.querySelector("#mobile-menu-batch-introduction")
    option.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked option")
        batchIntroduction.scrollIntoView({ behavior: "smooth" });
        closeMenu();
    })


    handlePicResize();

    window.addEventListener("resize", handlePicResize);

    setTimeout(() => {
        const mobileOpeningPage = document.querySelector("#mobile-opening-page")
        mobileOpeningPage.classList.remove("opacity-100")
        mobileOpeningPage.classList.add("opacity-0")
        // mobileOpeningPage.classList.add("hidden")
    }, 1500)

    setTimeout(() => {
        const mobileOpeningPage = document.querySelector("#mobile-opening-page")
        mobileOpeningPage.classList.add("hidden")
    }, 2100)
}

function handlePicResize() {
    console.log("resizing")
    const wrapper = document.querySelector('#scrolling-icons-wrapper');
    const carousel = document.querySelector('#batch-photo-carousel');
    wrapper.style.width = `${wrapper.getBoundingClientRect().height * 5463 / 135}px`;
    imageWidth = wrapper.getBoundingClientRect().width;
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

function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
    console.log("slideIndex: " + slideIndex)
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slides");
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }

    let container = document.querySelector("#batch-photo-carousel");
    container.style.height = `${slides[slideIndex].getBoundingClientRect().height}px`;

    if (slideIndex == 0) {
        document.querySelector("#prev-button").classList.add("hidden")
    } else if (slideIndex == slides.length - 1) {
        document.querySelector("#next-button").classList.add("hidden")
    } else {
        document.querySelector("#prev-button").classList.remove("hidden")
        document.querySelector("#next-button").classList.remove("hidden")
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("translate-x-0");
        // Set direction-specific translate on all inactive slides
        slides[i].classList.add(i < slideIndex ? "-translate-x-full" : "translate-x-full");
    }

    // Clean current slide's classes and make it visible at center
    slides[slideIndex].classList.remove("translate-x-full", "-translate-x-full");
    slides[slideIndex].classList.add("translate-x-0");
}

function createDesignerCards() {
    const container = document.querySelector("#designer-cards-container");
    DESIGNER_DATA.forEach((designer) => {
        const card = document.createElement("div");
        card.classList.add("designer-card", "h-auto", "w-auto", "mx-2", "my-2");
        card.innerHTML = `
            <img class="bg-blue aspect-3/4 w-[40vw] sm:h-[296px] sm:w-[204px]" src="${designer.image}" alt="${designer.PreferredName}">
            <p class="font-light font-secondary py-2">${designer.PreferredName}</h3>
        `;
        container.appendChild(card);
    });
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
