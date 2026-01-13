/**
 * PILLAR Theme Toggle
 * Handles dark/light mode switching with system preference detection
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'pillar-theme';
  const DARK_CLASS = 'dark-mode';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
  };

  // Get stored theme or default to system
  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || THEMES.SYSTEM;
    } catch {
      return THEMES.SYSTEM;
    }
  }

  // Save theme preference
  function setStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage not available
    }
  }

  // Get system preference
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.DARK
      : THEMES.LIGHT;
  }

  // Get effective theme (resolves 'system' to actual value)
  function getEffectiveTheme(theme) {
    if (theme === THEMES.SYSTEM) {
      return getSystemTheme();
    }
    return theme;
  }

  // Apply theme to document
  function applyTheme(theme) {
    const effectiveTheme = getEffectiveTheme(theme);
    const root = document.documentElement;

    // Set data attribute for CSS
    root.setAttribute('data-theme', effectiveTheme);

    // Toggle class for compatibility
    if (effectiveTheme === THEMES.DARK) {
      root.classList.add(DARK_CLASS);
    } else {
      root.classList.remove(DARK_CLASS);
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = effectiveTheme === THEMES.DARK ? '#0a0a0f' : '#FFFFFF';
    }

    // Dispatch event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme: effectiveTheme, preference: theme }
    }));
  }

  // Toggle between light and dark
  function toggleTheme() {
    const currentTheme = getStoredTheme();
    const effectiveTheme = getEffectiveTheme(currentTheme);
    const newTheme = effectiveTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

    setStoredTheme(newTheme);
    applyTheme(newTheme);

    return newTheme;
  }

  // Cycle through themes: light -> dark -> system
  function cycleTheme() {
    const currentTheme = getStoredTheme();
    let newTheme;

    switch (currentTheme) {
      case THEMES.LIGHT:
        newTheme = THEMES.DARK;
        break;
      case THEMES.DARK:
        newTheme = THEMES.SYSTEM;
        break;
      default:
        newTheme = THEMES.LIGHT;
    }

    setStoredTheme(newTheme);
    applyTheme(newTheme);

    return newTheme;
  }

  // Initialize theme toggle buttons
  function initToggleButtons() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const newTheme = toggleTheme();
        updateToggleButtons(newTheme);
      });
    });

    // Update buttons to show current state
    updateToggleButtons(getEffectiveTheme(getStoredTheme()));
  }

  // Update toggle button appearance
  function updateToggleButtons(theme) {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');

    toggleButtons.forEach(button => {
      button.setAttribute('data-current-theme', theme);
      button.setAttribute('aria-label', `Switch to ${theme === THEMES.DARK ? 'light' : 'dark'} mode`);

      // Update icon if present
      const sunIcon = button.querySelector('.theme-icon-sun');
      const moonIcon = button.querySelector('.theme-icon-moon');

      if (sunIcon && moonIcon) {
        if (theme === THEMES.DARK) {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }

  // Listen for system preference changes
  function initSystemListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
      const storedTheme = getStoredTheme();

      // Only auto-switch if user prefers system theme
      if (storedTheme === THEMES.SYSTEM) {
        applyTheme(THEMES.SYSTEM);
        updateToggleButtons(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    });
  }

  // Initialize on DOM ready
  function init() {
    // Apply theme immediately to prevent flash
    const storedTheme = getStoredTheme();
    applyTheme(storedTheme);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initToggleButtons();
        initSystemListener();
      });
    } else {
      initToggleButtons();
      initSystemListener();
    }
  }

  // Expose API
  window.PillarTheme = {
    toggle: toggleTheme,
    cycle: cycleTheme,
    get: () => getEffectiveTheme(getStoredTheme()),
    set: (theme) => {
      if (Object.values(THEMES).includes(theme)) {
        setStoredTheme(theme);
        applyTheme(theme);
        updateToggleButtons(getEffectiveTheme(theme));
      }
    },
    THEMES
  };

  // Initialize
  init();
})();
