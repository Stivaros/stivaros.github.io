import './style.css'
import './app.js'

const app = document.querySelector('#app')

function renderHome(){
  return `
  <main id="main" class="min-h-screen">
    <section class="px-6 py-16 sm:py-24">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Efstathios Stivaros — AI‑native developer portfolio</h1>
        <p class="mt-4 text-muted text-lg">Minimalist, accessible, static‑first. Dark theme with neon accent.</p>
        <div class="mt-8 flex gap-3">
          <a href="/projects/" class="inline-flex items-center rounded bg-neon-pink/20 text-neon-pink px-4 py-2 focus-ring hover:bg-neon-pink/30 transition">View case studies</a>
          <a href="/contact/" class="inline-flex items-center rounded border border-neon-cyan/40 text-neon-cyan px-4 py-2 focus-ring hover:bg-neon-cyan/10 transition">Contact</a>
        </div>
      </div>
    </section>
    <section class="px-6 pb-16" aria-labelledby="featured">
      <div class="max-w-6xl mx-auto">
        <h2 id="featured" class="text-white font-semibold text-xl">Featured projects</h2>
        <div class="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <panel-card title="LLM docs QA" subtitle="RAG with embeddings" meta="OpenAI, PGVector" tags="RAG,OpenAI,Postgres" href="/projects/example/"></panel-card>
          <panel-card title="Rails perf" subtitle="Caching & N+1 fixes" meta="95->99 Apdex" tags="Rails,Perf,Redis" href="/projects/example/" compact></panel-card>
          <panel-card title="Serverless forms" subtitle="Edge runtimes" meta="<150ms p95" tags="Vercel,Edge" href="/projects/example/" compact></panel-card>
        </div>
      </div>
    </section>
    <section class="px-6 pb-16" aria-labelledby="skills">
      <div class="max-w-6xl mx-auto">
        <h2 id="skills" class="text-white font-semibold text-xl">Skills</h2>
        <div class="mt-4"><skill-matrix></skill-matrix></div>
      </div>
    </section>
  </main>`
}

function renderProjects(){
  return `
  <main id="main" class="min-h-screen px-6 py-12">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-semibold text-white">Projects</h1>
      <div class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <panel-card title="LLM docs QA" subtitle="RAG with embeddings" meta="OpenAI, PGVector" tags="RAG,OpenAI,Postgres" href="/projects/example/"></panel-card>
        <panel-card title="Rails perf" subtitle="Caching & N+1 fixes" meta="95->99 Apdex" tags="Rails,Perf,Redis" href="/projects/example/" compact></panel-card>
        <panel-card title="Serverless forms" subtitle="Edge runtimes" meta="<150ms p95" tags="Vercel,Edge" href="/projects/example/" compact></panel-card>
      </div>
    </div>
  </main>`
}

function renderProjectExample(){
  return `
  <main id="main" class="min-h-screen px-6 py-12">
    <project-case title="LLM Docs QA" problem="Users struggled to find answers in vast docs." approach="Ingest + chunk + embed; RAG with fallback summarization." outcome="Cut support tickets by 35%; p95 answer < 2s." metrics="35% ticket reduction; 1.8s p95; 97% helpfulness" github="https://github.com/example" demo="https://demo.example.com" images="/vite.svg"></project-case>
  </main>`
}

function renderAbout(){
  return `
  <main id="main" class="min-h-screen px-6 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-semibold text-white">About</h1>
      <p class="mt-4 text-slate-300">I ship accessible, AI‑native products end‑to‑end. Rails background; love clean UIs and pragmatic code.</p>
    </div>
  </main>`
}

function renderContact(){
  const user = 'hi'; const domain = 'stivaros.com';
  const email = `${user}@${domain}`
  return `
  <main id="main" class="min-h-screen px-6 py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-semibold text-white">Contact</h1>
      <p class="mt-4 text-slate-300">Email: <a class="text-neon-cyan underline" href="mailto:${email}">${email}</a></p>
      <form class="mt-8 grid gap-3 max-w-xl" action="#" method="post" novalidate>
        <input type="text" name="name" aria-label="Name" placeholder="Name" class="bg-panel/60 border border-white/10 rounded px-3 py-2">
        <input type="email" name="email" aria-label="Email" placeholder="Email" class="bg-panel/60 border border-white/10 rounded px-3 py-2">
        <input type="text" name="company" value="" class="hidden" tabindex="-1" autocomplete="off">
        <textarea name="message" aria-label="Message" placeholder="Message" rows="5" class="bg-panel/60 border border-white/10 rounded px-3 py-2"></textarea>
        <button class="inline-flex items-center rounded bg-neon-pink/20 text-neon-pink px-4 py-2 focus-ring hover:bg-neon-pink/30 transition w-max">Send</button>
      </form>
    </div>
  </main>`
}

function route(){
  const p = window.location.pathname
  if (p.startsWith('/projects/example')) return renderProjectExample()
  if (p.startsWith('/projects')) return renderProjects()
  if (p.startsWith('/about')) return renderAbout()
  if (p.startsWith('/contact')) return renderContact()
  return renderHome()
}

app.innerHTML = route()
