/* ========================================
   Sports Nutrition - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Header scroll effect ----------
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---------- Mobile menu ----------
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('is-open');
    document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
  });

  // Close menu on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // ---------- Image fallback (show placeholder if image fails) ----------
  document.querySelectorAll('.service-card__img img, .subpage-hero__bg img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
    img.addEventListener('load', () => {
      const placeholder = img.parentElement.querySelector('.service-card__img-placeholder');
      if (placeholder) placeholder.style.display = 'none';
    });
  });

  // ---------- Scroll animations ----------
  const animatedElements = document.querySelectorAll(
    '.service-card, .team-card, .timeline-item, .about__value-card, .contact__mail-cta, .contact-info-card, .stat, .sns__photo'
  );

  animatedElements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));

  // ---------- About section staggered reveal ----------
  const aboutMessage = document.querySelector('.about__message');
  const aboutValueCards = document.querySelectorAll('.about__value-card');

  const aboutElements = [aboutMessage, ...aboutValueCards].filter(Boolean);
  aboutElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
  });

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          aboutElements.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 150);
          });
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const aboutSection = document.querySelector('.about');
  if (aboutSection) aboutObserver.observe(aboutSection);

  // ---------- Smooth active nav highlight ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('nav-link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('nav-link--active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---------- Privacy Policy Modal ----------
  const privacyOpen = document.getElementById('privacyOpen');
  const privacyModal = document.getElementById('privacyModal');
  const privacyClose = document.getElementById('privacyClose');

  if (privacyOpen && privacyModal) {
    privacyOpen.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      privacyModal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    privacyClose.addEventListener('click', closeModal);

    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && privacyModal.classList.contains('is-open')) closeModal();
    });
  }
});
