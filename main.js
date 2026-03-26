document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0)`;
    });

    function animateFollower() {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;
        
        follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect for interactive elements
    const interactives = document.querySelectorAll('a, button, .skill-card, .exp-card, .project-card');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0) scale(2)`;
            follower.style.background = 'rgba(0, 242, 254, 0.1)';
            follower.style.borderColor = 'transparent';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0) scale(1)`;
            follower.style.background = 'transparent';
            follower.style.borderColor = 'var(--primary)';
        });
    });

    // Scroll Reveal Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.exp-card, .project-card, .skill-card, .contact-item, .section-header, .section-number, .section-title');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.2, 1, 0.3, 1) ${index % 4 * 0.1}s`;
        revealOnScroll.observe(el);
    });

    // Handle visibility with class for precision
    const style = document.createElement('style');
    style.innerHTML = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Handle Navbar and Blobs on Scroll
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        const scrolled = window.scrollY;
        if (document.querySelector('.blob-1')) {
            document.querySelector('.blob-1').style.transform = `translateY(${scrolled * 0.1}px) rotate(${scrolled * 0.02}deg)`;
        }
        if (document.querySelector('.blob-2')) {
            document.querySelector('.blob-2').style.transform = `translateY(${-scrolled * 0.1}px) rotate(${-scrolled * 0.02}deg)`;
        }
    });
});
