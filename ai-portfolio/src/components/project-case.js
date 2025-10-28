class ProjectCase extends HTMLElement {
  static get observedAttributes() {
    return ['title','problem','approach','outcome','metrics','github','demo','images']
  }
  connectedCallback(){ this.render() }
  attributeChangedCallback(){ this.render() }

  render(){
    const title = this.getAttribute('title') || 'Project'
    const problem = this.getAttribute('problem') || ''
    const approach = this.getAttribute('approach') || ''
    const outcome = this.getAttribute('outcome') || ''
    const metrics = this.getAttribute('metrics') || ''
    const github = this.getAttribute('github') || ''
    const demo = this.getAttribute('demo') || ''
    const imagesCsv = this.getAttribute('images') || ''
    const images = imagesCsv ? imagesCsv.split(',').map(s=>s.trim()).filter(Boolean) : []

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      description: `${problem} ${approach} ${outcome}`.trim(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      image: images,
      codeRepository: github || undefined,
      sameAs: demo || undefined,
    }

    const imagesHtml = images.map(src=>`<img src="${src}" alt="" class="rounded border border-white/10 max-h-56 object-cover" loading="lazy">`).join('')

    this.innerHTML = `
      <article class="max-w-3xl mx-auto">
        <header>
          <h1 class="text-3xl sm:text-4xl font-semibold text-white">${title}</h1>
          ${metrics ? `<p class="mt-2 text-sm text-muted">${metrics}</p>`: ''}
        </header>
        <section class="mt-8 space-y-6">
          ${problem ? `<div><h2 class="text-xl text-white font-semibold">Problem</h2><p class="mt-2 text-slate-300">${problem}</p></div>`:''}
          ${approach ? `<div><h2 class="text-xl text-white font-semibold">Approach</h2><p class="mt-2 text-slate-300">${approach}</p></div>`:''}
          ${outcome ? `<div><h2 class="text-xl text-white font-semibold">Outcome</h2><p class="mt-2 text-slate-300">${outcome}</p></div>`:''}
          ${images.length ? `<div class="mt-6 grid grid-cols-2 gap-3">${imagesHtml}</div>`:''}
          <div class="mt-6 flex gap-3">
            ${github ? `<a class="inline-flex items-center rounded border border-neon-cyan/40 text-neon-cyan px-4 py-2 focus-ring hover:bg-neon-cyan/10 transition" href="${github}">GitHub</a>`:''}
            ${demo ? `<a class="inline-flex items-center rounded bg-neon-pink/20 text-neon-pink px-4 py-2 focus-ring hover:bg-neon-pink/30 transition" href="${demo}">Live Demo</a>`:''}
          </div>
        </section>
        <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
      </article>
    `
  }
}

customElements.define('project-case', ProjectCase)
