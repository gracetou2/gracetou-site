// Update Year in Footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// --- GALLERY FUNCTIONALITY (Only runs on Gallery Page) ---
document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        const totalImages = 64;
        const imageFolder = 'assets/gallery/images/';

        // Generate Gallery Items
        for (let i = 1; i <= totalImages; i++) {
            const item = document.createElement('div');
            item.classList.add('gallery-item');
            
            const img = document.createElement('img');
            img.src = `${imageFolder}${i}.jpg`; 
            img.alt = `Art Piece ${i}`;
            img.loading = "lazy"; 
            
            img.onclick = () => openLightbox(i);

            item.appendChild(img);
            galleryGrid.appendChild(item);
        }
    }
});

// Lightbox Variables
let currentIndex = 0;
const totalImages = 64;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    
    if (lightbox && lightboxImg && caption) {
        currentIndex = index;
        lightbox.style.display = "block";
        lightboxImg.src = `assets/gallery/images/${currentIndex}.jpg`;
        caption.innerText = `Art Piece ${currentIndex}`;
    }
}

// Lightbox Event Listeners
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.onclick = () => {
        document.getElementById('lightbox').style.display = "none";
    };
}

function changeSlide(n) {
    currentIndex += n;
    if (currentIndex > totalImages) currentIndex = 1;
    if (currentIndex < 1) currentIndex = totalImages;
    
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    
    if (lightboxImg && caption) {
        lightboxImg.src = `assets/gallery/images/${currentIndex}.jpg`;
        caption.innerText = `Art Piece ${currentIndex}`;
    }
}

// Close Lightbox on outside click
window.onclick = (event) => {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }
};


// --- CAROUSEL FUNCTIONALITY (Only runs on Home Page) ---
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    };

    // When I click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    });

    // When I click right, move slides to the right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    });

    // When I click the nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        // what indicator was clicked on?
        const targetDot = e.target.closest('button');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrows(slides, prevButton, nextButton, targetIndex);
    });
}