import { Injectable } from '@angular/core';

/** Manages dark/light theme preference with localStorage persistence. */
@Injectable({ providedIn: 'root' })
export class ThemeService {

  private storageKey = 'blog_theme';

  /** Reads saved preference from localStorage and applies it to document.body. */
  initTheme(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      document.body.classList.add('dark-theme');
    }
  }

  /** Toggles between dark and light themes, persists choice. */
  toggleTheme(): void {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
  }

  /** Returns true when dark theme is active. */
  isDarkMode(): boolean {
    return document.body.classList.contains('dark-theme');
  }
}
