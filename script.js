 
document.addEventListener('DOMContentLoaded', function() {
    
    initDownloadButtons();
    initSearchFunctionality();
    initLanguageButtons();
    initPlatformButtons();
    initSmoothScrolling();
    initScrollAnimations();
    initMobileNavigation();
    initThemeToggle();
});

    
function initDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn, .btn-primary');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const originalText = this.innerHTML;
            
    
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.disabled = true;
            
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                
                showNotification('VS Code download started!', 'success');
                
                
                trackDownload('stable-build');
            }, 2000);
        });
    });
}

 
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input');
    const searchIcon = document.querySelector('.search-box i');
    
    if (searchInput) {
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        
        searchIcon.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        
        searchInput.addEventListener('input', function() {
            showSearchSuggestions(this.value);
        });
        
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.value = '';
                hideSearchSuggestions();
            }
        });
    }
}

function performSearch(query) {
    if (query.trim() !== '') {
        // Show loading state
        const searchIcon = document.querySelector('.search-box i');
        const originalClass = searchIcon.className;
        searchIcon.className = 'fas fa-spinner fa-spin';
        
        // Simulate API call
        setTimeout(() => {
            searchIcon.className = originalClass;
            showNotification(`Searching for: "${query}"`, 'info');
            
            // Track search event
            trackSearch(query);
            
            // Clear input after search
            document.querySelector('.search-box input').value = '';
            hideSearchSuggestions();
        }, 1000);
    }
}

function showSearchSuggestions(query) {
    
    if (query.length > 2) {
        console.log('Showing suggestions for:', query);
        
    }
}

function hideSearchSuggestions() {
    
    console.log('Hiding search suggestions');
}

 
function initLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const language = this.textContent;
            
            
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            
            showNotification(`Setting up VS Code for ${language} development`, 'info');
            
            
            trackLanguageSelection(language);
            
            
            document.querySelector('.features').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

 
function initPlatformButtons() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.querySelector('span').textContent;
            
            
            showNotification(`Downloading VS Code for ${platform}`, 'success');
            
            
            trackPlatformDownload(platform);
            
            
            const icon = this.querySelector('i');
            const originalClass = icon.className;
            icon.className = 'fas fa-download';
            
            setTimeout(() => {
                icon.className = originalClass;
            }, 2000);
        });
    });
}

 
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

 
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    
    document.querySelectorAll('.testimonial').forEach(testimonial => {
        testimonial.style.opacity = '0';
        testimonial.style.transform = 'translateX(-30px)';
        testimonial.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(testimonial);
    });
}

 
function initMobileNavigation() {
    const nav = document.querySelector('.nav-links');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    
    if (window.innerWidth <= 768) {
        document.querySelector('.top-nav').appendChild(hamburger);
        
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            if (hamburger.parentNode) {
                hamburger.parentNode.removeChild(hamburger);
            }
        } else if (window.innerWidth <= 768 && !document.querySelector('.hamburger-menu')) {
            document.querySelector('.top-nav').appendChild(hamburger);
        }
    });
}

 
function initThemeToggle() {
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle dark mode';
    
    
    const nav = document.querySelector('.top-nav');
    nav.appendChild(themeToggle);
    
    
    const savedTheme = localStorage.getItem('vsCode-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('vsCode-theme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('vsCode-theme', 'light');
        }
    });
}

 
function showNotification(message, type = 'info') {
    
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            color: #333;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        }
        .notification-success {
            border-left: 4px solid #27ca3f;
        }
        .notification-info {
            border-left: 4px solid #0078d4;
        }
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            padding: 5px;
        }
        .notification-close:hover {
            color: #333;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

 
function trackDownload(version) {
    console.log(`Download tracked: ${version}`, new Date().toISOString());
    
}

function trackSearch(query) {
    console.log(`Search tracked: "${query}"`, new Date().toISOString());
}

function trackLanguageSelection(language) {
    console.log(`Language selection tracked: ${language}`, new Date().toISOString());
}

function trackPlatformDownload(platform) {
    console.log(`Platform download tracked: ${platform}`, new Date().toISOString());
}

 
window.addEventListener('load', function() {
    
    document.body.classList.add('loaded');
    
    
    preloadImages([
        
    ]);
});

function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

 
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

 
const darkThemeStyles = `
    <style id="dark-theme-styles">
        .dark-theme {
            --light-bg: #1e1e1e;
            --text-color: #ffffff;
            --card-bg: #2d2d30;
            --border-color: #444;
        }
        .dark-theme header {
            background-color: #2d2d30;
            border-bottom: 1px solid #444;
        }
        .dark-theme .features {
            background-color: #1e1e1e;
        }
        .dark-theme .languages {
            background-color: #2d2d30;
        }
        .dark-theme .lang-btn {
            background-color: #3e3e42;
            color: white;
            border-color: #444;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', darkThemeStyles);