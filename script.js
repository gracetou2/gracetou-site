// Update Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return; // Only run on gallery page

    const totalImages = 64;
    const imageFolder = 'assets/gallery/images/';

    // Generate Gallery Items
    for (let i = 1; i <= totalImages; i++) {
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        
        const img = document.createElement('img');
        img.dataset.src = `${imageFolder}${i}.jpg`; // Lazy loading source
        img.src = 'assets/logo-banner.jpg'; // Placeholder (optional low-res) or empty
        // Better: use IntersectionObserver, but simple approach:
        img.src = `${imageFolder}${i}.jpg`; 
        img.alt = `Art Piece ${i}`;
        img.loading = "lazy"; // Native lazy loading
        
        img.onclick = () => openLightbox(i);

        item.appendChild(img);
        galleryGrid.appendChild(item);
    }
});

// Lightbox Variables
let currentIndex = 0;
const totalImages = 64;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    
    currentIndex = index;
    lightbox.style.display = "block";
    lightboxImg.src = `assets/gallery/images/${currentIndex}.jpg`;
    caption.innerText = `Art Piece ${currentIndex}`;
}

// Close Lightbox
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('lightbox').style.display = "none";
};

// Navigate Lightbox
function changeSlide(n) {
    currentIndex += n;
    if (currentIndex > totalImages) currentIndex = 1;
    if (currentIndex < 1) currentIndex = totalImages;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    
    lightboxImg.src = `assets/gallery/images/${currentIndex}.jpg`;
    caption.innerText = `Art Piece ${currentIndex}`;
}

// Close on outside click
window.onclick = (event) => {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
};