$(document).ready(function () {
  $(".hamburger-menu").on("click", function () {
    $(".header-right").toggleClass("show");
  });

  //Services Slider
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
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  //Testmonial Slider

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
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  //FAQ Accordion

  $(".faq-question").click(function () {
    var $faqItem = $(this).closest(".faq-item");

    // Close all other items
    $(".faq-item")
      .not($faqItem)
      .removeClass("active")
      .find(".faq-answer")
      .slideUp();
    $(".faq-item")
      .not($faqItem)
      .find(".toggle-icon")
      .attr("src", "images/plus-icon.svg");

    // Toggle current
    $faqItem.toggleClass("active");
    $faqItem.find(".faq-answer").slideToggle();

    // Toggle icon
    var icon = $faqItem.hasClass("active")
      ? "images/minus-icon.svg"
      : "images/plus-icon.svg";
    $faqItem.find(".toggle-icon").attr("src", icon);
  });

  //Popup

  $(".open-popup-btn").click(function () {
    $(".popup-overlay, .popup-box").fadeIn();
  });

  $(".close-popup, .popup-overlay").click(function () {
    $(".popup-overlay, .popup-box").fadeOut();
  });

  $(".popup-box").click(function (e) {
    e.stopPropagation();
  });
});

//Add glow to the grids while mouse moves

document.querySelector(".faq-img").addEventListener("mousemove", function (e) {
  const glow = document.querySelector(".glow-overlay");
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  glow.style.left = `${x}px`;
  glow.style.top = `${y}px`;
  glow.style.opacity = 1;
});

document.querySelector(".faq-img").addEventListener("mouseleave", function () {
  document.querySelector(".glow-overlay").style.opacity = 0;
});

//Animate the timeline

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");

  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("visible");
    }, index * 300); // Staggered animation
  });
  const timeline = document.querySelector(".webflow-help-timeline");
  const timelineItems = document.querySelectorAll(".timeline-item");

  function getMaxLineHeight() {
    return window.innerWidth <= 767 ? 773 : 545;
  }

  function animateTimeline() {
    const viewportBottom = window.scrollY + window.innerHeight;
    const timelineTop = timeline.offsetTop;
    const maxLineHeightPx = getMaxLineHeight();

    if (viewportBottom >= timelineTop + 100) {
      const totalScrollable = window.innerHeight;
      const scrolledPast = viewportBottom - timelineTop;
      const scrollRatio = Math.min(scrolledPast / totalScrollable, 1);
      const visibleHeight = Math.min(
        scrollRatio * maxLineHeightPx,
        maxLineHeightPx
      );

      // Apply pixel value to custom property
      timeline.style.setProperty("--line-height", `${visibleHeight}px`);

      // Reveal circles that fall within the animated line
      timelineItems.forEach((item) => {
        const itemTop = item.offsetTop;
        if (itemTop <= visibleHeight) {
          item.classList.add("active");
        }
      });
    }
  }

  window.addEventListener("scroll", animateTimeline);
  window.addEventListener("resize", animateTimeline); // re-evaluate on resize
  animateTimeline();
});

//Page Loaded Animation
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    // Your AOS configuration
    once: true, // Animations only happen once
    offset: 120, // Change offset if needed
    duration: 600,
    easing: "ease-in-out",
    delay: 100,
  });

  window.addEventListener("load", function () {
    AOS.refresh();
  });
});

function checkWebflowProjects() {
  const section = document.querySelector(".webflow-projects-section");
  if (section) {
    AOS.refreshHard();
  }
}

window.addEventListener("load", function () {
  checkWebflowProjects();
  setTimeout(checkWebflowProjects, 500);
});
