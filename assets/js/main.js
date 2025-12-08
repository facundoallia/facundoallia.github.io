// Language Toggle Functionality
(function() {
    'use strict';

    // Current language state (default: English)
    let currentLang = 'en';

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        initLanguageToggle();
        loadLanguagePreference();
    });

    function initLanguageToggle() {
        const langToggle = document.getElementById('lang-toggle');
        if (!langToggle) return;

        langToggle.addEventListener('click', function() {
            toggleLanguage();
        });
    }

    function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        applyLanguage(currentLang);
        saveLanguagePreference(currentLang);
    }

    function applyLanguage(lang) {
        // Update toggle button text
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            const langText = langToggle.querySelector('.lang-text');
            if (langText) {
                langText.textContent = lang === 'en' ? 'ES' : 'EN';
            }
        }

        // Update all elements with data-en and data-es attributes
        const elements = document.querySelectorAll('[data-en][data-es]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Check if element has children that are not text nodes
                if (element.children.length === 0) {
                    element.textContent = text;
                } else {
                    // For elements with children, update only direct text nodes
                    const childNodes = Array.from(element.childNodes);
                    const textNode = childNodes.find(node => node.nodeType === Node.TEXT_NODE);
                    if (textNode) {
                        textNode.textContent = text;
                    } else {
                        // If no text node, prepend the text
                        element.insertBefore(document.createTextNode(text), element.firstChild);
                    }
                }
            }
        });

        // Update document language attribute
        document.documentElement.lang = lang;
    }

    function saveLanguagePreference(lang) {
        try {
            localStorage.setItem('preferred-language', lang);
        } catch (e) {
            console.warn('Could not save language preference:', e);
        }
    }

    function loadLanguagePreference() {
        try {
            const savedLang = localStorage.getItem('preferred-language');
            if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
                currentLang = savedLang;
                applyLanguage(currentLang);
            }
        } catch (e) {
            console.warn('Could not load language preference:', e);
        }
    }

    // Smooth scroll for anchor links
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    });

    // Mobile menu handling (for smaller screens)
    document.addEventListener('DOMContentLoaded', function() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        // Add mobile menu toggle functionality if needed
        if (window.innerWidth <= 768) {
            // Mobile-specific functionality can be added here
        }
    });

    // Active navigation link highlighting
    document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        function highlightNavigation() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightNavigation);
        highlightNavigation(); // Initial call
    });

    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Expose utility functions globally if needed
    window.portfolioUtils = {
        validateEmail: validateEmail,
        getCurrentLanguage: function() { return currentLang; }
    };

})();
