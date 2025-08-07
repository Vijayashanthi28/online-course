  // Modal Elements
        const cartModal = document.getElementById('cartModal');
        const authModal = document.getElementById('authModal');
        const cartIcon = document.getElementById('cartIcon');
        const userIcon = document.getElementById('userIcon');
        const searchInput = document.querySelector('.search-input');
        
        // Close buttons
        const closeCartModal = document.getElementById('closeCartModal');
        const closeAuthModal = document.getElementById('closeAuthModal');
        
        // Auth elements
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const switchToSignup = document.getElementById('switchToSignup');
        const switchToLogin = document.getElementById('switchToLogin');

        // Show Cart Modal
        function showCartModal() {
            cartModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        // Show Auth Modal
        function showAuthModal() {
            authModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        // Hide Cart Modal
        function hideCartModal() {
            cartModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        // Hide Auth Modal
        function hideAuthModal() {
            authModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        // Event Listeners
        cartIcon.addEventListener('click', showCartModal);
        userIcon.addEventListener('click', showAuthModal);
        closeCartModal.addEventListener('click', hideCartModal);
        closeAuthModal.addEventListener('click', hideAuthModal);

        // Search input click - redirect to search.html
        searchInput.addEventListener('click', function() {
            window.location.href = 'search.html';
        });

        // Close modals when clicking outside
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal) {
                hideCartModal();
            }
        });

        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                hideAuthModal();
            }
        });

        // Auth Tab Switching
        function switchToLoginTab() {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        }

        function switchToSignupTab() {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        }

        // Tab click events
        loginTab.addEventListener('click', switchToLoginTab);
        signupTab.addEventListener('click', switchToSignupTab);

        // Switch links
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            switchToSignupTab();
        });

        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            switchToLoginTab();
        });

        // Form submission handlers
        function handleLogin(event) {
            event.preventDefault();
            alert('Login functionality would be implemented here');
            hideAuthModal();
        }

        function handleSignup(event) {
            event.preventDefault();
            alert('Signup functionality would be implemented here');
            hideAuthModal();
        }

        // Checkout function
        function proceedCheckout() {
            alert('Redirecting to billing page...');
            // In a real application, you would redirect to billing.html
            // window.location.href = 'billing.html';
            hideCartModal();
        }

        // Update cart badge
        function updateCartBadge(count) {
            const badge = document.querySelector('.cart-badge');
            badge.textContent = count;
        }

        // Escape key to close modals
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (cartModal.classList.contains('show')) {
                    hideCartModal();
                }
                if (authModal.classList.contains('show')) {
                    hideAuthModal();
                }
            }
        });
        //Scroll container
         class HorizontalDrag {
            constructor(container) {
                this.container = container;
                this.wrapper = container.querySelector('#itemsContainer');
                this.isDown = false;
                this.startX = 0;
                this.scrollLeft = 0;
                this.currentX = 0;
                this.momentum = 0;
                this.animationId = null;
                
                this.init();
            }

            init() {
                // Mouse events
                this.container.addEventListener('mousedown', this.handleMouseDown.bind(this));
                this.container.addEventListener('mouseleave', this.handleMouseUp.bind(this));
                this.container.addEventListener('mouseup', this.handleMouseUp.bind(this));
                this.container.addEventListener('mousemove', this.handleMouseMove.bind(this));

                // Touch events for mobile
                this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
                this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
                this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });

                // Prevent default drag behavior on images
                this.container.addEventListener('dragstart', e => e.preventDefault());
            }

            handleMouseDown(e) {
                this.isDown = true;
                this.startX = e.pageX - this.container.offsetLeft;
                this.scrollLeft = this.getCurrentTranslateX();
                this.momentum = 0;
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
            }

            handleMouseUp() {
                this.isDown = false;
                this.applyMomentum();
            }

            handleMouseMove(e) {
                if (!this.isDown) return;
                e.preventDefault();
                
                this.currentX = e.pageX - this.container.offsetLeft;
                const walk = (this.currentX - this.startX) * 2;
                const newPosition = this.scrollLeft + walk;
                
                this.momentum = walk * 0.1;
                this.setTransform(newPosition);
            }

            handleTouchStart(e) {
                this.isDown = true;
                this.startX = e.touches[0].pageX - this.container.offsetLeft;
                this.scrollLeft = this.getCurrentTranslateX();
                this.momentum = 0;
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
            }

            handleTouchEnd() {
                this.isDown = false;
                this.applyMomentum();
            }

            handleTouchMove(e) {
                if (!this.isDown) return;
                e.preventDefault();
                
                this.currentX = e.touches[0].pageX - this.container.offsetLeft;
                const walk = (this.currentX - this.startX) * 2;
                const newPosition = this.scrollLeft + walk;
                
                this.momentum = walk * 0.1;
                this.setTransform(newPosition);
            }

            getCurrentTranslateX() {
                const transform = window.getComputedStyle(this.wrapper).transform;
                if (transform === 'none') return 0;
                
                const matrix = new DOMMatrix(transform);
                return matrix.m41;
            }

            setTransform(x) {
                const maxScroll = this.getMaxScroll();
                const boundedX = Math.max(Math.min(x, 50), -maxScroll - 50);
                this.wrapper.style.transform = `translateX(${boundedX}px)`;
            }

            getMaxScroll() {
                const containerWidth = this.container.offsetWidth;
                const wrapperWidth = this.wrapper.scrollWidth;
                return Math.max(0, wrapperWidth - containerWidth);
            }

            applyMomentum() {
                if (Math.abs(this.momentum) < 0.5) return;
                
                const animate = () => {
                    this.momentum *= 0.95;
                    const currentTransform = this.getCurrentTranslateX();
                    this.setTransform(currentTransform + this.momentum);
                    
                    if (Math.abs(this.momentum) > 0.5) {
                        this.animationId = requestAnimationFrame(animate);
                    }
                };
                
                animate();
            }
        }

        // Initialize horizontal drag
        document.addEventListener('DOMContentLoaded', function() {
            const horizontalScroll = document.getElementById('horizontalScroll');
            new HorizontalDrag(horizontalScroll);

            // Filter button functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('selected'));
                    this.classList.add('selected');
                });
            });
        });