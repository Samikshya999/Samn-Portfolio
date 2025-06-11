$(document).ready(function() {
  // Initialize variables
  let isDarkMode = localStorage.getItem('theme') === 'dark';
  let currentSection = 'hero-section';
  
  // Set initial theme
  updateTheme();
  
  // Theme toggle with animation
  $('#theme-toggle').click(function() {
    isDarkMode = !isDarkMode;
    updateTheme();
    
    // Animate the icon
    $('#theme-icon')
      .addClass('theme-animate')
      .one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function() {
        $(this).removeClass('theme-animate');
      });
  });
  
  // Update theme function
  function updateTheme() {
    if (isDarkMode) {
      $('body').addClass('dark-mode');
      $('#theme-icon').text('☀️');
      localStorage.setItem('theme', 'dark');
    } else {
      $('body').removeClass('dark-mode');
      $('#theme-icon').text('🌙');
      localStorage.setItem('theme', 'light');
    }
  }
  
  // Smooth scroll for navigation links
  $('.side-nav a').click(function(e) {
    e.preventDefault();
    const target = $(this).attr('href');
    currentSection = target.substring(1);

    // Update active state immediately
    $('.side-nav a').removeClass('active');
    $(this).addClass('active');

    // Scroll to the section smoothly
    $('html, body').stop().animate({
      scrollTop: $(target).offset().top - 20
    }, 600, 'swing', function() {
      // After scroll, ensure active state is correct (in case of manual scroll interruption)
      $('.side-nav a').removeClass('active');
      $(`.side-nav a[href='${target}']`).addClass('active');
    });
  });
  
  // Update active section on scroll
  $(window).scroll(function() {
    const scrollPosition = $(window).scrollTop();
    let found = false;
    $('section').each(function() {
      const currentSection = $(this);
      const sectionTop = currentSection.offset().top - 100;
      const sectionBottom = sectionTop + currentSection.height();
      if (!found && scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const sectionId = currentSection.attr('id');
        $('.side-nav a').removeClass('active');
        $(`.side-nav a[href="#${sectionId}"]`).addClass('active');
        found = true;
      }
    });
  });
  
  // Lazy load images
  const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('.gallery-grid img').forEach(img => {
      img.classList.add('loading');
      img.dataset.src = img.src;
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      imageObserver.observe(img);
    });
  };
  
  // Initialize lazy loading
  lazyLoadImages();
  
  // Animate gallery images on scroll
  function animateOnScroll() {
    $('.gallery-grid img').each(function() {
      const imgTop = $(this).offset().top;
      const winBottom = $(window).scrollTop() + $(window).height();
      
      if (imgTop < winBottom - 50) {
        $(this).addClass('img-visible');
      }
    });
  }
  
  // Initialize animations
  $(window).on('scroll load', animateOnScroll);
  
  // Contact form handling
  $('#contact-form').submit(function(e) {
    e.preventDefault();
    
    const formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    };
    
    // Add loading state
    const submitBtn = $('.submit-btn');
    const originalText = submitBtn.text();
    submitBtn.prop('disabled', true).text('Sending...');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Reset form
      $('#contact-form')[0].reset();
      submitBtn.prop('disabled', false).text(originalText);
      
      // Show success message
      const successMsg = $('<div class="success-message">Message sent successfully!</div>');
      $('.contact-form').append(successMsg);
      setTimeout(() => successMsg.fadeOut(() => successMsg.remove()), 3000);
    }, 1500);
  });
  
  // Add hover effect to gallery images
  $('.gallery-grid a').hover(
    function() {
      $(this).find('img').css('transform', 'scale(1.1)');
    },
    function() {
      $(this).find('img').css('transform', 'scale(1)');
    }
  );
  
  // Add loading animation to images
  $('.gallery-grid img').on('load', function() {
    $(this).addClass('loaded');
  });
  
  // Add smooth scroll behavior
  $('html').css('scroll-behavior', 'smooth');
  
  // Add touch support for mobile
  if ('ontouchstart' in window) {
    $('.gallery-grid a').on('touchstart', function() {
      $(this).addClass('touch-active');
    }).on('touchend', function() {
      $(this).removeClass('touch-active');
    });
  }
  
  // Animate about section elements
  function animateAboutSection() {
    const aboutSection = $('#about-section');
    const aboutImage = $('.about-image');
    const aboutDescription = $('.about-description');
    const detailItems = $('.detail-item');
    const stats = $('.stat');
    
    if (isElementInViewport(aboutSection)) {
      aboutImage.addClass('fade-in-left');
      aboutDescription.addClass('fade-in-right');
      
      detailItems.each(function(index) {
        $(this).css('animation-delay', `${index * 0.2}s`).addClass('fade-in-up');
      });
      
      stats.each(function(index) {
        $(this).css('animation-delay', `${index * 0.2}s`).addClass('fade-in-up');
      });
    }
  }
  
  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el[0].getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Add scroll event listener for about section animation
  $(window).scroll(function() {
    animateAboutSection();
  });
  
  // Initialize about section animation on page load
  $(window).on('load', function() {
    animateAboutSection();
  });
});