document.addEventListener("DOMContentLoaded", () => {
    const letterFront = document.getElementById("letter-front");
    const letterContent = document.getElementById("letter-content");
    const scenes = document.querySelectorAll(".scene");
    const nextButtons = document.querySelectorAll(".next-btn");
    const answerButtons = document.querySelectorAll(".answer-btn");
    const galleryImages = document.querySelectorAll(".image-gallery img");
    let currentScene = 0;
    let currentImageIndex = 0;

    function openLetter() {
        gsap.to(letterFront, { rotationX: 180, duration: 1, ease: "power2.inOut", onComplete: () => {
            letterContent.style.display = "flex";
            gsap.fromTo(letterContent, { rotationX: 180 }, { rotationX: 0, duration: 1, ease: "power2.inOut" });
        }});
    }

    function closeLetter() {
        gsap.to(letterContent, { rotationX: 180, duration: 1, ease: "power2.inOut", onComplete: () => {
            letterContent.style.display = "none";
            gsap.fromTo(letterFront, { rotationX: 180 }, { rotationX: 0, duration: 1, ease: "power2.inOut" });
        }});
    }

    letterFront.addEventListener("click", openLetter);

    function changeScene() {
        gsap.to(scenes[currentScene], { opacity: 0, scale: 0.8, duration: 0.8, onComplete: () => {
            scenes[currentScene].classList.remove("active");
            currentScene++;
            if (currentScene < scenes.length) {
                scenes[currentScene].classList.add("active");
                gsap.fromTo(scenes[currentScene], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 });
            }
        }});
    }

    nextButtons.forEach(button => {
        button.addEventListener("click", changeScene);
    });

    answerButtons.forEach(button => {
        button.addEventListener("click", () => {
            changeScene();
            closeLetter();
        });
    });

    function animateImages() {
        if (currentImageIndex < galleryImages.length) {
            gsap.to(galleryImages[currentImageIndex], {
                opacity: 1,
                transform: "scale(1)",
                duration: 1.5,
                ease: "power2.out",
                delay: currentImageIndex < 3 ? currentImageIndex * 2 : 0,
                onComplete: animateImages
            });
            galleryImages[currentImageIndex].classList.add("active");
            currentImageIndex++;
        }
    }

    animateImages();

    particlesJS("particles-js", {
        particles: {
            number: { value: 80 },
            color: { value: "#ffd700" },
            shape: { type: "circle" },
            opacity: { value: 0.8 },
            size: { value: 5 },
            move: { speed: 2 }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } }
        }
    });
});
