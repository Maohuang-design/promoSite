document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Observer for paragraphs and quotes in synopsis
    const synopsisObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                synopsisObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all paragraphs and the quote in the synopsis
    document.querySelectorAll('.synopsis-content p, .quote').forEach(element => {
        synopsisObserver.observe(element);
    });

    // Observer for infection stages
    const stageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                stageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all stages
    document.querySelectorAll('.stage').forEach(stage => {
        stageObserver.observe(stage);
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const synopsisSection = document.querySelector('.synopsis');
            synopsisSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            // Move the background image slightly as user scrolls
            hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
    });

    // Text infection effect on hover for certain elements
    const infectionElements = document.querySelectorAll('.stage h3');
    
    infectionElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            applyInfectionEffect(element);
        });
        
        element.addEventListener('mouseout', () => {
            element.style.textShadow = 'none';
        });
    });

    function applyInfectionEffect(element) {
        // Create a glitchy, infected text shadow effect
        const colors = ['#8b0000', '#4a0000', '#2a3e2a'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        element.style.textShadow = `
            2px 2px 0 ${randomColor},
            -2px -2px 0 ${randomColor},
            0 0 8px rgba(139, 0, 0, 0.7)
        `;
    }

    // Add a subtle "infection" effect to the page
    function createInfectionParticle() {
        const particle = document.createElement('div');
        particle.classList.add('infection-particle');
        
        // Random position on the screen
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Random size
        const size = Math.random() * 5 + 2;
        
        // Set styles
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(139, 0, 0, 0.5);
            border-radius: 50%;
            top: ${posY}px;
            left: ${posX}px;
            pointer-events: none;
            z-index: 9;
            opacity: 0;
            filter: blur(1px);
            animation: fadeInOut ${Math.random() * 3 + 2}s ease-in-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        // Remove particle after animation completes
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }

    // Create infection particles occasionally
    setInterval(createInfectionParticle, 2000);

    // Add keyframes for the fadeInOut animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 0.7; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
    `;
    document.head.appendChild(style);
});
