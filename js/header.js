document.addEventListener('DOMContentLoaded', () => {
  initHeader();
});

function initHeader() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.header-nav');
  const backdrop = document.querySelector('.nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    function toggleMobileMenu(isOpen) {
      const shouldOpen = isOpen !== undefined ? isOpen : !navMenu.classList.contains('is-open');
      
      toggleBtn.classList.toggle('is-active', shouldOpen);
      navMenu.classList.toggle('is-open', shouldOpen);
      
      if (backdrop) {
        backdrop.classList.toggle('is-visible', shouldOpen);
      }

      toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      document.body.style.overflow = shouldOpen ? 'hidden' : '';
    }

    toggleBtn.addEventListener('click', () => toggleMobileMenu());

    if (backdrop) {
      backdrop.addEventListener('click', () => toggleMobileMenu(false));
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          toggleMobileMenu(false);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        toggleMobileMenu(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navMenu.classList.contains('is-open')) {
        toggleMobileMenu(false);
      }
    });
  }

  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  highlightActiveLink(navLinks);
}

function highlightActiveLink(navLinks) {
  if (!navLinks || navLinks.length === 0) return;

  const currentPath = window.location.pathname.toLowerCase();
  let matched = false;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPath = href.toLowerCase().replace(/^(\.\/|\.\.\/)+/, '');
    
    const isHomePage = (currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/pet/')) && 
                       (linkPath === 'index.html' || linkPath === '/' || linkPath === './index.html' || linkPath === '../index.html');
    
    const isSubPage = !isHomePage && currentPath.includes(linkPath.replace('.html', '')) && linkPath !== 'index.html';

    if (isHomePage || isSubPage) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      matched = true;
    }
  });

  if (!matched) {
    const defaultActive = document.querySelector('.nav-link.active');
    if (!defaultActive && navLinks.length > 0) {
      navLinks[0].classList.add('active');
    }
  }
}
