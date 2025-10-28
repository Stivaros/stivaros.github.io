class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.render()
    this.setupToggle()
  }

  render() {
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/'
    const links = [
      { href: '/', label: 'Home' },
      { href: '/projects/', label: 'Projects' },
      { href: '/about/', label: 'About' },
      { href: '/contact/', label: 'Contact' },
    ]

    const navLinks = links
      .map(({ href, label }) => {
        const isActive = currentPath === href.replace(/\/$/, '')
        return `<a href="${href}" class="px-3 py-2 rounded text-sm font-medium ${
          isActive ? 'text-white bg-neon-pink/20' : 'text-slate-300 hover:text-white hover:bg-white/5'
        }">${label}</a>`
      })
      .join('')

    this.innerHTML = `
      <header class="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-bg-dark/70 bg-bg-dark/90 border-b border-white/5">
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <div class="h-14 flex items-center justify-between">
            <a href="/" class="text-white font-semibold tracking-tight focus-ring">Efstathios Stivaros</a>
            <div class="flex items-center gap-3">
              <nav id="primary-nav" class="hidden md:flex items-center gap-1" aria-label="Primary">
                ${navLinks}
              </nav>
              <theme-toggle></theme-toggle>
              <button id="menu-btn" class="md:hidden inline-flex items-center justify-center w-9 h-9 rounded border border-white/10 text-slate-200 hover:bg-white/5 focus-ring" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">≡</button>
            </div>
          </div>
        </div>
        <div id="mobile-menu" class="md:hidden hidden border-t border-white/5">
          <nav class="mx-auto max-w-6xl px-4 sm:px-6 py-2 flex flex-col gap-1" aria-label="Mobile">
            ${navLinks}
          </nav>
        </div>
      </header>
    `
  }

  setupToggle() {
    const btn = this.querySelector('#menu-btn')
    const menu = this.querySelector('#mobile-menu')
    if (!btn || !menu) return
    const toggle = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', String(!expanded))
      menu.classList.toggle('hidden', expanded)
    }
    btn.addEventListener('click', toggle)
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); toggle()
      }
    })
  }
}

customElements.define('site-header', SiteHeader)
