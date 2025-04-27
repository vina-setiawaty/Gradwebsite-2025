let offset = 0;
const wrapper = document.querySelector('#scrolling-icons-wrapper');
const images = wrapper.querySelectorAll('img');
wrapper.style.width = `${wrapper.getBoundingClientRect().height * 5463 / 135}px`;
const imageWidth = wrapper.getBoundingClientRect().width;

slideIndex = 0;

window.onload = () => {
    animateScroll();
    const prevButton = document.querySelector("#prev-button")
    prevButton.addEventListener("click", (e) => { plusSlides(-1) })
    const nextButton = document.querySelector("#next-button")
    nextButton.addEventListener("click", (e) => { plusSlides(1) })
    showSlides(slideIndex, true);
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
