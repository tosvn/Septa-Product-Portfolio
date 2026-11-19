document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-sun-icon');
  const moonIcon = document.getElementById('theme-moon-icon');

  if (themeToggle) {
    const updateThemeToggle = () => {
      const isLight = document.documentElement.dataset.theme === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
      sunIcon.classList.toggle('hidden', isLight);
      moonIcon.classList.toggle('hidden', !isLight);
    };

    updateThemeToggle();
    themeToggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = nextTheme;
      updateThemeToggle();

      try {
        localStorage.setItem('portfolio-theme', nextTheme);
      } catch (error) {
        console.warn('Unable to save the theme preference.', error);
      }
    });
  }

  // Project Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button styling
      filterButtons.forEach((b) => {
        b.classList.remove('bg-amber-600', 'text-zinc-950', 'font-semibold');
        b.classList.add('text-zinc-400');
      });
      btn.classList.add('bg-amber-600', 'text-zinc-950', 'font-semibold');
      btn.classList.remove('text-zinc-400');

      // Filter project cards
      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // One-click Copy Email with Toast feedback
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-email-text');
  const toast = document.getElementById('toast');
  const email = 'abdulsalammudasiru2021@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyText.textContent = 'Copied!';
        toast.classList.remove('translate-y-20', 'opacity-0');

        setTimeout(() => {
          copyText.textContent = 'Copy Email';
          toast.classList.add('translate-y-20', 'opacity-0');
        }, 2500);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }
});
