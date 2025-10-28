class PanelCard extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'subtitle', 'meta', 'img', 'href', 'tags', 'compact']
  }

  connectedCallback() { this.render() }
  attributeChangedCallback() { this.render() }

  render() {
    const title = this.getAttribute('title') || ''
    const subtitle = this.getAttribute('subtitle') || ''
    const meta = this.getAttribute('meta') || ''
    const img = this.getAttribute('img') || ''
    const href = this.getAttribute('href') || '#'
    const tagsCsv = this.getAttribute('tags') || ''
    const tags = tagsCsv ? tagsCsv.split(',').map((t) => t.trim()).filter(Boolean) : []
    const compact = this.hasAttribute('compact')

    const tagBadges = tags
      .map((t) => `<span class="text-xs text-neon-cyan/90 border border-neon-cyan/40 px-2 py-0.5 rounded">${t}</span>`) 
      .join(' ')

    this.innerHTML = `
      <article class="group rounded-lg bg-panel/70 border border-white/5 hover:border-neon-pink/40 transition overflow-hidden focus-within:ring-2 focus-within:ring-neon-pink/70">
        ${img ? `<img src="${img}" alt="" class="w-full object-cover ${compact ? 'h-32' : 'h-40'}" loading="lazy">` : ''}
        <div class="p-4">
          <h3 class="text-white font-semibold">
            <a class="focus-ring rounded outline-none" href="${href}">${title}</a>
          </h3>
          ${subtitle ? `<p class="mt-1 text-sm text-slate-300">${subtitle}</p>` : ''}
          ${meta ? `<p class="mt-2 text-xs text-muted">${meta}</p>` : ''}
          ${tags.length ? `<div class="mt-3 flex flex-wrap gap-2">${tagBadges}</div>` : ''}
          <div class="mt-4">
            <slot name="actions"></slot>
          </div>
        </div>
      </article>
    `
  }
}

customElements.define('panel-card', PanelCard)
