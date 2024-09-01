const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close")[0];
const prevBtn = document.getElementsByClassName("prev")[0];
const nextBtn = document.getElementsByClassName("next")[0];

let currentImgIndex = 0;
const images = document.querySelectorAll(".gallery a");

images.forEach((img, index) => {
    img.addEventListener("click", function(event) {
        event.preventDefault();
        modal.style.display = "block";
        modalImg.src = this.querySelector("img").src;
        captionText.innerHTML = this.querySelector("img").alt;
        currentImgIndex = index;
    });
});

closeBtn.onclick = function() {
    modal.style.display = "none";
}

prevBtn.onclick = function() {
    currentImgIndex = (currentImgIndex === 0) ? images.length - 1 : currentImgIndex - 1;
    modalImg.src = images[currentImgIndex].querySelector("img").src;
    captionText.innerHTML = images[currentImgIndex].querySelector("img").alt;
}

nextBtn.onclick = function() {
    currentImgIndex = (currentImgIndex === images.length - 1) ? 0 : currentImgIndex + 1;
    modalImg.src = images[currentImgIndex].querySelector("img").src;
    captionText.innerHTML = images[currentImgIndex].querySelector("img").alt;
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
