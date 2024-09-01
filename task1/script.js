document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery');
    const loader = document.getElementById('loader');
    const backToTopBtn = document.getElementById('back-to-top');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    // Array of image URLs from Pexels
    const imageUrls = [
        'https://images.pexels.com/photos/34950/pexels-photo.jpg',
        'https://images.pexels.com/photos/36717/flower-purple-lical-blosso.jpg',
        'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
        'https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg',
        'https://images.pexels.com/photos/355241/pexels-photo-355241.jpeg',
        'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
        'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
        'https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg',
        'https://images.pexels.com/photos/712618/pexels-photo-712618.jpeg',
        'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg',
        'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg',
        'https://images.pexels.com/photos/462353/pexels-photo-462353.jpeg',
        'https://images.pexels.com/photos/158607/pexels-photo-158607.jpeg', // New
        'https://images.pexels.com/photos/3171188/pexels-photo-3171188.jpeg', // New
        'https://images.pexels.com/photos/1004112/pexels-photo-1004112.jpeg', // New
        'https://images.pexels.com/photos/193048/pexels-photo-193048.jpeg', // New
        'https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg'  // New
    ];

    // Show loader
    loader.style.display = 'block';

    // Load images
    Promise.all(imageUrls.map(loadImage))
        .then(images => {
            images.forEach(img => galleryContainer.appendChild(img));
            loader.style.display = 'none';
        })
        .catch(err => console.error('Failed to load images', err));

    function loadImage(url) {
        return new Promise((resolve, reject) => {
            const imgLink = document.createElement('a');
            imgLink.href = url;
            imgLink.target = '_blank';

            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Beautiful Nature Image';
            img.loading = 'lazy';

            img.onload = () => resolve(imgLink);
            img.onerror = () => reject(new Error(`Failed to load image: ${url}`));

            imgLink.appendChild(img);

            // Add click event for modal
            imgLink.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(url, img.alt);
            });
        });
    }

    // Modal functionality
    function openModal(src, alt) {
        modal.innerHTML = `
            <span class="close-btn">&times;</span>
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <div class="modal-caption">${alt}</div>
            </div>
        `;
        modal.style.display = 'flex';

        // Close modal events
        modal.querySelector('.close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    // Back to Top functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
