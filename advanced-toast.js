/**
 * Advanced Toast Notification System
 * سیستم پیشرفته اعلان‌های Toast
 * 
 * Features:
 * - Multiple toast types (success, error, warning, info)
 * - Custom positioning (top-left, top-right, bottom-left, bottom-right, center)
 * - Rich animations and transitions
 * - Progress bars and timers
 * - Action buttons
 * - Queue management
 * - Responsive design
 * - RTL support
 * - Customizable themes
 * - Sound notifications
 * 
 * @version 2.0.0
 * @author Panel Dashboard
 */

(function (global) {
    'use strict';

    /**
     * Toast Configuration
     * تنظیمات پیش‌فرض Toast
     */
    const DEFAULT_CONFIG = {
        // موقعیت نمایش
        position: 'top-right', // top-left, top-right, bottom-left, bottom-right, center

        // زمان نمایش (میلی‌ثانیه)
        duration: 4000,

        // انیمیشن ورود و خروج
        animation: 'slide', // slide, fade, bounce, zoom, flip

        // نوع Toast
        type: 'info', // success, error, warning, info, custom

        // نمایش نوار پیشرفت
        showProgressBar: true,

        // قابلیت بستن دستی
        closable: true,

        // نمایش آیکون
        showIcon: true,

        // پخش صدا
        playSound: false,

        // حداکثر تعداد Toast همزمان
        maxToasts: 5,

        // فاصله بین Toast ها
        spacing: 10,

        // تم رنگی
        theme: 'modern', // modern, classic, minimal, glassmorphism

        // اندازه
        size: 'medium', // small, medium, large

        // جهت متن (برای پشتیبانی RTL)
        rtl: true,

        // Auto close
        autoClose: true,

        // Pause on hover
        pauseOnHover: true,

        // Click to close
        clickToClose: false
    };

    /**
     * Toast Types Configuration
     * تنظیمات انواع Toast
     */
    const TOAST_TYPES = {
        success: {
            icon: '✅',
            bgColor: 'bg-green-500',
            textColor: 'text-white',
            borderColor: 'border-green-400',
            progressColor: 'bg-green-200',
            sound: 'success.mp3'
        },
        error: {
            icon: '❌',
            bgColor: 'bg-red-500',
            textColor: 'text-white',
            borderColor: 'border-red-400',
            progressColor: 'bg-red-200',
            sound: 'error.mp3'
        },
        warning: {
            icon: '⚠️',
            bgColor: 'bg-yellow-500',
            textColor: 'text-white',
            borderColor: 'border-yellow-400',
            progressColor: 'bg-yellow-200',
            sound: 'warning.mp3'
        },
        info: {
            icon: 'ℹ️',
            bgColor: 'bg-blue-500',
            textColor: 'text-white',
            borderColor: 'border-blue-400',
            progressColor: 'bg-blue-200',
            sound: 'info.mp3'
        },
        loading: {
            icon: '<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>',
            bgColor: 'bg-gray-600',
            textColor: 'text-white',
            borderColor: 'border-gray-400',
            progressColor: 'bg-gray-200',
            sound: null
        }
    };

    /**
     * Animation Configurations
     * تنظیمات انیمیشن‌ها
     */
    const ANIMATIONS = {
        slide: {
            enter: 'translate-x-full opacity-0',
            enterActive: 'translate-x-0 opacity-100 transition-all duration-300 ease-out',
            exit: 'translate-x-full opacity-0 transition-all duration-200 ease-in'
        },
        fade: {
            enter: 'opacity-0 scale-95',
            enterActive: 'opacity-100 scale-100 transition-all duration-300 ease-out',
            exit: 'opacity-0 scale-95 transition-all duration-200 ease-in'
        },
        bounce: {
            enter: 'opacity-0 scale-50 translate-y-10',
            enterActive: 'opacity-100 scale-100 translate-y-0 transition-all duration-500 ease-out',
            exit: 'opacity-0 scale-50 translate-y-10 transition-all duration-200 ease-in'
        },
        zoom: {
            enter: 'opacity-0 scale-0',
            enterActive: 'opacity-100 scale-100 transition-all duration-300 ease-out',
            exit: 'opacity-0 scale-0 transition-all duration-200 ease-in'
        },
        flip: {
            enter: 'opacity-0 rotateY-90',
            enterActive: 'opacity-100 rotateY-0 transition-all duration-400 ease-out',
            exit: 'opacity-0 rotateY-90 transition-all duration-200 ease-in'
        }
    };

    /**
     * Position Configurations
     * تنظیمات موقعیت‌ها
     */
    const POSITIONS = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    };

    /**
     * Toast Class
     * کلاس اصلی Toast
     */
    class AdvancedToast {
        constructor(config = {}) {
            this.config = { ...DEFAULT_CONFIG, ...config };
            this.toasts = new Map();
            this.container = null;
            this.soundEnabled = this.config.playSound;
            this.init();
        }

        /**
         * Initialize Toast System
         * راه‌اندازی سیستم Toast
         */
        init() {
            this.createContainer();
            this.injectStyles();
            this.setupGlobalListeners();
        }

        /**
         * Create Toast Container
         * ایجاد کانتینر Toast
         */
        createContainer() {
            // Remove existing container
            const existing = document.getElementById('advanced-toast-container');
            if (existing) existing.remove();

            this.container = document.createElement('div');
            this.container.id = 'advanced-toast-container';
            this.container.className = `fixed ${POSITIONS[this.config.position]} z-[9999] pointer-events-none`;
            this.container.style.cssText = `
                max-width: 400px;
                min-width: 300px;
            `;

            document.body.appendChild(this.container);
        }

        /**
         * Inject Required Styles
         * تزریق استایل‌های مورد نیاز
         */
        injectStyles() {
            const styleId = 'advanced-toast-styles';
            if (document.getElementById(styleId)) return;

            const styles = document.createElement('style');
            styles.id = styleId;
            styles.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap');
                
                .toast-container * {
                    font-family: 'Vazirmatn', sans-serif;
                }

                .toast-modern {
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }

                .toast-glassmorphism {
                    background: rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
                }

                .toast-minimal {
                    border: none;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                }

                .toast-classic {
                    border: 2px solid;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .toast-small { 
                    padding: 8px 12px; 
                    font-size: 12px; 
                    min-height: 40px; 
                }
                
                .toast-medium { 
                    padding: 12px 16px; 
                    font-size: 14px; 
                    min-height: 50px; 
                }
                
                .toast-large { 
                    padding: 16px 20px; 
                    font-size: 16px; 
                    min-height: 60px; 
                }

                @keyframes toast-progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }

                .toast-progress-bar {
                    animation: toast-progress linear;
                }

                .toast-bounce {
                    animation: toast-bounce-animation 0.5s ease-out;
                }

                @keyframes toast-bounce-animation {
                    0% { transform: translateY(-100px) scale(0.8); opacity: 0; }
                    50% { transform: translateY(10px) scale(1.05); opacity: 0.8; }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }

                .toast-shake {
                    animation: toast-shake 0.5s ease-in-out;
                }

                @keyframes toast-shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
                    20%, 40%, 60%, 80% { transform: translateX(3px); }
                }

                /* RTL Support */
                .toast-rtl {
                    direction: rtl;
                    text-align: right;
                }

                .toast-rtl .toast-icon {
                    margin-left: 8px;
                    margin-right: 0;
                }

                .toast-rtl .toast-close {
                    left: 8px;
                    right: auto;
                }

                /* Hover effects */
                .toast-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
                }

                .toast-item:hover .toast-progress-bar {
                    animation-play-state: paused;
                }

                /* Mobile responsive */
                @media (max-width: 768px) {
                    .toast-container {
                        left: 10px !important;
                        right: 10px !important;
                        max-width: calc(100vw - 20px) !important;
                        min-width: auto !important;
                    }
                }
            `;

            document.head.appendChild(styles);
        }

        /**
         * Setup Global Event Listeners
         * تنظیم گوش‌دهنده‌های سراسری
         */
        setupGlobalListeners() {
            // Pause on window blur
            window.addEventListener('blur', () => {
                this.pauseAll();
            });

            // Resume on window focus
            window.addEventListener('focus', () => {
                this.resumeAll();
            });

            // Handle page visibility change
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseAll();
                } else {
                    this.resumeAll();
                }
            });
        }

        /**
         * Show Toast
         * نمایش Toast
         */
        show(message, options = {}) {
            const config = { ...this.config, ...options };
            const toastId = this.generateId();

            // Check max toasts limit
            if (this.toasts.size >= this.config.maxToasts) {
                this.removeOldest();
            }

            const toastElement = this.createToastElement(toastId, message, config);
            const toastData = {
                id: toastId,
                element: toastElement,
                config: config,
                timer: null,
                startTime: Date.now(),
                remainingTime: config.duration,
                isPaused: false
            };

            this.toasts.set(toastId, toastData);
            this.container.appendChild(toastElement);

            // Play sound
            if (config.playSound && TOAST_TYPES[config.type]?.sound) {
                this.playSound(TOAST_TYPES[config.type].sound);
            }

            // Animate in
            this.animateIn(toastElement, config);

            // Setup auto close
            if (config.autoClose) {
                this.setupAutoClose(toastId);
            }

            return toastId;
        }

        /**
         * Create Toast Element
         * ایجاد عنصر Toast
         */
        createToastElement(id, message, config) {
            const typeConfig = TOAST_TYPES[config.type] || TOAST_TYPES.info;

            const toast = document.createElement('div');
            toast.id = `toast-${id}`;
            toast.className = `
                toast-item toast-${config.size} toast-${config.theme}
                ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor}
                rounded-lg shadow-lg mb-${config.spacing / 4} relative overflow-hidden
                pointer-events-auto cursor-pointer transform transition-all duration-300
                ${config.rtl ? 'toast-rtl' : ''}
            `;

            // Create toast content
            const content = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center flex-1">
                        ${config.showIcon ? `
                            <div class="toast-icon flex-shrink-0 ml-3">
                                ${typeof typeConfig.icon === 'string' && typeConfig.icon.startsWith('<')
                        ? typeConfig.icon
                        : `<span class="text-lg">${typeConfig.icon}</span>`}
                            </div>
                        ` : ''}
                        
                        <div class="flex-1 min-w-0">
                            <div class="toast-message font-medium">
                                ${message}
                            </div>
                            ${config.description ? `
                                <div class="toast-description text-sm opacity-90 mt-1">
                                    ${config.description}
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div class="flex items-center mr-2">
                        ${config.actions ? this.createActionButtons(config.actions) : ''}
                        
                        ${config.closable ? `
                            <button class="toast-close ml-2 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors" 
                                    onclick="window.AdvancedToast.close('${id}')">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        ` : ''}
                    </div>
                </div>

                ${config.showProgressBar ? `
                    <div class="toast-progress absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20">
                        <div class="toast-progress-bar h-full ${typeConfig.progressColor}" 
                             style="animation-duration: ${config.duration}ms;"></div>
                    </div>
                ` : ''}
            `;

            toast.innerHTML = content;

            // Setup event listeners
            this.setupToastListeners(toast, id, config);

            return toast;
        }

        /**
         * Create Action Buttons
         * ایجاد دکمه‌های اکشن
         */
        createActionButtons(actions) {
            return actions.map(action => `
                <button class="toast-action-btn px-3 py-1 text-xs font-medium rounded-md 
                               bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors mr-1"
                        onclick="${action.handler}">
                    ${action.label}
                </button>
            `).join('');
        }

        /**
         * Setup Toast Event Listeners
         * تنظیم گوش‌دهنده‌های رویداد Toast
         */
        setupToastListeners(element, id, config) {
            // Hover pause/resume
            if (config.pauseOnHover) {
                element.addEventListener('mouseenter', () => this.pause(id));
                element.addEventListener('mouseleave', () => this.resume(id));
            }

            // Click to close
            if (config.clickToClose) {
                element.addEventListener('click', (e) => {
                    if (!e.target.closest('button')) {
                        this.close(id);
                    }
                });
            }

            // Touch support
            let touchStartY = 0;
            element.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            });

            element.addEventListener('touchend', (e) => {
                const touchEndY = e.changedTouches[0].clientY;
                const diff = touchStartY - touchEndY;

                // Swipe up to close
                if (diff > 50) {
                    this.close(id);
                }
            });
        }

        /**
         * Animate Toast In
         * انیمیشن ورود Toast
         */
        animateIn(element, config) {
            const animation = ANIMATIONS[config.animation] || ANIMATIONS.slide;

            // Set initial state
            element.className += ` ${animation.enter}`;

            // Animate to active state
            requestAnimationFrame(() => {
                element.className = element.className.replace(animation.enter, animation.enterActive);
            });
        }

        /**
         * Animate Toast Out
         * انیمیشن خروج Toast
         */
        animateOut(element, config) {
            return new Promise((resolve) => {
                const animation = ANIMATIONS[config.animation] || ANIMATIONS.slide;

                element.className = element.className.replace(animation.enterActive, animation.exit);

                setTimeout(() => {
                    resolve();
                }, 200);
            });
        }

        /**
         * Setup Auto Close Timer
         * تنظیم تایمر بسته شدن خودکار
         */
        setupAutoClose(id) {
            const toastData = this.toasts.get(id);
            if (!toastData) return;

            toastData.timer = setTimeout(() => {
                this.close(id);
            }, toastData.config.duration);
        }

        /**
         * Pause Toast
         * متوقف کردن Toast
         */
        pause(id) {
            const toastData = this.toasts.get(id);
            if (!toastData || toastData.isPaused) return;

            toastData.isPaused = true;

            if (toastData.timer) {
                clearTimeout(toastData.timer);
                const elapsed = Date.now() - toastData.startTime;
                toastData.remainingTime = Math.max(0, toastData.config.duration - elapsed);
            }

            // Pause progress bar
            const progressBar = toastData.element.querySelector('.toast-progress-bar');
            if (progressBar) {
                progressBar.style.animationPlayState = 'paused';
            }
        }

        /**
         * Resume Toast
         * ادامه دادن Toast
         */
        resume(id) {
            const toastData = this.toasts.get(id);
            if (!toastData || !toastData.isPaused) return;

            toastData.isPaused = false;
            toastData.startTime = Date.now();

            if (toastData.config.autoClose && toastData.remainingTime > 0) {
                toastData.timer = setTimeout(() => {
                    this.close(id);
                }, toastData.remainingTime);
            }

            // Resume progress bar
            const progressBar = toastData.element.querySelector('.toast-progress-bar');
            if (progressBar) {
                progressBar.style.animationPlayState = 'running';
            }
        }

        /**
         * Pause All Toasts
         * متوقف کردن همه Toast ها
         */
        pauseAll() {
            this.toasts.forEach((_, id) => {
                this.pause(id);
            });
        }

        /**
         * Resume All Toasts
         * ادامه دادن همه Toast ها
         */
        resumeAll() {
            this.toasts.forEach((_, id) => {
                this.resume(id);
            });
        }

        /**
         * Close Toast
         * بستن Toast
         */
        async close(id) {
            const toastData = this.toasts.get(id);
            if (!toastData) return;

            // Clear timer
            if (toastData.timer) {
                clearTimeout(toastData.timer);
            }

            // Animate out
            await this.animateOut(toastData.element, toastData.config);

            // Remove from DOM and map
            toastData.element.remove();
            this.toasts.delete(id);
        }

        /**
         * Close All Toasts
         * بستن همه Toast ها
         */
        closeAll() {
            const promises = Array.from(this.toasts.keys()).map(id => this.close(id));
            return Promise.all(promises);
        }

        /**
         * Remove Oldest Toast
         * حذف قدیمی‌ترین Toast
         */
        removeOldest() {
            const oldestId = Array.from(this.toasts.keys())[0];
            if (oldestId) {
                this.close(oldestId);
            }
        }

        /**
         * Play Sound
         * پخش صدا
         */
        playSound(soundFile) {
            if (!this.soundEnabled) return;

            try {
                const audio = new Audio(`/sounds/${soundFile}`);
                audio.volume = 0.3;
                audio.play().catch(() => {
                    // Ignore audio play errors
                });
            } catch (error) {
                // Ignore audio errors
            }
        }

        /**
         * Generate Unique ID
         * تولید شناسه یکتا
         */
        generateId() {
            return `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        }

        /**
         * Update Toast
         * به‌روزرسانی Toast
         */
        update(id, message, options = {}) {
            const toastData = this.toasts.get(id);
            if (!toastData) return;

            const messageElement = toastData.element.querySelector('.toast-message');
            if (messageElement) {
                messageElement.innerHTML = message;
            }

            // Update description if provided
            if (options.description) {
                const descElement = toastData.element.querySelector('.toast-description');
                if (descElement) {
                    descElement.innerHTML = options.description;
                } else {
                    const messageContainer = toastData.element.querySelector('.toast-message').parentNode;
                    const descDiv = document.createElement('div');
                    descDiv.className = 'toast-description text-sm opacity-90 mt-1';
                    descDiv.innerHTML = options.description;
                    messageContainer.appendChild(descDiv);
                }
            }
        }

        /**
         * Get Toast Count
         * دریافت تعداد Toast ها
         */
        getCount() {
            return this.toasts.size;
        }

        /**
         * Check if Toast Exists
         * بررسی وجود Toast
         */
        exists(id) {
            return this.toasts.has(id);
        }
    }

    /**
     * Convenience Methods
     * متدهای راحتی
     */
    const createConvenienceMethod = (type) => {
        return function (message, options = {}) {
            return toastInstance.show(message, { ...options, type });
        };
    };

    // Create global instance
    const toastInstance = new AdvancedToast();

    // Export to global scope
    global.AdvancedToast = {
        // Core methods
        show: (message, options) => toastInstance.show(message, options),
        close: (id) => toastInstance.close(id),
        closeAll: () => toastInstance.closeAll(),
        update: (id, message, options) => toastInstance.update(id, message, options),
        pause: (id) => toastInstance.pause(id),
        resume: (id) => toastInstance.resume(id),
        pauseAll: () => toastInstance.pauseAll(),
        resumeAll: () => toastInstance.resumeAll(),

        // Convenience methods
        success: createConvenienceMethod('success'),
        error: createConvenienceMethod('error'),
        warning: createConvenienceMethod('warning'),
        info: createConvenienceMethod('info'),
        loading: createConvenienceMethod('loading'),

        // Utility methods
        getCount: () => toastInstance.getCount(),
        exists: (id) => toastInstance.exists(id),

        // Configuration
        configure: (config) => {
            Object.assign(toastInstance.config, config);
            toastInstance.createContainer();
        },

        // Instance access
        getInstance: () => toastInstance
    };

})(window);
