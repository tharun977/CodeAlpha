const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close")[0];
const prevBtn = document.getElementsByClassName("prev")[0];
const nextBtn = document.getElementsByClassName("next")[0];

let currentImgIndex = 0;
const images = document.querySelectorAll(".gallery a");

// Open modal on image click
images.forEach((img, index) => {
    img.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
        modalImg.src = this.querySelector("img").src;
        captionText.innerHTML = this.querySelector("img").alt;
        currentImgIndex = index;
    });
});

// Close modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Show previous image
prevBtn.onclick = function() {
    currentImgIndex = (currentImgIndex === 0) ? images.length - 1 : currentImgIndex - 1;
    modalImg.src = images[currentImgIndex].querySelector("img").src;
    captionText.innerHTML = images[currentImgIndex].querySelector("img").alt;
}

// Show next image
nextBtn.onclick = function() {
    currentImgIndex = (currentImgIndex === images.length - 1) ? 0 : currentImgIndex + 1;
    modalImg.src = images[currentImgIndex].querySelector("img").src;
    captionText.innerHTML = images[currentImgIndex].querySelector("img").alt;
}

// Close modal on click outside the image
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Keyboard navigation
window.addEventListener("keydown", function(event) {
    if (modal.style.display === "block") {
        if (event.key === "ArrowLeft") {
            prevBtn.click();
        } else if (event.key === "ArrowRight") {
            nextBtn.click();
        } else if (event.key === "Escape") {
            closeBtn.click();
        }
    }
});

// Swipe gestures for touch devices
let touchstartX = 0;
let touchendX = 0;

modal.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
}, false);

modal.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
}, false);

function handleGesture() {
    if (touchendX < touchstartX) {
        nextBtn.click();
    } else if (touchendX > touchstartX) {
        prevBtn.click();
    }
}
