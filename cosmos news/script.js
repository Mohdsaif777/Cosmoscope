// NASA API configuration
const NASA_API_KEY = 'DEMO_KEY'; // Replace with your NASA API key for production use
const newsContainer = document.getElementById('newsContainer');
const discoveriesContainer = document.getElementById('discoveriesContainer');
const eventsContainer = document.getElementById('eventsContainer');

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    fadeInObserver.observe(section);
});

// Fetch and display NASA APOD images for news
async function fetchSpaceNews() {
    try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=6`);
        const data = await response.json();
        
        newsContainer.innerHTML = '';
        data.forEach(item => {
            const newsCard = createNewsCard(item);
            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';
    }
}

// Create news card element
function createNewsCard(item) {
    const card = document.createElement('article');
    card.className = 'news-card fade-out';
    
    const date = new Date(item.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    card.innerHTML = `
        <img src="${item.url}" alt="${item.title}" class="news-image" loading="lazy">
        <div class="news-content">
            <div class="news-date">${date}</div>
            <h2 class="news-title">${item.title}</h2>
            <p class="news-excerpt">${item.explanation.substring(0, 150)}...</p>
        </div>
    `;

    card.addEventListener('click', () => {
        window.open(item.hdurl || item.url, '_blank');
    });

    fadeInObserver.observe(card);
    return card;
}

// Fetch and display upcoming space events
async function fetchSpaceEvents() {
    try {
        const currentDate = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${currentDate}&end_date=${currentDate}`);
        const data = await response.json();

        eventsContainer.innerHTML = `
            <div class="event-item">
                <div class="event-date">${new Date(data.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>
                <div class="event-content">
                    <h3>Today's Astronomy Picture</h3>
                    <p>${data.title}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching events:', error);
        eventsContainer.innerHTML = '<p class="error">Failed to load events. Please try again later.</p>';
    }
}

// Navigation arrows functionality
const prevButton = document.querySelector('.nav-arrow.prev');
const nextButton = document.querySelector('.nav-arrow.next');
let currentPage = 0;

prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updateNewsDisplay();
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    updateNewsDisplay();
});

function updateNewsDisplay() {
    const cards = document.querySelectorAll('.news-card');
    cards.forEach((card, index) => {
        card.style.transform = `translateX(${-100 * currentPage}%)`;
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    fetchSpaceNews();
    fetchSpaceEvents();
});

// Refresh content periodically
setInterval(fetchSpaceNews, 3600000); // Every hour
setInterval(fetchSpaceEvents, 3600000);
