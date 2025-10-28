class ThemeToggle extends HTMLElement {
  connectedCallback() {
    this.render()
    this.button = this.querySelector('button')
    this.button?.addEventListener('click', () => this.toggle())
    this.update()
  }

  getPreferredTheme() {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  setTheme(theme) {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }

  toggle() {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    this.setTheme(next)
    this.update()
  }

  update() {
    const isDark = document.documentElement.classList.contains('dark')
    const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'
    this.button?.setAttribute('aria-pressed', String(isDark))
    this.button?.setAttribute('aria-label', label)
    const icon = isDark ? '🌙' : '☀️'
    const text = isDark ? 'Dark' : 'Light'
    this.button.innerHTML = `${icon} <span class="sr-only">${label}</span><span class="ml-2 hidden sm:inline">${text}</span>`
  }

  render() {
    this.innerHTML = `
      <button type="button" class="inline-flex items-center justify-center w-9 h-9 rounded border border-white/10 text-slate-200 hover:bg-white/5 focus-ring" aria-pressed="false">
        <span class="sr-only">Toggle theme</span>
      </button>
    `
    const preferred = this.getPreferredTheme()
    this.setTheme(preferred)
  }
}

customElements.define('theme-toggle', ThemeToggle)
