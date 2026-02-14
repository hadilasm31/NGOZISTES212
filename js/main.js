// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll pour les ancres
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

// Gestion de la vidéo sur mobile
const video = document.querySelector('.hero-video video');
const videoControl = document.querySelector('.video-control');

if (video && videoControl) {
    // Détection mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Sur mobile, on désactive autoplay et on attend l'interaction utilisateur
        video.pause();
        videoControl.innerHTML = '<i class="fas fa-play"></i>';
        
        videoControl.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoControl.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                videoControl.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    } else {
        // Sur desktop, on laisse l'autoplay
        video.play().catch(error => {
            console.log('Autoplay prevented:', error);
            videoControl.style.display = 'flex';
        });
        
        videoControl.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                videoControl.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                videoControl.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }
}

// Header transparent au scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'white';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'transparent';
        header.style.boxShadow = 'none';
    }
});

// Animation des compteurs de statistiques
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };

        updateCount();
    });
}

// Observer pour lancer l'animation quand la section est visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Filtre de la galerie
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lightbox pour la galerie
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const closeLightbox = document.querySelector('.close-lightbox');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Gestionnaire de formulaire d'adhésion
const adhesionForm = document.querySelector('#adhesion-form');
if (adhesionForm) {
    adhesionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(adhesionForm);
        const data = Object.fromEntries(formData);
        
        // Ici, vous enverrez les données à Supabase
        console.log('Données du formulaire à envoyer à Supabase:', data);
        
        alert('Votre demande d\'adhésion a été envoyée avec succès ! Elle sera traitée dans les plus brefs délais.');
        adhesionForm.reset();
    });
}

// Gestionnaire de connexion
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        
        // Ici, vous vérifierez les identifiants avec Supabase
        console.log('Tentative de connexion à vérifier avec Supabase:', { email, password });
        
        alert('Fonction de connexion à implémenter avec Supabase');
    });
}

// Animation au scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .event-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Fonctions pour charger les données depuis Supabase
async function loadTimeline() {
    // À implémenter avec Supabase
    console.log('Chargement de la timeline depuis Supabase');
}

async function loadMissions() {
    // À implémenter avec Supabase
    console.log('Chargement des missions depuis Supabase');
}

async function loadEvents() {
    // À implémenter avec Supabase
    console.log('Chargement des événements depuis Supabase');
}

async function loadGallery() {
    // À implémenter avec Supabase
    console.log('Chargement de la galerie depuis Supabase');
}

async function loadStats() {
    // À implémenter avec Supabase
    console.log('Chargement des statistiques depuis Supabase');
}
