/**
 * MAIN.JS - Freelance MySQL Performance Tuner Core JS
 * Handles Theme Toggling, RTL Support, Navigation Menus, and Client-Side Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initMobileMenu();
  initFormValidation();
  initSkeletonLoaders();
});

/* ==========================================================================
   1. Theme Management (Light/Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
    updateThemeToggleIcons(true);
  } else {
    document.body.classList.remove('dark-mode');
    updateThemeToggleIcons(false);
  }

  // Bind click handlers to all theme toggles
  themeToggle.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeToggleIcons(isDark);
    });
  });
}

function updateThemeToggleIcons(isDark) {
  const icons = document.querySelectorAll('.theme-toggle i, .theme-toggle svg');
  icons.forEach(icon => {
    // We will use standard emojis or text-based indicators if font-awesome is not fully loaded, 
    // or nice CSS styles. Let's make it show 🌙 for Dark Mode and ☀️ for Light Mode.
    icon.innerHTML = isDark ? '☀️' : '🌙';
  });
}

/* ==========================================================================
   2. RTL Support Management
   ========================================================================== */
function initRTL() {
  const rtlToggle = document.querySelectorAll('.rtl-toggle');
  const savedRTL = localStorage.getItem('rtl');

  // Set initial RTL status
  if (savedRTL === 'true') {
    document.documentElement.setAttribute('dir', 'rtl');
    updateRTLToggleButtons(true);
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    updateRTLToggleButtons(false);
  }

  // Bind click handlers
  rtlToggle.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const isRTL = currentDir === 'ltr';
      
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
      localStorage.setItem('rtl', isRTL ? 'true' : 'false');
      updateRTLToggleButtons(isRTL);
    });
  });
}

function updateRTLToggleButtons(isRTL) {
  const buttons = document.querySelectorAll('.rtl-toggle');
  buttons.forEach(btn => {
    btn.innerHTML = isRTL ? 'LTR' : 'RTL';
  });
}

/* ==========================================================================
   3. Mobile Navigation & Hamburger Menu
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Dashboard mobile sidebar
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });

    // Close sidebar on click outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('active') && 
          !sidebar.contains(e.target) && 
          !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   4. Premium Client-Side Form Validation
   ========================================================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('form[novalidate]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isFormValid = true;

      // Select all inputs, select, textareas
      const fields = form.querySelectorAll('input, select, textarea');

      fields.forEach(field => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        e.preventDefault(); // Stop form submission if invalid
      } else {
        // If it's successful contact form / login / register, let's show an interactive animation
        e.preventDefault();
        showFormSuccessState(form);
      }
    });

    // Real-time validation on input change
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input', () => {
        validateField(field);
      });
      field.addEventListener('blur', () => {
        validateField(field);
      });
    });
  });
}

function validateField(field) {
  const tooltip = field.parentNode.querySelector('.validation-tooltip');
  let isValid = true;
  let message = '';

  // Required check
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
    message = 'This field is required.';
  } 
  // Email check
  else if (field.type === 'email' && field.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value.trim())) {
      isValid = false;
      message = 'Please enter a valid email address.';
    }
  }
  // Password length check
  else if (field.type === 'password' && field.value.trim() && field.value.length < 6) {
    isValid = false;
    message = 'Password must be at least 6 characters.';
  }

  // Apply visual states
  if (!isValid) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    if (tooltip) {
      tooltip.textContent = message;
    }
  } else {
    field.classList.remove('is-invalid');
    if (field.value.trim()) {
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
    }
    if (tooltip) {
      tooltip.textContent = '';
    }
  }

  return isValid;
}

function showFormSuccessState(form) {
  const container = form.parentNode;
  const originalHTML = container.innerHTML;
  
  // Create beautiful success markup
  container.innerHTML = `
    <div style="text-align: center; padding: var(--space-8); animation: fadeIn var(--transition-normal) forwards;">
      <div style="font-size: 4rem; color: var(--secondary); margin-bottom: var(--space-4);">✓</div>
      <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.8rem; margin-bottom: var(--space-2);">Operation Successful!</h3>
      <p style="color: var(--text-muted); margin-bottom: var(--space-6);">Thank you. Your request has been successfully parsed and submitted.</p>
      <button class="btn btn-primary" onclick="location.reload()">Done</button>
    </div>
  `;
}

/* ==========================================================================
   5. Skeleton Loading Simulators
   ========================================================================== */
function initSkeletonLoaders() {
  const skeletons = document.querySelectorAll('.skeleton-wrapper');
  
  if (skeletons.length > 0) {
    skeletons.forEach(wrapper => {
      // Auto-resolve skeletons after 1.5 seconds to simulate real-world API performance tuning
      setTimeout(() => {
        wrapper.querySelectorAll('.skeleton').forEach(el => el.style.display = 'none');
        const realContent = wrapper.querySelector('.skeleton-content');
        if (realContent) {
          realContent.style.display = 'block';
          realContent.style.animation = 'fadeIn 0.5s ease-out forwards';
        }
      }, 1500);
    });
  }
}
