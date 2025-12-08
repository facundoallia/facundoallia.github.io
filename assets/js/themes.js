// Theme Toggle Functionality
(function() {
    'use strict';

    // Current theme state (default: light)
    let currentTheme = 'light';

    // Theme icons
    const THEME_ICONS = {
        light: '🌙', // Moon for light mode (click to go dark)
        dark: '☀️'   // Sun for dark mode (click to go light)
    };

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        initThemeToggle();
        loadThemePreference();
    });

    function initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        saveThemePreference(currentTheme);
    }

    function applyTheme(theme) {
        // Apply theme to document
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }

        // Update toggle button icon
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const themeIcon = themeToggle.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.textContent = THEME_ICONS[theme];
            }
        }

        // Dispatch custom event for theme change
        const event = new CustomEvent('themechange', { detail: { theme: theme } });
        document.dispatchEvent(event);
    }

    function saveThemePreference(theme) {
        try {
            localStorage.setItem('preferred-theme', theme);
        } catch (e) {
            console.warn('Could not save theme preference:', e);
        }
    }

    function loadThemePreference() {
        try {
            // Check localStorage first
            const savedTheme = localStorage.getItem('preferred-theme');
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                currentTheme = savedTheme;
                applyTheme(currentTheme);
                return;
            }

            // Check system preference if no saved preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                currentTheme = 'dark';
                applyTheme(currentTheme);
            }
        } catch (e) {
            console.warn('Could not load theme preference:', e);
        }
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Modern browsers
        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', function(e) {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('preferred-theme')) {
                    currentTheme = e.matches ? 'dark' : 'light';
                    applyTheme(currentTheme);
                }
            });
        }
        // Older browsers
        else if (darkModeQuery.addListener) {
            darkModeQuery.addListener(function(e) {
                if (!localStorage.getItem('preferred-theme')) {
                    currentTheme = e.matches ? 'dark' : 'light';
                    applyTheme(currentTheme);
                }
            });
        }
    }

    // Expose theme utilities globally
    window.themeUtils = {
        getCurrentTheme: function() { return currentTheme; },
        setTheme: function(theme) {
            if (theme === 'light' || theme === 'dark') {
                currentTheme = theme;
                applyTheme(currentTheme);
                saveThemePreference(currentTheme);
            }
        },
        toggleTheme: toggleTheme
    };

})();

// Prevent flash of unstyled content (FOUC) on page load
(function() {
    // This runs immediately, before DOMContentLoaded
    try {
        const savedTheme = localStorage.getItem('preferred-theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    } catch (e) {
        // Silently fail - not critical
    }
})();
