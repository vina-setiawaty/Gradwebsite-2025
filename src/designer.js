import { DESIGNER_DATA } from "./data.js";

const links_icon = {
    "Linkedin": "./assets/linkedin.svg",
    "Portfolio": "./assets/website-link.svg",
    "Behance": "./assets/behance-256.png",
    "Instagram": "./assets/instagram.png",
}

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

    const image_container = document.querySelector("#designer-intro-image");
    image_container.src = DESIGNER_DATA[index]["Portrait"];

    const email = document.querySelectorAll(".email-link");
    email.forEach((el) => {
        el.href = `mailto:${DESIGNER_DATA[index]["Email"]}`;
    });
    const email_text = document.querySelectorAll(".designer-email");
    email_text.forEach((el) => {
        el.innerHTML = DESIGNER_DATA[index]["Email"];
    });

    if (DESIGNER_DATA[index]["links"][0] !== "") {
        const links_container = document.querySelectorAll(".first-link-ref")
        links_container.forEach((el) => {
            el.href = DESIGNER_DATA[index][DESIGNER_DATA[index]["links"][0]];
            el.querySelector("img").src = links_icon[DESIGNER_DATA[index]["links"][0]];
            el.querySelector("p").innerHTML = DESIGNER_DATA[index][DESIGNER_DATA[index]["links"][0]].split("/")[-1];
            console.log(DESIGNER_DATA[index][DESIGNER_DATA[index]["links"][0]].replace(/\/+$/, "").split("/").pop());
        })
        if (DESIGNER_DATA[index]["links"].length > 1) {
            const second_links_container = document.querySelectorAll(".second-link-ref")
            second_links_container.forEach((el) => {
                el.href = DESIGNER_DATA[index][DESIGNER_DATA[index]["links"][1]];
                el.querySelector("img").src = links_icon[DESIGNER_DATA[index]["links"][1]];
                el.querySelector("p").innerHTML = DESIGNER_DATA[index][DESIGNER_DATA[index]["links"][1]].split("/")[-1];
                
            })
        } else {
            const second_links_container = document.querySelectorAll(".second-link-ref")
            second_links_container.forEach((el) => {
                el.remove();
            })
        }
    } else {
        const links_container = document.querySelectorAll(".first-link-ref")
        links_container.forEach((el) => {
            el.remove();
        })
        const second_links_container = document.querySelectorAll(".second-link-ref")
        second_links_container.forEach((el) => {
            el.remove();
        })
    }

    const title_container = document.querySelector("#projects-title");
    title_container.innerHTML = DESIGNER_DATA[index]["Project Title ( 1 Liner)"];

    const supervisor_container = document.querySelector("#projects-subtitle");
    if (DESIGNER_DATA[index]["Is your project thesis? (tick if yes)"] === "TRUE") {
        supervisor_container.innerHTML = `Thesis, under the guidance of ${DESIGNER_DATA[index]["Supervisor"]}`;
    } else {
        let content = `Platform, under the guidance of ${DESIGNER_DATA[index]["Supervisor"]}`;
        if (DESIGNER_DATA[index]["If it is platform project, list down your group members here"] !== "") {
            content += `, in collaboration with ${DESIGNER_DATA[index]["If it is platform project, list down your group members here"]}`;
        }
        supervisor_container.innerHTML = content;
    }

    const indiv_icons_container = document.querySelector("#indiv-icon");
    indiv_icons_container.src = DESIGNER_DATA[index]["Iconfile"]

    const main_image_container = document.querySelector("#project-main-photo");
    if (DESIGNER_DATA[index]["MainPic"].includes("assets")) {
        main_image_container.src = DESIGNER_DATA[index]["MainPic"];
    } else {
        const video_container = document.querySelector("#project-main-video");
        video_container.classList.remove("hidden")
        main_image_container.classList.add("hidden");
        video_container.src = DESIGNER_DATA[index]["MainPic"];
    }

    const header_1_container = document.querySelector("#header-1");;
    if (DESIGNER_DATA[index]["Header_1"] !== "") {
        header_1_container.innerHTML = DESIGNER_DATA[index]["Header_1"];
    } else {
        header_1_container.remove(); // Hide the element if no image is provided
    }

    const description_1_container = document.querySelector("#description-1");
    if (DESIGNER_DATA[index]["Description_1"] !== "") { 
        description_1_container.innerHTML = DESIGNER_DATA[index]["Description_1"]
    } else {
        description_1_container.remove(); // Hide the element if no content is provided
    }

    const header_2_container = document.querySelector("#header-2"); 
    if (DESIGNER_DATA[index]["Header_2"] !== "") {
        header_2_container.innerHTML = DESIGNER_DATA[index]["Header_2"];
    } else {
        header_2_container.remove(); // Hide the element if no image is provided
    }

    const description_2_container = document.querySelector("#description-2");
    if (DESIGNER_DATA[index]["Description_2"] !== "") {
        description_2_container.innerHTML = DESIGNER_DATA[index]["Description_2"];
    } else {
        if (DESIGNER_DATA[index]["Header_2"] === "" && DESIGNER_DATA[index]["Description_2"] === "") {
            const parent = description_2_container.parentElement;
            parent.remove()
        } else {
            description_2_container.remove(); // Hide the element if no content is provided
        }
    }

    const photo_2_container = document.querySelector("#photo-2");
    if (DESIGNER_DATA[index]["2nd pic (16:9) Landscape"] !== "") {
        photo_2_container.src = DESIGNER_DATA[index]["2nd pic (16:9) Landscape"];
    } else {
        photo_2_container.parentElement.remove(); // Hide the element if no image is provided
    }

    const photo_3_container = document.querySelector("#photo-3");
    if (DESIGNER_DATA[index]["3rd Pic (3:4) Portrait"] !== "") {
        photo_3_container.src = DESIGNER_DATA[index]["3rd Pic (3:4) Portrait"];
    } else {
        photo_3_container.parentElement.remove(); // Hide the element if no image is provided
    }

    const photo_4_container = document.querySelector("#photo-4");
    if (DESIGNER_DATA[index]["Picture_1 3:4"] !== "") {
        photo_4_container.src = DESIGNER_DATA[index]["Picture_1 3:4"];
    } else {
        photo_4_container.parentElement.remove(); // Hide the element if no image is provided
    }
    const photo_5_container = document.querySelector("#photo-5");
    if (DESIGNER_DATA[index]["Picture_2 3:4"] !== "") {
        photo_5_container.src = DESIGNER_DATA[index]["Picture_2 3:4"];
    } else {
        photo_5_container.parentElement.remove(); // Hide the element if no image is provided
    }
    const photo_6_container = document.querySelector("#photo-6");
    if (DESIGNER_DATA[index]["Picture_3 3:4"] !== "") {
        photo_6_container.src = DESIGNER_DATA[index]["Picture_3 3:4"];
    } else {
        photo_6_container.parentElement.remove(); // Hide the element if no image is provided
    }
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
