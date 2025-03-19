(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Code for search button in nav bar
   */
  function handleSearch() {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput) {
      alert('You searched for: ' + searchInput);
      // You can add your search logic here
    }
    return false; // Prevent the form from submitting
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Code for tab functionality
   */
  document.addEventListener('DOMContentLoaded', function () {
    showTab('internet'); // Default to showing the internet packages tab

    document.getElementById('internet-tab').addEventListener('click', function () {
      showTab('internet');
    });

    document.getElementById('tv-tab').addEventListener('click', function () {
      showTab('tv');
    });

    document.getElementById('combo-tab').addEventListener('click', function () {
      showTab('combo');
    });
  });

  function showTab(tabName) {
    const internetContent = document.getElementById('internet-packages-content');
    const tvContent = document.getElementById('tv-packages-content');
    const comboContent = document.getElementById('combo-packages-content');
    const internetTab = document.getElementById('internet-tab');
    const tvTab = document.getElementById('tv-tab');
    const comboTab = document.getElementById('combo-tab');

    if (tabName === 'internet') {
      internetContent.classList.add('active');
      tvContent.classList.remove('active');
      comboContent.classList.remove('active');
      internetTab.classList.add('active');
      tvTab.classList.remove('active');
      comboTab.classList.remove('active');
    } else if (tabName === 'tv') {
      internetContent.classList.remove('active');
      tvContent.classList.add('active');
      comboContent.classList.remove('active');
      internetTab.classList.remove('active');
      tvTab.classList.add('active');
      comboTab.classList.remove('active');
    } else {
      internetContent.classList.remove('active');
      tvContent.classList.remove('active');
      comboContent.classList.add('active');
      internetTab.classList.remove('active');
      tvTab.classList.remove('active');
      comboTab.classList.add('active');
    }
  }

  /**
   * Handle review form submission
   */
  document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const stars = document.getElementById('stars').value;
      const reviewText = document.getElementById('review').value;

      // Create new review item
      const newReview = document.createElement('div');
      newReview.classList.add('swiper-slide');
      newReview.innerHTML = `
        <div class="review-item">
          <img src="assets/img/reviews/default.jpg" class="review-img" alt="">
          <h3>${name}</h3>
          <div class="stars">${getStarsHTML(stars)}</div>
          <p>
            <i class="bi bi-quote quote-icon-left"></i>
            <span>${reviewText}</span>
            <i class="bi bi-quote quote-icon-right"></i>
          </p>
        </div>
      `;

      // Append new review to swiper-wrapper
      document.querySelector('.swiper-wrapper').appendChild(newReview);
      // Reset form
      reviewForm.reset();
      // Reinitialize Swiper
      initSwiper();
    });

    function getStarsHTML(stars) {
      let starsHTML = '';
      for (let i = 0; i < stars; i++) {
        starsHTML += '<i class="bi bi-star-fill"></i>';
      }
      for (let i = stars; i < 5; i++) {
        starsHTML += '<i class="bi bi-star"></i>';
      }
      return starsHTML;
    }

    /**
     * Handle feedback form submission
     */
    const feedbackForm = document.getElementById('feedbackForm');
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('feedbackName').value;
      const email = document.getElementById('feedbackEmail').value;
      const message = document.getElementById('feedbackMessage').value;

      // You can process the feedback form data here
      alert('Thank you for your feedback, ' + name + '!');

      // Reset form
      feedbackForm.reset();
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var swiperConfig = JSON.parse(document.querySelector('.swiper-config').textContent);
    new Swiper('.init-swiper', swiperConfig);
  });
  

})();
