// Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const navLinks = document.querySelector('.nav-links');
        
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
        }
        
        function closeSidebar() {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        mobileMenu.addEventListener('click', toggleSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        
        // Sidebar link functionality
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                // Close sidebar
                closeSidebar();
                
                // Scroll to section
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
                
                // Update active link
                document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Also update main nav if visible
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                const correspondingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            });
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
            
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const resourceCards = document.querySelectorAll('.resource-card');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            resourceCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                const cardContainer = card.parentElement;
                
                if (cardText.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.parentElement.style.opacity = '1';
                } else {
                    card.style.display = searchTerm === '' ? 'block' : 'none';
                    card.parentElement.style.opacity = searchTerm === '' ? '1' : '0.5';
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.15)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });

        // Resource card click handlers
        document.querySelectorAll('.resource-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Here you would typically navigate to specific pages or show content
                // For demo purposes, we'll show an alert
                const cardTitle = this.parentElement.querySelector('h3').textContent;
                alert(`Loading ${cardTitle} section... This would navigate to the specific resource page.`);
            });
        });

        // Dynamic content loading simulation
        function loadContent(section) {
            const contentArea = document.getElementById('dynamic-content');
            if (contentArea) {
                contentArea.innerHTML = `<h3>Loading ${section}...</h3><p>Content for ${section} would be loaded here dynamically.</p>`;
            }
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('active')) {
                closeSidebar();
            }
            
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Initialize tooltips and enhanced interactions
        document.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
