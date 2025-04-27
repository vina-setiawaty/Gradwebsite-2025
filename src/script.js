let offset = 0;
const wrapper = document.querySelector('#scrolling-icons-wrapper');
const images = wrapper.querySelectorAll('img');
wrapper.style.width = `${wrapper.getBoundingClientRect().height * 5463/135}px`;
const imageWidth = wrapper.getBoundingClientRect().width;

window.onload = () => {


    animateScroll();
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

animateScroll();