class SkillMatrix extends HTMLElement {
  connectedCallback(){ this.render() }

  parseData(){
    const dataAttr = this.getAttribute('data')
    if (dataAttr){
      try { return JSON.parse(dataAttr) } catch { /* ignore */ }
    }
    return {
      Backend: ['Ruby on Rails','Node.js','PostgreSQL','Redis'],
      Frontend: ['Web Components','Lit','React','Tailwind CSS'],
      DevOps: ['Docker','CI/CD','GitHub Actions','Vercel/Netlify'],
      AI: ['OpenAI API','RAG','Embeddings','Prompt Engineering']
    }
  }

  render(){
    const data = this.parseData()
    const sections = Object.entries(data).map(([cat, skills])=>{
      const items = (skills||[]).map(s=>`<li class="text-sm text-slate-300">${s}</li>`).join('')
      return `<div class="rounded-lg border border-white/5 bg-panel/60 p-4"><h3 class="text-white font-semibold">${cat}</h3><ul class="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">${items}</ul></div>`
    }).join('')

    this.innerHTML = `<div class="grid sm:grid-cols-2 gap-3">${sections}</div>`
  }
}

customElements.define('skill-matrix', SkillMatrix)
