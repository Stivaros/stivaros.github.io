<template>
  <main class="py-8 px-6">
    <article>
      <h1>Projects</h1>
      <div class="project-container">
        <section class="project">
          <header><h2>Dummy Project</h2></header>
          <p>
            A couple of paragraphs about the project. A couple of paragraphs
            about the project.
          </p>
        </section>
        <section class="project">
          <header><h2>Dummy Project</h2></header>
          <p>
            A couple of paragraphs about the project. A couple of paragraphs
            about the project.
          </p>
        </section>
        <section class="project">
          <header><h2>Dummy Project</h2></header>
          <p>
            A couple of paragraphs about the project. A couple of paragraphs
            about the project.
          </p>
        </section>
      </div>
    </article>
    <!-- this is rough arse -->
    <input
      id="search"
      v-model="q"
      type="text"
      name="project search"
      @input="$fetch"
    />
    <pre>{{ projects }}</pre>
  </main>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      q: '',
    }
  },
  async fetch() {
    // Just about got this working but needs further refinement
    this.projects = await this.$content('projects').search(this.q).fetch()
  },
}
</script>

<style lang="scss" scoped>
@layer components {
  .project-container {
    @apply pt-8 grid grid-cols-2 justify-center gap-8;
  }

  .project {
    @apply flex-initial;
    margin: 0 5em;
    border: 1px solid red;
  }
}
</style>
