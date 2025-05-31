// Wait for DOM to be ready using plain JS instead of jQuery
document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const domCache = {
    hamburgerMenu: document.querySelector('.hamburger-menu'),
    headerRight: document.querySelector('.header-right'),
    faqImg: document.querySelector('.faq-img'),
    glowOverlay: document.querySelector('.glow-overlay'),
    timeline: document.querySelector('.webflow-help-timeline'),
    timelineItems: document.querySelectorAll('.timeline-item'),
    openPopupBtns: document.querySelectorAll('.open-popup-btn'),
    popupOverlay: document.querySelector('.popup-overlay'),
    popupBox: document.querySelector('.popup-box'),
    closePopup: document.querySelector('.close-popup'),
    faqQuestions: document.querySelectorAll('.faq-question'),
    webflowProjectsSection: document.querySelector('.webflow-projects-section')
  };

  // Mobile menu toggle
  if (domCache.hamburgerMenu && domCache.headerRight) {
    domCache.hamburgerMenu.addEventListener('click', function() {
      domCache.headerRight.classList.toggle('show');
    });
  }

  // Initialize sliders only if they exist on page
  function initSliders() {
    // Services Slider
    if (document.querySelector('.webflow-services-list')) {
      $(".webflow-services-list").slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2 }
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 1 }
          }
        ]
      });
    }

    // Testimonial Slider
    if (document.querySelector('.testmonial-slider')) {
      $(".testmonial-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        infinite: true,
        responsive: [
          {
            breakpoint: 768,
            settings: { slidesToShow: 1 }
          },
          {
            breakpoint: 480,
            settings: { slidesToShow: 1 }
          }
        ]
      });
    }
  }

  // FAQ Accordion
  function setupFAQAccordion() {
    if (domCache.faqQuestions.length) {
      domCache.faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
          const faqItem = this.closest('.faq-item');
          const isActive = faqItem.classList.contains('active');
          const allFaqItems = document.querySelectorAll('.faq-item');
          const toggleIcon = this.querySelector('.toggle-icon');
          
          // Close all other items
          allFaqItems.forEach(item => {
            if (item !== faqItem) {
              item.classList.remove('active');
              const answer = item.querySelector('.faq-answer');
              const icon = item.querySelector('.toggle-icon');
              if (answer) answer.style.display = 'none';
              if (icon) icon.src = "images/plus-icon.svg";
            }
          });
          
          // Toggle current item
          faqItem.classList.toggle('active');
          const answer = faqItem.querySelector('.faq-answer');
          if (answer) {
            answer.style.display = faqItem.classList.contains('active') ? 'block' : 'none';
          }
          if (toggleIcon) {
            toggleIcon.src = faqItem.classList.contains('active') 
              ? "images/minus-icon.svg" 
              : "images/plus-icon.svg";
          }
        });
      });
    }
  }

  // Popup functionality
  function setupPopups() {
    if (domCache.openPopupBtns.length && domCache.popupOverlay && domCache.popupBox) {
      domCache.openPopupBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          domCache.popupOverlay.style.display = 'block';
          domCache.popupBox.style.display = 'block';
        });
      });
      
      domCache.closePopup.addEventListener('click', function() {
        domCache.popupOverlay.style.display = 'none';
        domCache.popupBox.style.display = 'none';
      });
      
      domCache.popupOverlay.addEventListener('click', function() {
        this.style.display = 'none';
        domCache.popupBox.style.display = 'none';
      });
      
      domCache.popupBox.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  }

  // Glow effect with throttling
  function setupGlowEffect() {
    if (domCache.faqImg && domCache.glowOverlay) {
      let lastTime = 0;
      const throttleDelay = 50; // milliseconds
      
      const updateGlowPosition = function(e) {
        const now = Date.now();
        if (now - lastTime >= throttleDelay) {
          const rect = domCache.faqImg.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          domCache.glowOverlay.style.left = `${x}px`;
          domCache.glowOverlay.style.top = `${y}px`;
          domCache.glowOverlay.style.opacity = '1';
          
          lastTime = now;
        }
      };
      
      domCache.faqImg.addEventListener('mousemove', updateGlowPosition);
      domCache.faqImg.addEventListener('mouseleave', function() {
        domCache.glowOverlay.style.opacity = '0';
      });
    }
  }

  // Timeline animation with IntersectionObserver
  function setupTimelineAnimation() {
    if (domCache.timeline && domCache.timelineItems.length) {
      const getMaxLineHeight = () => window.innerWidth <= 767 ? 773 : 545;
      let animationFrameId = null;
      
      const animateTimeline = () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        
        animationFrameId = requestAnimationFrame(() => {
          const viewportBottom = window.scrollY + window.innerHeight;
          const timelineTop = domCache.timeline.offsetTop;
          const maxLineHeightPx = getMaxLineHeight();
          
          if (viewportBottom >= timelineTop + 100) {
            const totalScrollable = window.innerHeight;
            const scrolledPast = viewportBottom - timelineTop;
            const scrollRatio = Math.min(scrolledPast / totalScrollable, 1);
            const visibleHeight = Math.min(scrollRatio * maxLineHeightPx, maxLineHeightPx);
            
            domCache.timeline.style.setProperty('--line-height', `${visibleHeight}px`);
            
            domCache.timelineItems.forEach(item => {
              if (item.offsetTop <= visibleHeight) {
                item.classList.add('active');
              }
            });
          }
        });
      };
      
      // Use IntersectionObserver to only animate when in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', animateTimeline, { passive: true });
            animateTimeline();
          } else {
            window.removeEventListener('scroll', animateTimeline);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(domCache.timeline);
      
      // Initial animation for visible items
      domCache.timelineItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 100); // Reduced delay for faster initial animation
      });
      
      // Cleanup on resize
      window.addEventListener('resize', () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
        animateTimeline();
      }, { passive: true });
    }
  }

  // Initialize AOS only if needed
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        once: true,
        offset: 120,
        duration: 600,
        easing: "ease-in-out",
        delay: 100,
      });
      
      window.addEventListener('load', function() {
        AOS.refresh();
        
        // Check for webflow projects section
        if (domCache.webflowProjectsSection) {
          AOS.refreshHard();
          setTimeout(() => AOS.refreshHard(), 500);
        }
      });
    }
  }

  // Initialize all components
  initSliders();
  setupFAQAccordion();
  setupPopups();
  setupGlowEffect();
  setupTimelineAnimation();
  initAOS();
});