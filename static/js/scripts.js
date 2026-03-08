/**
 * TipMatch IROS 2026 Website - JavaScript Functionality
 * Modern, modular JavaScript for enhanced user experience
 */

// ==========================================================================
// Video Tasks Data
// ==========================================================================
const videoTasks = {
  "Chopsticks": {
    video: "./static/videos/Chopsticks.mp4",
    taskName: "Chopsticks",
    description: "The robotic hand clamps chopsticks and must pick up and hold a fabric toy securely for 5 seconds."
  },
  "Brush": {
    video: "./static/videos/Brush.mp4",
    taskName: "Brush",
    description: "The robotic hand draws a vertical line on paper using finger motions."
  },
  "Syringe": {
    video: "./static/videos/Syringe.mp4",
    taskName: "Syringe",
    description: "The robotic hand grips a syringe and presses the plunger with the thumb to fully expel its contents."
  },
  "Scissors": {
    video: "./static/videos/Scissors.mp4",
    taskName: "Scissors",
    description: "The robotic hand cuts a 5 mm wide paper strip in three open–close cycles."
  },
  "Spray": {
    video: "./static/videos/Spray.mp4",
    taskName: "Spray Bottle",
    description: "The robotic hand grasps a spray bottle and presses the trigger to spray water within 40 seconds."
  }
};

// ==========================================================================
// Video Player Controller
// ==========================================================================
class VideoPlayerController {
  constructor() {
    this.videoElement = document.getElementById("selected-video");
    this.videoSource = document.getElementById("video-source");
    this.taskDescription = document.getElementById("task-description");
    this.taskTabs = document.querySelectorAll(".task-tab");

    this.init();
  }

  init() {
    // Add event listeners to task tabs
    this.taskTabs.forEach(tab => {
      tab.addEventListener("click", (e) => this.handleTabClick(e, tab));
      tab.addEventListener("keydown", (e) => this.handleTabKeydown(e, tab));
    });

    // Set initial video state
    this.updateVideoAriaAttributes();
  }

  handleTabClick(e, tab) {
    e.preventDefault();
    const taskKey = tab.getAttribute("data-video");
    this.switchVideo(taskKey);
  }

  handleTabKeydown(e, tab) {
    const taskKey = tab.getAttribute("data-video");

    switch(e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.switchVideo(taskKey);
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.focusNextTab(tab);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.focusPrevTab(tab);
        break;
    }
  }

  switchVideo(taskKey) {
    const taskData = videoTasks[taskKey];
    if (!taskData) {
      console.error("Video data not found for:", taskKey);
      return;
    }

    // Update video source
    this.videoSource.src = taskData.video;
    this.videoElement.load();

    // Update description - XSS safe implementation
    const description = document.createElement('p');
    description.innerHTML = `<b>${taskData.taskName}:</b> ${taskData.description}`;
    this.taskDescription.innerHTML = ''; // 清空
    this.taskDescription.appendChild(description);

    // Update tab states
    this.updateActiveTab(taskKey);

    // Play video after a short delay to ensure loading
    setTimeout(() => {
      this.videoElement.play().catch(e => {
        console.log("Autoplay prevented:", e);
      });
    }, 100);

    // Update ARIA attributes
    this.updateVideoAriaAttributes(taskKey);
  }

  updateActiveTab(activeKey) {
    this.taskTabs.forEach(tab => {
      const isActive = tab.getAttribute("data-video") === activeKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive);
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  focusNextTab(currentTab) {
    const nextTab = currentTab.nextElementSibling;
    if (nextTab && nextTab.classList.contains("task-tab")) {
      nextTab.focus();
    }
  }

  focusPrevTab(currentTab) {
    const prevTab = currentTab.previousElementSibling;
    if (prevTab && prevTab.classList.contains("task-tab")) {
      prevTab.focus();
    }
  }

  updateVideoAriaAttributes(activeKey = "Chopsticks") {
    this.videoElement.setAttribute("aria-label", `Video demonstration for ${activeKey} task`);
  }
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================
class SmoothScrolling {
  constructor() {
    this.init();
  }

  init() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// ==========================================================================
// Animation Observer
// ==========================================================================
class AnimationObserver {
  constructor() {
    this.init();
  }

  init() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements with animation class
    document.querySelectorAll('.abstract-card, .method-diagram, .results-table-container').forEach(el => {
      observer.observe(el);
    });
  }
}

// ==========================================================================
// Navigation Enhancement
// ==========================================================================
class NavigationEnhancement {
  constructor() {
    this.navbarBurger = document.querySelector('.navbar-burger');
    this.navbarMenu = document.querySelector('.navbar-menu');
    this.init();
  }

  init() {
    if (this.navbarBurger && this.navbarMenu) {
      this.navbarBurger.addEventListener('click', () => {
        this.navbarBurger.classList.toggle('is-active');
        this.navbarMenu.classList.toggle('is-active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.navbarBurger.contains(e.target) && !this.navbarMenu.contains(e.target)) {
          this.navbarBurger.classList.remove('is-active');
          this.navbarMenu.classList.remove('is-active');
        }
      });
    }
  }
}

// ==========================================================================
// Performance Optimizations
// ==========================================================================
class PerformanceOptimizations {
  constructor() {
    this.init();
  }

  init() {
    // Lazy load images
    this.lazyLoadImages();

    // Preload critical resources
    this.preloadCriticalResources();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  preloadCriticalResources() {
    const criticalResources = [
      './static/videos/Chopsticks.mp4',
      './static/videos/TipMatch.mp4'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = resource.includes('.mp4') ? 'video' : 'image';
      link.href = resource;
      document.head.appendChild(link);
    });
  }
}

// ==========================================================================
// Error Handling
// ==========================================================================
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    // Global error handler
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      // Could send to analytics service
    });

    // Handle video loading errors
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'video-error';
        errorDiv.innerHTML = '<p>Video could not be loaded. Please try refreshing the page.</p>';
        video.parentNode.replaceChild(errorDiv, video);
      });
    });
  }
}

// ==========================================================================
// 自定义视频控制
// ==========================================================================
class CustomVideoControls {
  constructor(videoId, controlsId, playBtnId, progressBarId, progressFillId, timeDisplayId) {
    this.video = document.getElementById(videoId);
    this.controls = document.querySelector(controlsId);
    this.playPauseBtn = document.getElementById(playBtnId);
    this.progressBar = document.getElementById(progressBarId);
    this.progressFill = document.getElementById(progressFillId);
    this.timeDisplay = document.getElementById(timeDisplayId);

    this.init();
  }

  init() {
    if (!this.video) return;

    // 播放/暂停控制
    this.playPauseBtn?.addEventListener('click', () => this.togglePlayPause());

    // 进度条控制
    this.progressBar?.addEventListener('click', (e) => this.seekTo(e));

    // 视频事件监听
    this.video.addEventListener('loadedmetadata', () => this.updateDuration());
    this.video.addEventListener('timeupdate', () => this.updateProgress());
    this.video.addEventListener('play', () => this.updatePlayButton());
    this.video.addEventListener('pause', () => this.updatePlayButton());
    this.video.addEventListener('ended', () => this.onVideoEnded());

    // 视频加载状态
    const videoContainer = this.video.closest('.publication-video');
    this.video.addEventListener('loadstart', () => {
      videoContainer?.classList.add('loading');
    });

    this.video.addEventListener('canplay', () => {
      videoContainer?.classList.remove('loading');
    });
  }

  togglePlayPause() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  updatePlayButton() {
    if (!this.playPauseBtn) return;

    const icon = this.playPauseBtn.querySelector('i');
    if (icon) {
      if (this.video.paused) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
      } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
      }
    }
  }

  seekTo(e) {
    if (!this.progressBar || !this.video.duration) return;

    const rect = this.progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.video.currentTime = pos * this.video.duration;
  }

  updateProgress() {
    if (!this.progressFill || !this.video.duration) return;

    const progress = (this.video.currentTime / this.video.duration) * 100;
    this.progressFill.style.width = progress + '%';
    this.updateTimeDisplay();
  }

  updateDuration() {
    this.updateTimeDisplay();
  }

  updateTimeDisplay() {
    if (!this.timeDisplay || !this.video.duration) return;

    const current = this.formatTime(this.video.currentTime);
    const duration = this.formatTime(this.video.duration);
    this.timeDisplay.textContent = `${current} / ${duration}`;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onVideoEnded() {
    this.updatePlayButton();
  }
}

// ==========================================================================
// Video Control Enhancement
// ==========================================================================
class VideoControlEnhancement {
  constructor() {
    this.videos = document.querySelectorAll('video');
    this.init();
  }

  init() {
    this.videos.forEach(video => {
      // Hide controls initially
      video.addEventListener('loadedmetadata', () => {
        video.style.opacity = '1';
      });

      // Show controls on hover
      const videoContainer = video.closest('.publication-video');
      if (videoContainer) {
        videoContainer.addEventListener('mouseenter', () => {
          video.style.transform = 'scale(1.01)';
        });

        videoContainer.addEventListener('mouseleave', () => {
          video.style.transform = 'scale(1)';
        });
      }
    });
  }
}

// ==========================================================================
// Initialize Everything
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  new VideoPlayerController();
  new SmoothScrolling();
  new AnimationObserver();
  new NavigationEnhancement();
  new PerformanceOptimizations();
  new ErrorHandler();
  new VideoControlEnhancement();

  // 初始化自定义视频控件
  new CustomVideoControls(
    'intro-video',
    '.custom-video-controls',
    'play-pause-btn',
    'progress-bar',
    'progress-fill',
    'time-display'
  );

  // 初始化任务视频控件
  new CustomVideoControls(
    'selected-video',
    '.custom-video-controls',
    'task-play-pause-btn',
    'task-progress-bar',
    'task-progress-fill',
    'task-time-display'
  );

  // Initialize Bulma components if they exist
  if (typeof bulmaCarousel !== 'undefined') {
    const carousels = bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    });
  }

  if (typeof bulmaSlider !== 'undefined') {
    bulmaSlider.attach();
  }

  // Add loading states
  document.body.classList.add('js-loaded');
});